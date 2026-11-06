package com.levelup.tracker.bridge

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.levelup.tracker.core.TrackedApp
import com.levelup.tracker.data.DayCounts
import com.levelup.tracker.data.TrackerPrefs
import com.levelup.tracker.data.TrackerRepository
import com.levelup.tracker.detector.DetectorRegistry
import com.levelup.tracker.runtime.TrackerRuntime
import com.levelup.tracker.runtime.TrackerUpdate

class LevelUpTrackerModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private val prefs get() = TrackerPrefs.get(context)
    private val repository get() = TrackerRepository.get(context)

    private val listener: (TrackerUpdate) -> Unit = { update ->
        if (context.hasActiveReactInstance()) {
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(EVENT_UPDATE, update.toMap())
        }
    }

    override fun getName(): String = NAME

    override fun initialize() {
        super.initialize()
        TrackerRuntime.addListener(listener)
    }

    override fun invalidate() {
        TrackerRuntime.removeListener(listener)
        super.invalidate()
    }

    @ReactMethod
    fun addListener(eventName: String) = Unit

    @ReactMethod
    fun removeListeners(count: Double) = Unit

    @ReactMethod
    fun getCapabilities(promise: Promise) = resolve(promise) {
        Arguments.createMap().apply {
            putString("platform", "android")
            putInt("sdkInt", Build.VERSION.SDK_INT)
            putBoolean("accessibilityEnabled", PermissionStatus.isAccessibilityEnabled(context))
            putBoolean("serviceConnected", TrackerRuntime.serviceConnected)
            putBoolean("overlayPermission", PermissionStatus.canDrawOverlays(context))
            putBoolean("batteryOptimizationIgnored", PermissionStatus.isIgnoringBatteryOptimizations(context))
            putBoolean("restrictedSettingsLikely", PermissionStatus.restrictedSettingsLikely(context))
            putBoolean("trackingEnabled", prefs.trackingEnabled)
            putBoolean("overlayEnabled", prefs.overlayEnabled)
            putInt("dailyLimit", prefs.dailyLimit)
            putDouble("dwellMs", prefs.dwellMs.toDouble())
            putBoolean("allowLowConfidence", prefs.allowLowConfidence)
            putString("overlayMode", "accessibilityOverlay")
            putString("validationStatus", VALIDATION_STATUS)
            putArray("apps", appsArray())
        }
    }

    @ReactMethod
    fun getDayCounts(day: String, promise: Promise) = resolve(promise) { repository.dayCounts(day).toMap() }

    @ReactMethod
    fun getMonthCounts(monthPrefix: String, promise: Promise) = resolve(promise) {
        Arguments.createArray().apply { repository.monthCounts(monthPrefix).forEach { pushMap(it.toMap()) } }
    }

    @ReactMethod
    fun getSessions(day: String, promise: Promise) = resolve(promise) {
        Arguments.createArray().apply {
            repository.sessions(day).forEach { row ->
                pushMap(Arguments.createMap().apply {
                    putDouble("id", row.id.toDouble())
                    putString("app", row.app)
                    putDouble("startedAt", row.startedAt.toDouble())
                    if (row.endedAt != null) putDouble("endedAt", row.endedAt.toDouble()) else putNull("endedAt")
                    putDouble("lastActivityAt", row.lastActivityAt.toDouble())
                    putInt("itemCount", row.itemCount)
                    putString("startConfidence", row.startConfidence)
                    putString("endReason", row.endReason)
                })
            }
        }
    }

    @ReactMethod
    fun getLiveState(promise: Promise) = resolve(promise) {
        TrackerRuntime.lastUpdate?.toMap() ?: Arguments.createMap().apply {
            putNull("app")
            putBoolean("inFeed", false)
            putString("confidence", "NONE")
            putInt("sessionCount", 0)
            putInt("todayTotal", repository.todayTotal())
            putInt("dailyLimit", prefs.dailyLimit)
            putDouble("at", System.currentTimeMillis().toDouble())
        }
    }

    @ReactMethod
    fun getDiagnostics(promise: Promise) = resolve(promise) {
        Arguments.createMap().apply {
            putBoolean("serviceConnected", TrackerRuntime.serviceConnected)
            putDouble("serviceConnectedAt", TrackerRuntime.serviceConnectedAt.toDouble())
            putString("validationStatus", VALIDATION_STATUS)
            putMap("engine", engineMap())
            putArray("apps", Arguments.createArray().apply {
                TrackedApp.entries.forEach { app ->
                    val d = TrackerRuntime.diagnostics(app)
                    pushMap(Arguments.createMap().apply {
                        putString("id", app.id)
                        putString("detectorVersion", DetectorRegistry.forApp(app).version)
                        putString("versionName", app.packages.firstNotNullOfOrNull { PermissionStatus.installedVersion(context, it) })
                        putBoolean("experimental", app.experimental)
                        putDouble("eventsSeen", d.eventsSeen.toDouble())
                        putDouble("inspections", d.inspections.toDouble())
                        putDouble("detectionsHigh", d.detectionsHigh.toDouble())
                        putDouble("detectionsMedium", d.detectionsMedium.toDouble())
                        putDouble("detectionsLow", d.detectionsLow.toDouble())
                        putDouble("detectionsNone", d.detectionsNone.toDouble())
                        putDouble("counted", d.counted.toDouble())
                        putDouble("fingerprintsSeen", d.fingerprintsSeen.toDouble())
                        putString("lastState", d.lastState)
                        putString("lastConfidence", d.lastConfidence)
                        putString("lastSignals", d.lastSignals)
                        putDouble("lastDetectionAt", d.lastDetectionAt.toDouble())
                        putDouble("lastCountedAt", d.lastCountedAt.toDouble())
                        putInt("lastInspectionNodes", d.lastInspectionNodes)
                        putDouble("lastInspectionMs", d.lastInspectionMs.toDouble())
                    })
                }
            })
            putArray("recent", Arguments.createArray().apply {
                repository.recentDiagnostics(RECENT_LIMIT).forEach { row ->
                    pushMap(Arguments.createMap().apply {
                        putDouble("ts", row.ts.toDouble())
                        putString("app", row.app)
                        putString("kind", row.kind)
                        putString("detail", row.detail)
                    })
                }
            })
        }
    }

    @ReactMethod
    fun clearDiagnostics(promise: Promise) = resolve(promise) {
        repository.clearDiagnostics()
        TrackerRuntime.resetDiagnostics()
        true
    }

    @ReactMethod
    fun setTrackingEnabled(enabled: Boolean, promise: Promise) = resolve(promise) {
        prefs.trackingEnabled = enabled
        enabled
    }

    @ReactMethod
    fun setOverlayEnabled(enabled: Boolean, promise: Promise) = resolve(promise) {
        prefs.overlayEnabled = enabled
        enabled
    }

    @ReactMethod
    fun setAppEnabled(appId: String, enabled: Boolean, promise: Promise) {
        val app = TrackedApp.fromId(appId)
        if (app == null) {
            promise.reject(ERROR_UNKNOWN_APP, appId)
            return
        }
        resolve(promise) {
            prefs.setAppEnabled(app, enabled)
            enabled
        }
    }

    @ReactMethod
    fun setDailyLimit(limit: Double, promise: Promise) = resolve(promise) {
        prefs.dailyLimit = limit.toInt()
        prefs.dailyLimit
    }

    @ReactMethod
    fun setDwellMs(dwellMs: Double, promise: Promise) = resolve(promise) {
        prefs.dwellMs = dwellMs.toLong()
        prefs.dwellMs.toDouble()
    }

    @ReactMethod
    fun setAllowLowConfidence(enabled: Boolean, promise: Promise) = resolve(promise) {
        prefs.allowLowConfidence = enabled
        enabled
    }

    @ReactMethod
    fun openAccessibilitySettings(promise: Promise) = resolve(promise) {
        val component = PermissionStatus.serviceComponent(context).flattenToString()
        val args = Bundle().apply { putString(EXTRA_FRAGMENT_ARG_KEY, component) }
        launch(
            Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
                .putExtra(EXTRA_FRAGMENT_ARG_KEY, component)
                .putExtra(EXTRA_SHOW_FRAGMENT_ARGS, args)
        )
    }

    @ReactMethod
    fun openOverlaySettings(promise: Promise) = resolve(promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            launch(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, packageUri())) || launch(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION))
        } else {
            false
        }
    }

    @ReactMethod
    fun openBatterySettings(promise: Promise) = resolve(promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            launch(Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, packageUri())) ||
                launch(Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS))
        } else {
            false
        }
    }

    @ReactMethod
    fun openAppDetails(promise: Promise) = resolve(promise) {
        launch(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, packageUri()))
    }

    private fun appsArray(): WritableArray = Arguments.createArray().apply {
        TrackedApp.entries.forEach { app ->
            val installedPackage = app.packages.firstOrNull { PermissionStatus.installedVersion(context, it) != null }
            pushMap(Arguments.createMap().apply {
                putString("id", app.id)
                putString("packageName", installedPackage ?: app.packages.first())
                putBoolean("installed", installedPackage != null)
                putString("versionName", installedPackage?.let { PermissionStatus.installedVersion(context, it) })
                putBoolean("enabled", prefs.isAppEnabled(app))
                putBoolean("experimental", app.experimental)
                putString("detectorVersion", DetectorRegistry.forApp(app).version)
            })
        }
    }

    private fun engineMap(): WritableMap = Arguments.createMap().apply {
        val snapshot = TrackerRuntime.engineSnapshot
        val stats = TrackerRuntime.engineStats
        putString("app", snapshot?.app?.id)
        putBoolean("inFeed", snapshot?.inFeed == true)
        putBoolean("idle", snapshot?.idle == true)
        putString("feedConfidence", snapshot?.feedConfidence?.name ?: "NONE")
        putInt("visitedCount", snapshot?.visitedCount ?: 0)
        putInt("recentFingerprintCount", snapshot?.recentFingerprintCount ?: 0)
        putDouble("counted", (stats?.counted ?: 0).toDouble())
        putDouble("duplicateEvents", (stats?.duplicateEvents ?: 0).toDouble())
        putDouble("nonFeedScrolls", (stats?.nonFeedScrolls ?: 0).toDouble())
        putDouble("revisits", (stats?.revisits ?: 0).toDouble())
        putDouble("belowDwell", (stats?.belowDwell ?: 0).toDouble())
        putDouble("lowConfidence", (stats?.lowConfidence ?: 0).toDouble())
        putDouble("entryResumed", (stats?.entryResumed ?: 0).toDouble())
        putDouble("feedReloads", (stats?.feedReloads ?: 0).toDouble())
    }

    private fun DayCounts.toMap(): WritableMap = Arguments.createMap().apply {
        putString("day", day)
        putInt("total", total)
        putMap("byApp", Arguments.createMap().apply { byApp.forEach { (k, v) -> putInt(k, v) } })
        putMap("byConfidence", Arguments.createMap().apply { byConfidence.forEach { (k, v) -> putInt(k, v) } })
        putInt("sessions", sessions)
        putDouble("feedTimeMs", feedTimeMs.toDouble())
        putMap("feedTimeByApp", Arguments.createMap().apply { feedTimeByApp.forEach { (k, v) -> putDouble(k, v.toDouble()) } })
        putBoolean("serviceActive", serviceActive)
        if (firstItemAt != null) putDouble("firstItemAt", firstItemAt.toDouble()) else putNull("firstItemAt")
    }

    private fun TrackerUpdate.toMap(): WritableMap = Arguments.createMap().apply {
        putString("app", app)
        putBoolean("inFeed", inFeed)
        putString("confidence", confidence)
        putInt("sessionCount", sessionCount)
        putInt("todayTotal", todayTotal)
        putInt("dailyLimit", dailyLimit)
        putDouble("at", at.toDouble())
    }

    private fun packageUri(): Uri = Uri.parse("package:${context.packageName}")

    private fun launch(intent: Intent): Boolean {
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        return runCatching {
            val activity = context.currentActivity
            if (activity != null) activity.startActivity(intent) else context.startActivity(intent)
        }.isSuccess
    }

    private inline fun resolve(promise: Promise, block: () -> Any?) {
        runCatching(block)
            .onSuccess { promise.resolve(it) }
            .onFailure { promise.reject(ERROR_NATIVE, it.message ?: it.javaClass.simpleName, it) }
    }

    companion object {
        const val NAME = "LevelUpTracker"
        private const val EVENT_UPDATE = "LevelUpTrackerUpdate"
        private const val VALIDATION_STATUS = "pendingDeviceValidation"
        private const val RECENT_LIMIT = 120
        private const val ERROR_NATIVE = "E_LEVELUP_NATIVE"
        private const val ERROR_UNKNOWN_APP = "E_LEVELUP_UNKNOWN_APP"
        private const val EXTRA_FRAGMENT_ARG_KEY = ":settings:fragment_args_key"
        private const val EXTRA_SHOW_FRAGMENT_ARGS = ":settings:show_fragment_args"
    }
}
