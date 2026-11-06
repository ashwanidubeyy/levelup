package com.levelup.tracker.core

data class EngineConfig(
    val dwellMs: Long = 500L,
    val burstWindowMs: Long = 250L,
    val settleMs: Long = 350L,
    val exitStreak: Int = 2,
    val idleSessionMs: Long = 120_000L,
    val resumeGraceMs: Long = 120_000L,
    val recentFingerprintTtlMs: Long = 30L * 60_000L,
    val maxVisited: Int = 600,
    val maxRecentFingerprints: Int = 400,
    val feedReloadDrop: Int = 4,
    val minCountConfidence: Confidence = Confidence.MEDIUM,
)

data class EngineStats(
    var duplicateEvents: Long = 0,
    var nonFeedScrolls: Long = 0,
    var revisits: Long = 0,
    var belowDwell: Long = 0,
    var lowConfidence: Long = 0,
    var entryResumed: Long = 0,
    var feedReloads: Long = 0,
    var counted: Long = 0,
)

data class EngineSnapshot(
    val app: TrackedApp?,
    val inFeed: Boolean,
    val idle: Boolean,
    val feedConfidence: Confidence,
    val lastSettledIndex: Int?,
    val pendingMethod: CountMethod?,
    val visitedCount: Int,
    val recentFingerprintCount: Int,
)

class CountingEngine(config: EngineConfig = EngineConfig()) {

    private data class Candidate(
        val method: CountMethod,
        val index: Int?,
        val startedAt: Long,
        val confidence: Confidence,
    )

    private data class LastExit(val app: TrackedApp, val at: Long)

    var config: EngineConfig = config
        set(value) {
            field = value
            recentFingerprints = ExpiringSet(value.maxRecentFingerprints, value.recentFingerprintTtlMs)
        }

    val stats = EngineStats()

    private var app: TrackedApp? = null
    private var inFeed = false
    private var idle = false
    private var feedConfidence = Confidence.NONE
    private var notInFeedStreak = 0
    private var lastActivityAt = 0L
    private var lastExit: LastExit? = null

    private val visitedIndices = BoundedSet<Int>(config.maxVisited)
    private var recentFingerprints = ExpiringSet<String>(config.maxRecentFingerprints, config.recentFingerprintTtlMs)
    private var lastSettledIndex: Int? = null
    private var lastItemCount = -1
    private var entryIndexUnresolved = false
    private var entryNetDelta = 0L
    private var entryAbsDelta = 0L
    private var entrySeen = false
    private var pending: Candidate? = null
    private var currentItemSeen = false

    private var lastScrollKey: String? = null
    private var lastScrollAt = 0L
    private var awaitingSettle = false
    private var fingerprintBeforeScroll: String? = null
    private var lastFingerprint: String? = null
    private var lastFingerprintAt = 0L
    private var lastLowConfidenceLogAt = 0L

    val currentApp: TrackedApp? get() = app
    val isInFeed: Boolean get() = inFeed && !idle
    val currentConfidence: Confidence get() = if (inFeed) feedConfidence else Confidence.NONE

    fun snapshot() = EngineSnapshot(
        app = app,
        inFeed = inFeed,
        idle = idle,
        feedConfidence = feedConfidence,
        lastSettledIndex = lastSettledIndex,
        pendingMethod = pending?.method,
        visitedCount = visitedIndices.size,
        recentFingerprintCount = recentFingerprints.size,
    )

    fun onDetection(
        app: TrackedApp,
        detection: Detection,
        fingerprint: String?,
        decisive: Boolean,
        now: Long,
    ): List<EngineEvent> {
        val out = mutableListOf<EngineEvent>()
        if (inFeed && this.app != null && this.app != app) {
            exit(ExitReason.APP_SWITCH, now, out)
        }
        when (detection.state) {
            FeedState.IN_FEED -> handleInFeed(app, detection, fingerprint, now, out)
            FeedState.NOT_IN_FEED -> handleNotInFeed(app, detection, decisive, now, out)
            FeedState.UNKNOWN -> Unit
        }
        return out
    }

    fun onScroll(app: TrackedApp, scroll: ScrollInfo, fromFeedSource: Boolean, now: Long): List<EngineEvent> {
        val out = mutableListOf<EngineEvent>()
        if (!inFeed || this.app != app) return out
        if (!fromFeedSource) {
            stats.nonFeedScrolls++
            return out
        }
        markActivity(app, now, out)

        val key = "${scroll.fromIndex}:${scroll.toIndex}:${scroll.itemCount}:${scroll.deltaY.coerceIn(-1, 1)}"
        if (key == lastScrollKey && now - lastScrollAt < config.burstWindowMs) {
            stats.duplicateEvents++
            lastScrollAt = now
            return out
        }
        lastScrollKey = key
        lastScrollAt = now

        if (scroll.hasIndices) handleIndexedScroll(app, scroll, now, out) else handleUnindexedScroll()
        return out
    }

