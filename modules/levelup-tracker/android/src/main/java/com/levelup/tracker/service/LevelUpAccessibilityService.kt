package com.levelup.tracker.service

import android.accessibilityservice.AccessibilityService
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.SharedPreferences
import android.graphics.Rect
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.util.DisplayMetrics
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import com.levelup.tracker.core.CountingEngine
import com.levelup.tracker.core.Detection
import com.levelup.tracker.core.EngineEvent
import com.levelup.tracker.core.ExitReason
import com.levelup.tracker.core.FeedState
import com.levelup.tracker.core.ScreenSummary
import com.levelup.tracker.core.ScrollInfo
import com.levelup.tracker.core.TrackedApp
import com.levelup.tracker.data.TrackerPrefs
import com.levelup.tracker.data.TrackerRepository
import com.levelup.tracker.detector.DetectorRegistry
import com.levelup.tracker.overlay.OverlayController
import com.levelup.tracker.widget.ReelCountWidgetProvider
import com.levelup.tracker.runtime.TrackerRuntime
import com.levelup.tracker.runtime.TrackerUpdate

class LevelUpAccessibilityService : AccessibilityService() {

    private val handler = Handler(Looper.getMainLooper())
    private lateinit var prefs: TrackerPrefs
    private lateinit var repository: TrackerRepository
    private lateinit var overlay: OverlayController
    private lateinit var inspector: ScreenInspector
    private val engine = CountingEngine()

    private var lastInspectionAt = 0L
    private var lastSummary: ScreenSummary? = null
    private val lastWindowClass = HashMap<TrackedApp, String>()
    private var deferredInspectionApp: TrackedApp? = null
    private var sessionCount = 0
    private var todayTotal = 0
    private var todayKey = ""
    private var foreignWindowSince = 0L
    private var lastEventAt = 0L
    private var lastSessionTouchAt = 0L
    private var tickRunning = false
    private var receiverRegistered = false
    private var widgetRefreshQueued = false
    private var lastPublishedSignature: String? = null

    private val tick = object : Runnable {
        override fun run() {
            onTick()
            if (tickRunning) handler.postDelayed(this, TICK_MS)
        }
    }

    private val widgetRefresh = Runnable {
        widgetRefreshQueued = false
        if (!::prefs.isInitialized) return@Runnable
        ReelCountWidgetProvider.refreshAll(this, todayTotal, prefs.dailyLimit)
    }

    private val deferredInspection = Runnable {
        val app = deferredInspectionApp ?: return@Runnable
        deferredInspectionApp = null
        val summary = inspectActiveWindow(app, lastWindowClass[app]) ?: return@Runnable
        handleDetection(app, summary, decisive = false)
    }

