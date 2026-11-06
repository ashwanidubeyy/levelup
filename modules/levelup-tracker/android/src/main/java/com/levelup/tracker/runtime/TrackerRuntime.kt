package com.levelup.tracker.runtime

import com.levelup.tracker.core.Confidence
import com.levelup.tracker.core.EngineSnapshot
import com.levelup.tracker.core.EngineStats
import com.levelup.tracker.core.TrackedApp
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.CopyOnWriteArrayList

class AppDiagnostics {
    @Volatile var eventsSeen = 0L
    @Volatile var inspections = 0L
    @Volatile var detectionsHigh = 0L
    @Volatile var detectionsMedium = 0L
    @Volatile var detectionsLow = 0L
    @Volatile var detectionsNone = 0L
    @Volatile var counted = 0L
    @Volatile var lastState: String? = null
    @Volatile var lastConfidence: String? = null
    @Volatile var lastSignals: String? = null
    @Volatile var lastDetectionAt = 0L
    @Volatile var lastCountedAt = 0L
    @Volatile var lastInspectionNodes = 0
    @Volatile var lastInspectionMs = 0L
    @Volatile var fingerprintsSeen = 0L
}

data class TrackerUpdate(
    val app: String?,
    val inFeed: Boolean,
    val confidence: String,
    val sessionCount: Int,
    val todayTotal: Int,
    val dailyLimit: Int,
    val at: Long,
)

object TrackerRuntime {
    @Volatile var serviceConnected = false
    @Volatile var serviceConnectedAt = 0L
    @Volatile var engineSnapshot: EngineSnapshot? = null
    @Volatile var engineStats: EngineStats? = null
    @Volatile var lastUpdate: TrackerUpdate? = null

    private val diagnostics = ConcurrentHashMap<TrackedApp, AppDiagnostics>()
    private val listeners = CopyOnWriteArrayList<(TrackerUpdate) -> Unit>()

    fun diagnostics(app: TrackedApp): AppDiagnostics = diagnostics.getOrPut(app) { AppDiagnostics() }

    fun recordDetection(app: TrackedApp, state: String, confidence: Confidence, signals: List<String>, at: Long) {
        val d = diagnostics(app)
        when (confidence) {
            Confidence.HIGH -> d.detectionsHigh++
            Confidence.MEDIUM -> d.detectionsMedium++
            Confidence.LOW -> d.detectionsLow++
            Confidence.NONE -> d.detectionsNone++
        }
        d.lastState = state
        d.lastConfidence = confidence.name
        d.lastSignals = signals.joinToString(";").take(300)
        d.lastDetectionAt = at
    }

    fun resetDiagnostics() = diagnostics.clear()

    fun addListener(listener: (TrackerUpdate) -> Unit) = listeners.add(listener)

    fun removeListener(listener: (TrackerUpdate) -> Unit) = listeners.remove(listener)

    fun publish(update: TrackerUpdate) {
        lastUpdate = update
        listeners.forEach { it(update) }
    }
}