    fun onTick(now: Long): List<EngineEvent> {
        val out = mutableListOf<EngineEvent>()
        val currentApp = app ?: return out
        if (!inFeed) return out
        val candidate = pending
        if (candidate != null && !idle && now - candidate.startedAt >= config.dwellMs) {
            commit(currentApp, candidate, now, out)
        }
        if (!idle && now - lastActivityAt >= config.idleSessionMs) {
            idle = true
            out += EngineEvent.SessionEnded(currentApp, lastActivityAt, ExitReason.IDLE)
        }
        return out
    }

    fun forceExit(reason: ExitReason, now: Long): List<EngineEvent> {
        val out = mutableListOf<EngineEvent>()
        if (inFeed) exit(reason, now, out)
        return out
    }

    private fun handleInFeed(
        app: TrackedApp,
        detection: Detection,
        fingerprint: String?,
        now: Long,
        out: MutableList<EngineEvent>,
    ) {
        if (!detection.confidence.atLeast(config.minCountConfidence)) {
            if (inFeed) {
                handleNotInFeed(app, detection.copy(hardExit = false), false, now, out)
                return
            }
            stats.lowConfidence++
            if (now - lastLowConfidenceLogAt > 5_000L) {
                lastLowConfidenceLogAt = now
                out += EngineEvent.Rejected(app, now, RejectReason.LOW_CONFIDENCE, detection.signals.joinToString(";"))
            }
            return
        }
        notInFeedStreak = 0
        if (!inFeed) {
            enter(app, detection.confidence, fingerprint, now, out)
            return
        }
        feedConfidence = detection.confidence
        markActivity(app, now, out)
        observeFingerprint(app, fingerprint, now, out)
    }

    private fun handleNotInFeed(
        app: TrackedApp,
        detection: Detection,
        decisive: Boolean,
        now: Long,
        out: MutableList<EngineEvent>,
    ) {
        if (!inFeed || this.app != app) return
        notInFeedStreak++
        when {
            detection.hardExit -> exit(ExitReason.HARD_NEGATIVE, now, out)
            decisive || notInFeedStreak >= config.exitStreak -> exit(ExitReason.LEFT_FEED, now, out)
        }
    }

    private fun enter(
        app: TrackedApp,
        confidence: Confidence,
        fingerprint: String?,
        now: Long,
        out: MutableList<EngineEvent>,
    ) {
        val previous = lastExit
        val resumed = previous != null && previous.app == app && now - previous.at <= config.resumeGraceMs
        this.app = app
        inFeed = true
        idle = false
        feedConfidence = confidence
        notInFeedStreak = 0
        lastActivityAt = now
        visitedIndices.clear()
        lastSettledIndex = null
        lastItemCount = -1
        awaitingSettle = false
        lastScrollKey = null
        pending = null
        entryIndexUnresolved = true
        entryNetDelta = 0L
        entryAbsDelta = 0L
        lastFingerprint = fingerprint
        lastFingerprintAt = if (fingerprint != null) now else 0L

        out += EngineEvent.SessionStarted(app, now, confidence, resumed)

        val knownFingerprint = fingerprint != null && recentFingerprints.contains(fingerprint, now)
        when {
            knownFingerprint -> {
                stats.revisits++
                entrySeen = true
                currentItemSeen = true
                out += EngineEvent.Rejected(app, now, RejectReason.REVISIT, "entry")
            }
            fingerprint == null && resumed -> {
                stats.entryResumed++
                entrySeen = true
                currentItemSeen = true
                out += EngineEvent.Rejected(app, now, RejectReason.ENTRY_RESUMED, "entry")
            }
            else -> {
                entrySeen = false
                currentItemSeen = false
                pending = Candidate(CountMethod.ENTRY, null, now, confidence)
            }
        }
    }

    private fun exit(reason: ExitReason, now: Long, out: MutableList<EngineEvent>) {
        val currentApp = app ?: return
        dropPending(currentApp, now, out)
        if (currentItemSeen) lastFingerprint?.let { recentFingerprints.add(it, now) }
        if (!idle) out += EngineEvent.SessionEnded(currentApp, now, reason)
        lastExit = LastExit(currentApp, now)
        inFeed = false
        idle = false
        feedConfidence = Confidence.NONE
        notInFeedStreak = 0
        visitedIndices.clear()
        lastSettledIndex = null
        lastItemCount = -1
        awaitingSettle = false
        entryIndexUnresolved = false
        currentItemSeen = false
        lastScrollKey = null
    }

