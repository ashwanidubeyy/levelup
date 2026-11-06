package com.levelup.tracker.core

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class CountingEngineTest {

    private lateinit var engine: CountingEngine
    private var now = 1_000_000L
    private val events = mutableListOf<EngineEvent>()
    private val app = TrackedApp.INSTAGRAM

    private val inFeedHigh = Detection(FeedState.IN_FEED, Confidence.HIGH, false, listOf("pager"))
    private val inFeedLow = Detection(FeedState.IN_FEED, Confidence.LOW, false, listOf("anon"))
    private val notInFeed = Detection(FeedState.NOT_IN_FEED, Confidence.NONE, false, listOf("none"))
    private val directThread = Detection(FeedState.NOT_IN_FEED, Confidence.HIGH, true, listOf("neg:direct"))

    @Before
    fun setUp() {
        engine = CountingEngine(EngineConfig(dwellMs = 500, idleSessionMs = 60_000, resumeGraceMs = 120_000))
        events.clear()
    }

    private fun advance(ms: Long) {
        val end = now + ms
        while (now < end) {
            now = minOf(end, now + 100)
            events += engine.onTick(now)
        }
    }

    private fun detect(detection: Detection, fingerprint: String? = null, decisive: Boolean = false, target: TrackedApp = app) {
        events += engine.onDetection(target, detection, fingerprint, decisive, now)
    }

    private fun scroll(from: Int, to: Int, count: Int = 50, deltaY: Int = 100, feedSource: Boolean = true) {
        events += engine.onScroll(
            app,
            ScrollInfo(from, to, count, 0, deltaY, "clips_viewer_view_pager", "RecyclerView", 0.9f, 1f),
            feedSource,
            now,
        )
    }

    private fun swipeTo(index: Int, deltaY: Int = 100) {
        scroll(index - 1, index, deltaY = deltaY)
        now += 120
        scroll(index, index, deltaY = deltaY)
    }

    private fun counted() = events.filterIsInstance<EngineEvent.ItemCounted>().size
    private fun sessionsStarted() = events.filterIsInstance<EngineEvent.SessionStarted>()
    private fun sessionsEnded() = events.filterIsInstance<EngineEvent.SessionEnded>()

    @Test
    fun entryItemIsCountedAfterDwell() {
        detect(inFeedHigh)
        advance(300)
        assertEquals(0, counted())
        advance(300)
        assertEquals(1, counted())
        assertEquals(CountMethod.ENTRY, events.filterIsInstance<EngineEvent.ItemCounted>().first().method)
    }

    @Test
    fun eachNewSettledReelCountsOnce() {
        detect(inFeedHigh)
        advance(1_000)
        for (i in 1..5) {
            swipeTo(i)
            advance(1_000)
        }
        assertEquals(6, counted())
    }

    @Test
    fun repeatedAccessibilityEventsAreDeduplicated() {
        detect(inFeedHigh)
        advance(1_000)
        scroll(0, 1)
        now += 50
        scroll(1, 1)
        now += 30
        scroll(1, 1)
        now += 30
        scroll(1, 1)
        repeat(5) { detect(inFeedHigh) }
        advance(1_000)
        assertEquals(2, counted())
        assertTrue(engine.stats.duplicateEvents >= 2)
    }

    @Test
    fun swipingBackToAPreviousReelIsNotRecounted() {
        detect(inFeedHigh)
        advance(1_000)
        swipeTo(1)
        advance(1_000)
        swipeTo(2)
        advance(1_000)
        scroll(1, 2, deltaY = -100)
        now += 120
        scroll(1, 1, deltaY = -100)
        advance(1_000)
        scroll(0, 1, deltaY = -100)
        now += 120
        scroll(0, 0, deltaY = -100)
        advance(1_000)
        assertEquals(3, counted())
    }

    @Test
    fun reelsFlickedPastBelowDwellAreNotCounted() {
        detect(inFeedHigh)
        advance(1_000)
        swipeTo(1)
        advance(200)
        swipeTo(2)
        advance(200)
        swipeTo(3)
        advance(1_000)
        assertEquals(2, counted())
        assertTrue(engine.stats.belowDwell >= 2)
    }

    @Test
    fun partialSwipeThatSnapsBackIsNotCounted() {
        detect(inFeedHigh)
        advance(1_000)
        scroll(0, 1, deltaY = 300)
        now += 150
        scroll(0, 0, deltaY = -300)
        advance(1_000)
        assertEquals(1, counted())
        swipeTo(1)
        advance(1_000)
        assertEquals(2, counted())
    }

    @Test
    fun nonFeedScrollsAreIgnored() {
        detect(inFeedHigh)
        advance(1_000)
        scroll(0, 3, feedSource = false)
        now += 120
        scroll(3, 3, feedSource = false)
        advance(1_000)
        assertEquals(1, counted())
        assertEquals(2L, engine.stats.nonFeedScrolls)
    }

    @Test
    fun lowConfidenceDoesNotEnterFeed() {
        detect(inFeedLow)
        advance(2_000)
        scroll(1, 1)
        advance(1_000)
        assertEquals(0, counted())
        assertTrue(sessionsStarted().isEmpty())
    }

    @Test
    fun lowConfidenceIsCountedWhenAllowed() {
        engine = CountingEngine(EngineConfig(minCountConfidence = Confidence.LOW))
        detect(inFeedLow)
        advance(1_000)
        assertEquals(1, counted())
        assertEquals(Confidence.LOW, events.filterIsInstance<EngineEvent.ItemCounted>().first().confidence)
    }

    @Test
    fun openingDirectMessagesEndsTheSessionImmediately() {
        detect(inFeedHigh)
        advance(1_000)
        detect(directThread)
        assertEquals(1, sessionsEnded().size)
        assertEquals(ExitReason.HARD_NEGATIVE, sessionsEnded().first().reason)
        assertFalse(engine.isInFeed)
        scroll(4, 4)
        advance(1_000)
        assertEquals(1, counted())
    }

    @Test
    fun leavingReelsRequiresConsecutiveNegativeInspections() {
        detect(inFeedHigh)
        advance(1_000)
        detect(notInFeed)
        assertTrue(engine.isInFeed)
        detect(inFeedHigh)
        detect(notInFeed)
        assertTrue(engine.isInFeed)
        detect(notInFeed)
        assertFalse(engine.isInFeed)
    }

    @Test
    fun decisiveWindowChangeExitsAtOnce() {
        detect(inFeedHigh)
        advance(1_000)
        detect(notInFeed, decisive = true)
        assertFalse(engine.isInFeed)
        assertEquals(ExitReason.LEFT_FEED, sessionsEnded().first().reason)
    }

    @Test
    fun returningQuicklyWithoutFingerprintDoesNotRecountVisibleReel() {
        detect(inFeedHigh)
        advance(1_000)
        events += engine.forceExit(ExitReason.APP_SWITCH, now)
        advance(30_000)
        detect(inFeedHigh)
        advance(1_000)
        assertEquals(1, counted())
        assertTrue(sessionsStarted().last().resumed)
        swipeTo(5)
        advance(1_000)
        assertEquals(2, counted())
    }

    @Test
    fun returningToSameReelAfterLockIsRecognisedByFingerprint() {
        detect(inFeedHigh, fingerprint = "fp-a")
        advance(1_000)
        events += engine.forceExit(ExitReason.SCREEN_OFF, now)
        advance(10 * 60_000)
        detect(inFeedHigh, fingerprint = "fp-a")
        advance(1_000)
        assertEquals(1, counted())
    }

    @Test
    fun returningAfterGraceToNewReelCountsIt() {
        detect(inFeedHigh, fingerprint = "fp-a")
        advance(1_000)
        events += engine.forceExit(ExitReason.SCREEN_OFF, now)
        advance(10 * 60_000)
        detect(inFeedHigh, fingerprint = "fp-b")
        advance(1_000)
        assertEquals(2, counted())
    }

    @Test
    fun switchingAppsClosesSessionAndStartsNewOne() {
        detect(inFeedHigh)
        advance(1_000)
        detect(inFeedHigh, target = TrackedApp.YOUTUBE)
        advance(1_000)
        assertEquals(ExitReason.APP_SWITCH, sessionsEnded().first().reason)
        assertEquals(TrackedApp.YOUTUBE, sessionsStarted().last().app)
        assertEquals(2, counted())
    }

    @Test
    fun fingerprintFallbackCountsWhenIndicesUnavailable() {
        detect(inFeedHigh, fingerprint = "fp-0")
        advance(1_000)
        scroll(-1, -1, count = -1)
        now += 400
        detect(inFeedHigh, fingerprint = "fp-1")
        advance(1_000)
        scroll(-1, -1, count = -1, deltaY = 60)
        now += 400
        detect(inFeedHigh, fingerprint = "fp-1")
        advance(1_000)
        assertEquals(2, counted())
        assertEquals(CountMethod.FINGERPRINT, events.filterIsInstance<EngineEvent.ItemCounted>().last().method)
    }

    @Test
    fun fingerprintFallbackDoesNotRecountRevisits() {
        detect(inFeedHigh, fingerprint = "fp-0")
        advance(1_000)
        scroll(-1, -1, count = -1)
        now += 400
        detect(inFeedHigh, fingerprint = "fp-1")
        advance(1_000)
        scroll(-1, -1, count = -1, deltaY = -100)
        now += 400
        detect(inFeedHigh, fingerprint = "fp-0")
        advance(1_000)
        assertEquals(2, counted())
    }

    @Test
    fun idleEndsSessionAndActivityResumesWithoutCounting() {
        engine = CountingEngine(EngineConfig(idleSessionMs = 5_000))
        detect(inFeedHigh)
        advance(6_000)
        assertEquals(ExitReason.IDLE, sessionsEnded().first().reason)
        detect(inFeedHigh)
        assertTrue(sessionsStarted().last().resumed)
        advance(1_000)
        assertEquals(1, counted())
    }

    @Test
    fun feedReloadResetsIndexHistory() {
        detect(inFeedHigh)
        advance(1_000)
        for (i in 1..10) {
            swipeTo(i)
            advance(1_000)
        }
        scroll(1, 1, count = 3)
        advance(1_000)
        assertEquals(12, counted())
        assertEquals(1L, engine.stats.feedReloads)
    }
}
