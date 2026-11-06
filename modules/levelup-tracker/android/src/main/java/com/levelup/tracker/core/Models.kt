package com.levelup.tracker.core

enum class TrackedApp(
    val id: String,
    val packages: Set<String>,
    val experimental: Boolean,
) {
    INSTAGRAM("instagram", setOf("com.instagram.android"), false),
    YOUTUBE("youtube", setOf("com.google.android.youtube"), false),
    FACEBOOK("facebook", setOf("com.facebook.katana"), true);

    companion object {
        fun fromPackage(packageName: CharSequence?): TrackedApp? {
            val name = packageName?.toString() ?: return null
            return entries.firstOrNull { name in it.packages }
        }

        fun fromId(id: String?): TrackedApp? = entries.firstOrNull { it.id == id }
    }
}

enum class Confidence(val rank: Int) {
    NONE(0),
    LOW(1),
    MEDIUM(2),
    HIGH(3);

    fun atLeast(other: Confidence): Boolean = rank >= other.rank

    fun coerceAtMost(other: Confidence): Confidence = if (rank <= other.rank) this else other

    companion object {
        fun fromName(name: String?): Confidence = entries.firstOrNull { it.name == name } ?: NONE
    }
}

enum class FeedState { IN_FEED, NOT_IN_FEED, UNKNOWN }

enum class CountMethod { ENTRY, PAGER_INDEX, FINGERPRINT }

enum class ExitReason { LEFT_FEED, HARD_NEGATIVE, APP_SWITCH, SCREEN_OFF, IDLE, TRACKING_DISABLED, SERVICE_STOPPED }

enum class RejectReason { DUPLICATE_EVENT, REVISIT, BELOW_DWELL, LOW_CONFIDENCE, NON_FEED_SCROLL, ENTRY_RESUMED }

data class PagerInfo(
    val viewId: String?,
    val className: String?,
    val heightFraction: Float,
    val widthFraction: Float,
    val vertical: Boolean,
)

data class ScreenSummary(
    val packageName: String,
    val windowClassName: String?,
    val viewIds: Set<String>,
    val selectedLabels: Set<String>,
    val fullScreenPagers: List<PagerInfo>,
    val pageFingerprint: String?,
    val nodesVisited: Int,
    val truncated: Boolean,
    val sensitive: Boolean,
) {
    val isEmpty: Boolean get() = nodesVisited == 0

    companion object {
        fun empty(packageName: String, windowClassName: String? = null) = ScreenSummary(
            packageName = packageName,
            windowClassName = windowClassName,
            viewIds = emptySet(),
            selectedLabels = emptySet(),
            fullScreenPagers = emptyList(),
            pageFingerprint = null,
            nodesVisited = 0,
            truncated = false,
            sensitive = false,
        )
    }
}

data class ScrollInfo(
    val fromIndex: Int,
    val toIndex: Int,
    val itemCount: Int,
    val deltaX: Int,
    val deltaY: Int,
    val sourceViewId: String?,
    val sourceClassName: String?,
    val sourceHeightFraction: Float,
    val sourceWidthFraction: Float,
) {
    val hasIndices: Boolean get() = fromIndex >= 0 && toIndex >= 0
    val isSettled: Boolean get() = hasIndices && fromIndex == toIndex
    val isHorizontalOnly: Boolean get() = deltaX != 0 && deltaY == 0
}

data class Detection(
    val state: FeedState,
    val confidence: Confidence,
    val hardExit: Boolean,
    val signals: List<String>,
) {
    companion object {
        fun unknown(reason: String) = Detection(FeedState.UNKNOWN, Confidence.NONE, false, listOf(reason))
    }
}

sealed class EngineEvent {
    data class SessionStarted(val app: TrackedApp, val at: Long, val confidence: Confidence, val resumed: Boolean) : EngineEvent()
    data class SessionEnded(val app: TrackedApp, val at: Long, val reason: ExitReason) : EngineEvent()
    data class ItemCounted(val app: TrackedApp, val at: Long, val confidence: Confidence, val method: CountMethod) : EngineEvent()
    data class Rejected(val app: TrackedApp, val at: Long, val reason: RejectReason, val detail: String) : EngineEvent()
}