    private fun markActivity(app: TrackedApp, now: Long, out: MutableList<EngineEvent>) {
        lastActivityAt = now
        if (idle) {
            idle = false
            out += EngineEvent.SessionStarted(app, now, feedConfidence, true)
        }
    }

    private fun handleIndexedScroll(app: TrackedApp, scroll: ScrollInfo, now: Long, out: MutableList<EngineEvent>) {
        if (lastItemCount > 0 && scroll.itemCount in 1 until (lastItemCount - config.feedReloadDrop)) {
            stats.feedReloads++
            visitedIndices.clear()
            lastSettledIndex = null
        }
        if (scroll.itemCount > 0) lastItemCount = scroll.itemCount
        awaitingSettle = false
        if (entryIndexUnresolved) {
            entryNetDelta += scroll.deltaY
            entryAbsDelta += kotlin.math.abs(scroll.deltaY)
        }
        if (!scroll.isSettled) return

        val index = scroll.fromIndex
        if (index == lastSettledIndex) return

        if (lastSettledIndex == null && entryIndexUnresolved) {
            entryIndexUnresolved = false
            val entryIndex = inferEntryIndex(index)
            val entryPending = pending?.method == CountMethod.ENTRY
            if (entryIndex == index) {
                lastSettledIndex = index
                if (entryPending) {
                    pending = pending?.copy(index = index)
                } else if (entrySeen) {
                    visitedIndices.add(index)
                }
                return
            }
            if (entryPending) {
                dropPending(app, now, out)
            } else if (entrySeen && entryIndex >= 0) {
                visitedIndices.add(entryIndex)
            }
        }

        val candidate = pending
        if (candidate != null && candidate.index != index) dropPending(app, now, out)

        lastSettledIndex = index
        if (index in visitedIndices) {
            stats.revisits++
            currentItemSeen = true
            out += EngineEvent.Rejected(app, now, RejectReason.REVISIT, "index:$index")
        } else {
            currentItemSeen = false
            pending = Candidate(CountMethod.PAGER_INDEX, index, now, Confidence.HIGH.coerceAtMost(feedConfidence))
        }
    }

    private fun inferEntryIndex(settledIndex: Int): Int = when {
        entryAbsDelta == 0L -> settledIndex - 1
        kotlin.math.abs(entryNetDelta) * 10 < entryAbsDelta * 3 -> settledIndex
        entryNetDelta < 0 -> settledIndex + 1
        else -> settledIndex - 1
    }

    private fun handleUnindexedScroll() {
        if (!awaitingSettle) {
            awaitingSettle = true
            fingerprintBeforeScroll = lastFingerprint
        }
    }

    private fun observeFingerprint(app: TrackedApp, fingerprint: String?, now: Long, out: MutableList<EngineEvent>) {
        if (fingerprint == null) return
        val settled = awaitingSettle && now - lastScrollAt >= config.settleMs
        if (settled && fingerprint == fingerprintBeforeScroll) awaitingSettle = false
        if (settled && fingerprint != fingerprintBeforeScroll) {
            awaitingSettle = false
            dropPending(app, now, out)
            if (recentFingerprints.contains(fingerprint, now)) {
                stats.revisits++
                currentItemSeen = true
                out += EngineEvent.Rejected(app, now, RejectReason.REVISIT, "fingerprint")
            } else {
                currentItemSeen = false
                pending = Candidate(CountMethod.FINGERPRINT, null, now, Confidence.MEDIUM.coerceAtMost(feedConfidence))
            }
        }
        if (fingerprint != lastFingerprint) {
            lastFingerprint = fingerprint
            lastFingerprintAt = now
        }
        if (currentItemSeen && !awaitingSettle) recentFingerprints.add(fingerprint, now)
    }

    private fun commit(app: TrackedApp, candidate: Candidate, now: Long, out: MutableList<EngineEvent>) {
        pending = null
        currentItemSeen = true
        if (candidate.method == CountMethod.ENTRY) entrySeen = true
        candidate.index?.let { visitedIndices.add(it) }
        if (lastFingerprintAt >= candidate.startedAt) lastFingerprint?.let { recentFingerprints.add(it, now) }
        stats.counted++
        out += EngineEvent.ItemCounted(app, now, candidate.confidence.coerceAtMost(feedConfidence), candidate.method)
    }

    private fun dropPending(app: TrackedApp, now: Long, out: MutableList<EngineEvent>) {
        val candidate = pending ?: return
        pending = null
        stats.belowDwell++
        out += EngineEvent.Rejected(app, now, RejectReason.BELOW_DWELL, "${candidate.method}:${now - candidate.startedAt}ms")
    }
}