    private val screenReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val now = System.currentTimeMillis()
            when (intent.action) {
                Intent.ACTION_SCREEN_OFF -> dispatch(engine.forceExit(ExitReason.SCREEN_OFF, now))
                Intent.ACTION_SCREEN_ON, Intent.ACTION_USER_PRESENT -> repository.markServiceDay(now)
            }
        }
    }

    private val prefsListener = SharedPreferences.OnSharedPreferenceChangeListener { _, key ->
        handler.post { onPrefsChanged(key) }
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        prefs = TrackerPrefs.get(this)
        repository = TrackerRepository.get(this)
        overlay = OverlayController(this, prefs)
        inspector = ScreenInspector { screenBounds() }
        engine.config = prefs.engineConfig()
        val now = System.currentTimeMillis()
        repository.closeDanglingSessions()
        repository.markServiceDay(now)
        repository.diagnostic(null, KIND_SERVICE, "connected sdk=${Build.VERSION.SDK_INT}")
        prefs.register(prefsListener)
        registerScreenReceiver()
        TrackerRuntime.serviceConnected = true
        TrackerRuntime.serviceConnectedAt = now
        TrackerRuntime.engineStats = engine.stats
        refreshTodayTotal()
        publish(null)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null || !::prefs.isInitialized) return
        if (!prefs.trackingEnabled) return
        val app = TrackedApp.fromPackage(event.packageName) ?: return
        if (!prefs.isAppEnabled(app)) {
            if (engine.currentApp == app) dispatch(engine.forceExit(ExitReason.TRACKING_DISABLED, System.currentTimeMillis()))
            return
        }
        val now = System.currentTimeMillis()
        lastEventAt = now
        foreignWindowSince = 0L
        TrackerRuntime.diagnostics(app).eventsSeen++

        when (event.eventType) {
            AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED -> {
                val windowClass = event.className?.toString()
                if (windowClass != null) lastWindowClass[app] = windowClass
                val summary = inspectActiveWindow(app, windowClass) ?: return
                handleDetection(app, summary, decisive = isActivityClass(windowClass))
            }
            AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED -> {
                if (now - lastInspectionAt < CONTENT_THROTTLE_MS) {
                    scheduleDeferredInspection(app)
                    return
                }
                val summary = inspectActiveWindow(app, lastWindowClass[app]) ?: return
                handleDetection(app, summary, decisive = false)
            }
            AccessibilityEvent.TYPE_VIEW_SCROLLED -> {
                val scroll = scrollInfo(event)
                var summary = lastSummary?.takeIf { it.packageName == event.packageName?.toString() }
                if (now - lastInspectionAt >= SCROLL_THROTTLE_MS) {
                    summary = inspectActiveWindow(app, lastWindowClass[app])
                    summary?.let { handleDetection(app, it, decisive = false) }
                } else {
                    scheduleDeferredInspection(app)
                }
                val detector = DetectorRegistry.forApp(app)
                dispatch(engine.onScroll(app, scroll, detector.isFeedScrollSource(scroll, summary), now))
            }
        }
    }

    override fun onInterrupt() = Unit

    override fun onUnbind(intent: Intent?): Boolean {
        shutdown()
        return super.onUnbind(intent)
    }

    override fun onDestroy() {
        shutdown()
        super.onDestroy()
    }

    private fun shutdown() {
        if (!::prefs.isInitialized || !TrackerRuntime.serviceConnected) return
        dispatch(engine.forceExit(ExitReason.SERVICE_STOPPED, System.currentTimeMillis()))
        stopTick()
        handler.removeCallbacksAndMessages(null)
        overlay.hide()
        prefs.unregister(prefsListener)
        if (receiverRegistered) {
            runCatching { unregisterReceiver(screenReceiver) }
            receiverRegistered = false
        }
        repository.diagnostic(null, KIND_SERVICE, "disconnected")
        TrackerRuntime.serviceConnected = false
        publish(null)
    }

    private fun handleDetection(app: TrackedApp, summary: ScreenSummary, decisive: Boolean) {
        val detector = DetectorRegistry.forApp(app)
        val detection = detector.detect(summary)
        val now = System.currentTimeMillis()
        TrackerRuntime.recordDetection(app, detection.state.name, detection.confidence, detection.signals, now)
        if (summary.pageFingerprint != null) TrackerRuntime.diagnostics(app).fingerprintsSeen++
        logDetectionChange(app, detection)
        dispatch(engine.onDetection(app, detection, summary.pageFingerprint, decisive, now))
    }

    private var lastLoggedState: String? = null

    private fun logDetectionChange(app: TrackedApp, detection: Detection) {
        val key = "${app.id}:${detection.state}:${detection.confidence}"
        if (key == lastLoggedState) return
        lastLoggedState = key
        repository.diagnostic(app, KIND_DETECTION, "${detection.state}/${detection.confidence} ${detection.signals.joinToString(";")}")
    }

    private fun dispatch(events: List<EngineEvent>) {
        if (events.isEmpty()) {
            syncTick()
            return
        }
        for (event in events) {
            when (event) {
                is EngineEvent.SessionStarted -> {
                    sessionCount = 0
                    repository.sessionStarted(event.app, event.at, event.confidence)
                    repository.markServiceDay(event.at)
                    lastSessionTouchAt = event.at
                    repository.diagnostic(event.app, KIND_SESSION, "start ${event.confidence}${if (event.resumed) " resumed" else ""}")
                }
                is EngineEvent.SessionEnded -> {
                    repository.sessionEnded(event.at, event.reason)
                    repository.diagnostic(event.app, KIND_SESSION, "end ${event.reason} items=$sessionCount")
                }
                is EngineEvent.ItemCounted -> {
                    ensureToday(event.at)
                    sessionCount++
                    todayTotal++
                    repository.itemCounted(event.app, event.at, event.confidence, event.method)
                    val d = TrackerRuntime.diagnostics(event.app)
                    d.counted++
                    d.lastCountedAt = event.at
                    repository.diagnostic(event.app, KIND_COUNT, "${event.method} ${event.confidence} session=$sessionCount")
                }
                is EngineEvent.Rejected -> repository.diagnostic(event.app, "reject", "${event.reason} ${event.detail}")
            }
        }
        syncTick()
        updateOverlay()
        publish(engine.currentApp)
    }

    private fun onTick() {
        val now = System.currentTimeMillis()
        if (engine.snapshot().inFeed) checkForegroundApp(now)
        val events = engine.onTick(now)
        if (engine.isInFeed && now - lastSessionTouchAt >= SESSION_TOUCH_MS) {
            lastSessionTouchAt = now
            repository.touchSession(lastEventAt.coerceAtMost(now))
        }
        TrackerRuntime.engineSnapshot = engine.snapshot()
        dispatch(events)
    }

    private fun checkForegroundApp(now: Long) {
        val root = runCatching { rootInActiveWindow }.getOrNull()
        val packageName = root?.packageName?.toString()
        release(root)
        val app = engine.currentApp
        when {
            packageName != null && TrackedApp.fromPackage(packageName) == app -> foreignWindowSince = 0L
            packageName != null -> {
                if (foreignWindowSince == 0L) foreignWindowSince = now
                if (now - foreignWindowSince >= FOREIGN_WINDOW_EXIT_MS) dispatch(engine.forceExit(ExitReason.APP_SWITCH, now))
            }
            now - lastEventAt >= UNKNOWN_WINDOW_EXIT_MS -> dispatch(engine.forceExit(ExitReason.APP_SWITCH, now))
        }
    }

    private fun syncTick() {
        val shouldRun = engine.snapshot().inFeed
        if (shouldRun && !tickRunning) {
            tickRunning = true
            handler.postDelayed(tick, TICK_MS)
        } else if (!shouldRun && tickRunning) {
            stopTick()
        }
    }

    private fun stopTick() {
        tickRunning = false
        handler.removeCallbacks(tick)
    }

    private fun inspectActiveWindow(app: TrackedApp, windowClass: String?): ScreenSummary? {
        val root = runCatching { rootInActiveWindow }.getOrNull() ?: return null
        val packageName = root.packageName?.toString()
        if (packageName == null || TrackedApp.fromPackage(packageName) != app) {
            release(root)
            return null
        }
        val started = SystemClock.elapsedRealtime()
        val detector = DetectorRegistry.forApp(app)
        val summary = runCatching {
            inspector.inspect(root, packageName, windowClass, detector.selectedLabelAllowlist)
        }.getOrNull()
        release(root)
        lastInspectionAt = System.currentTimeMillis()
        val d = TrackerRuntime.diagnostics(app)
        d.inspections++
        d.lastInspectionMs = SystemClock.elapsedRealtime() - started
        d.lastInspectionNodes = summary?.nodesVisited ?: 0
        lastSummary = summary
        return summary
    }

    private fun scheduleDeferredInspection(app: TrackedApp) {
        if (deferredInspectionApp != null) return
        deferredInspectionApp = app
        val wait = (CONTENT_THROTTLE_MS - (System.currentTimeMillis() - lastInspectionAt)).coerceIn(50L, CONTENT_THROTTLE_MS)
        handler.postDelayed(deferredInspection, wait)
    }

    private fun scrollInfo(event: AccessibilityEvent): ScrollInfo {
        val screen = screenBounds()
        var viewId: String? = null
        var className: String? = event.className?.toString()
        var heightFraction = 0f
        var widthFraction = 0f
        val source = runCatching { event.source }.getOrNull()
        if (source != null) {
            val bounds = Rect()
            source.getBoundsInScreen(bounds)
            heightFraction = bounds.height() / screen.height().coerceAtLeast(1).toFloat()
            widthFraction = bounds.width() / screen.width().coerceAtLeast(1).toFloat()
            viewId = source.viewIdResourceName?.substringAfter(":id/", "")?.takeIf { it.isNotEmpty() }
            className = source.className?.toString() ?: className
            release(source)
        }
        val deltaX = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) event.scrollDeltaX else 0
        val deltaY = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) event.scrollDeltaY else 0
        return ScrollInfo(
            fromIndex = event.fromIndex,
            toIndex = event.toIndex,
            itemCount = event.itemCount,
            deltaX = if (deltaX == -1) 0 else deltaX,
            deltaY = if (deltaY == -1) 0 else deltaY,
            sourceViewId = viewId,
            sourceClassName = className,
            sourceHeightFraction = heightFraction,
            sourceWidthFraction = widthFraction,
        )
    }

    private fun onPrefsChanged(key: String?) {
        engine.config = prefs.engineConfig()
        val now = System.currentTimeMillis()
        when {
            key == TrackerPrefs.KEY_TRACKING && !prefs.trackingEnabled -> {
                dispatch(engine.forceExit(ExitReason.TRACKING_DISABLED, now))
                overlay.hide()
            }
            key != null && key.startsWith(TrackerPrefs.KEY_APP_PREFIX) -> {
                val app = engine.currentApp
                if (app != null && !prefs.isAppEnabled(app)) dispatch(engine.forceExit(ExitReason.TRACKING_DISABLED, now))
            }
        }
        updateOverlay()
        publish(engine.currentApp)
    }

    private fun updateOverlay() {
        val shouldShow = prefs.trackingEnabled && prefs.overlayEnabled && engine.isInFeed
        if (shouldShow) {
            overlay.show()
            overlay.update(sessionCount, todayTotal, prefs.dailyLimit)
        } else if (overlay.isShowing) {
            overlay.hide()
        }
    }

    private fun publish(app: TrackedApp?) {
        ensureToday(System.currentTimeMillis())
        TrackerRuntime.engineSnapshot = engine.snapshot()
        val update = TrackerUpdate(
            app = app?.id,
            inFeed = engine.isInFeed,
            confidence = engine.currentConfidence.name,
            sessionCount = sessionCount,
            todayTotal = todayTotal,
            dailyLimit = prefs.dailyLimit,
            at = System.currentTimeMillis(),
        )
        val signature = "${update.app}|${update.inFeed}|${update.confidence}|${update.sessionCount}|${update.todayTotal}|${update.dailyLimit}"
        if (signature != lastPublishedSignature) {
            lastPublishedSignature = signature
            TrackerRuntime.publish(update)
        }
        scheduleWidgetRefresh()
    }

    private fun scheduleWidgetRefresh() {
        if (widgetRefreshQueued) return
        widgetRefreshQueued = true
        handler.postDelayed(widgetRefresh, WIDGET_REFRESH_MS)
    }

    private fun ensureToday(now: Long) {
        val key = TrackerRepository.dayKey(now)
        if (key != todayKey) {
            todayKey = key
            todayTotal = 0
            refreshTodayTotal()
        }
    }

    private fun refreshTodayTotal() {
        if (!::prefs.isInitialized) return
        todayKey = TrackerRepository.dayKey(System.currentTimeMillis())
        Thread {
            val total = runCatching { repository.todayTotal() }.getOrDefault(0)
            handler.post {
                if (!::prefs.isInitialized || !TrackerRuntime.serviceConnected) return@post
                todayTotal = maxOf(todayTotal, total)
                updateOverlay()
                publish(engine.currentApp)
            }
        }.start()
    }

    private fun registerScreenReceiver() {
        if (receiverRegistered) return
        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_SCREEN_OFF)
            addAction(Intent.ACTION_SCREEN_ON)
            addAction(Intent.ACTION_USER_PRESENT)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(screenReceiver, filter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            registerReceiver(screenReceiver, filter)
        }
        receiverRegistered = true
    }

    private fun screenBounds(): Rect {
        val wm = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Rect(wm.currentWindowMetrics.bounds)
        } else {
            val metrics = DisplayMetrics()
            @Suppress("DEPRECATION")
            wm.defaultDisplay.getRealMetrics(metrics)
            Rect(0, 0, metrics.widthPixels, metrics.heightPixels)
        }
    }

    private fun isActivityClass(className: String?): Boolean =
        className != null && className.endsWith("Activity") && !className.startsWith("android.")

    @Suppress("DEPRECATION")
    private fun release(node: AccessibilityNodeInfo?) {
        if (node != null && Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) node.recycle()
    }

    companion object {
        private const val WIDGET_REFRESH_MS = 3_000L
        private const val TICK_MS = 250L
        private const val CONTENT_THROTTLE_MS = 450L
        private const val SCROLL_THROTTLE_MS = 250L
        private const val SESSION_TOUCH_MS = 15_000L
        private const val UNKNOWN_WINDOW_EXIT_MS = 4_000L
        private const val FOREIGN_WINDOW_EXIT_MS = 750L
        private const val KIND_SERVICE = "service"
        private const val KIND_DETECTION = "detection"
        private const val KIND_SESSION = "session"
        private const val KIND_COUNT = "count"
    }
}
