package com.levelup.tracker.detector

import com.levelup.tracker.core.Confidence
import com.levelup.tracker.core.Detection
import com.levelup.tracker.core.FeedState
import com.levelup.tracker.core.ScreenSummary
import com.levelup.tracker.core.ScrollInfo
import com.levelup.tracker.core.TrackedApp

interface ShortFormDetector {
    val app: TrackedApp
    val version: String
    val selectedLabelAllowlist: Set<String>
    fun detect(summary: ScreenSummary): Detection
    fun isFeedScrollSource(scroll: ScrollInfo, summary: ScreenSummary?): Boolean
}

class SignatureRule(val name: String, private val patterns: List<Regex>) {
    constructor(name: String, vararg patterns: String) : this(name, patterns.map { Regex(it) })

    fun firstMatch(ids: Collection<String>): String? = ids.firstOrNull { matches(it) }

    fun matches(id: String?): Boolean = id != null && patterns.any { it.matches(id) }
}

abstract class SignatureDetector : ShortFormDetector {
    protected abstract val feedPagerRule: SignatureRule
    protected abstract val feedIdRule: SignatureRule
    protected open val hardNegativeRules: List<SignatureRule> = emptyList()
    protected open val softNegativeRules: List<SignatureRule> = emptyList()
    protected open val windowClassRule: SignatureRule? = null

    override fun detect(summary: ScreenSummary): Detection {
        if (summary.sensitive) return Detection(FeedState.NOT_IN_FEED, Confidence.HIGH, true, listOf("sensitive-screen"))
        if (summary.isEmpty) return Detection.unknown("empty-tree")

        for (rule in hardNegativeRules) {
            val hit = rule.firstMatch(summary.viewIds)
            if (hit != null) return Detection(FeedState.NOT_IN_FEED, Confidence.HIGH, true, listOf("neg:${rule.name}:$hit"))
        }

        val signals = mutableListOf<String>()
        var score = 0

        val verticalPagers = summary.fullScreenPagers.filter { it.vertical }
        val idPager = verticalPagers.firstOrNull { feedPagerRule.matches(it.viewId) }
        if (idPager != null) {
            score += 3
            signals += "pager:${idPager.viewId}:${"%.2f".format(idPager.heightFraction)}"
        }

        val feedId = feedIdRule.firstMatch(summary.viewIds)
        if (feedId != null) {
            score += 1
            signals += "id:$feedId"
        }

        val label = summary.selectedLabels.firstOrNull { it in selectedLabelAllowlist }
        if (label != null) {
            score += 1
            signals += "tab:$label"
            if (idPager == null && verticalPagers.isNotEmpty()) {
                score += 1
                signals += "anon-pager:${"%.2f".format(verticalPagers.first().heightFraction)}"
            }
        }

        val windowRule = windowClassRule
        if (windowRule != null && windowRule.matches(summary.windowClassName)) {
            score += 1
            signals += "window:${summary.windowClassName}"
        }

        for (rule in softNegativeRules) {
            val hit = rule.firstMatch(summary.viewIds)
            if (hit != null) {
                score -= 2
                signals += "soft-neg:${rule.name}:$hit"
            }
        }

        if (summary.truncated) signals += "truncated"

        val confidence = when {
            score >= 3 -> Confidence.HIGH
            score == 2 -> Confidence.MEDIUM
            score == 1 -> Confidence.LOW
            else -> Confidence.NONE
        }
        val state = if (confidence == Confidence.NONE) FeedState.NOT_IN_FEED else FeedState.IN_FEED
        if (signals.isEmpty()) signals += "no-signals"
        return Detection(state, confidence, false, signals)
    }

    override fun isFeedScrollSource(scroll: ScrollInfo, summary: ScreenSummary?): Boolean {
        if (scroll.isHorizontalOnly) return false
        if (feedPagerRule.matches(scroll.sourceViewId)) return true
        val knownPagerOnScreen = summary?.fullScreenPagers?.any { feedPagerRule.matches(it.viewId) } == true
        if (knownPagerOnScreen) return false
        return scroll.sourceHeightFraction >= FULL_SCREEN_HEIGHT && scroll.sourceWidthFraction >= FULL_SCREEN_WIDTH
    }

    companion object {
        const val FULL_SCREEN_HEIGHT = 0.7f
        const val FULL_SCREEN_WIDTH = 0.9f
    }
}
