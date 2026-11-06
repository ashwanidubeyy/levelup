package com.levelup.tracker.data

import android.content.Context
import android.content.SharedPreferences
import com.levelup.tracker.core.Confidence
import com.levelup.tracker.core.EngineConfig
import com.levelup.tracker.core.TrackedApp

class TrackerPrefs private constructor(context: Context) {
    private val prefs: SharedPreferences =
        context.applicationContext.getSharedPreferences(FILE, Context.MODE_PRIVATE)

    var trackingEnabled: Boolean
        get() = prefs.getBoolean(KEY_TRACKING, true)
        set(value) = prefs.edit().putBoolean(KEY_TRACKING, value).apply()

    var overlayEnabled: Boolean
        get() = prefs.getBoolean(KEY_OVERLAY, true)
        set(value) = prefs.edit().putBoolean(KEY_OVERLAY, value).apply()

    var dailyLimit: Int
        get() = prefs.getInt(KEY_LIMIT, DEFAULT_LIMIT)
        set(value) = prefs.edit().putInt(KEY_LIMIT, value.coerceIn(1, 1000)).apply()

    var dwellMs: Long
        get() = prefs.getLong(KEY_DWELL, DEFAULT_DWELL)
        set(value) = prefs.edit().putLong(KEY_DWELL, value.coerceIn(200L, 5_000L)).apply()

    var allowLowConfidence: Boolean
        get() = prefs.getBoolean(KEY_LOW_CONFIDENCE, false)
        set(value) = prefs.edit().putBoolean(KEY_LOW_CONFIDENCE, value).apply()

    var overlayX: Int
        get() = prefs.getInt(KEY_OVERLAY_X, -1)
        set(value) = prefs.edit().putInt(KEY_OVERLAY_X, value).apply()

    var overlayY: Int
        get() = prefs.getInt(KEY_OVERLAY_Y, -1)
        set(value) = prefs.edit().putInt(KEY_OVERLAY_Y, value).apply()

    fun isAppEnabled(app: TrackedApp): Boolean = prefs.getBoolean(KEY_APP_PREFIX + app.id, true)

    fun setAppEnabled(app: TrackedApp, enabled: Boolean) =
        prefs.edit().putBoolean(KEY_APP_PREFIX + app.id, enabled).apply()

    fun engineConfig(): EngineConfig = EngineConfig(
        dwellMs = dwellMs,
        minCountConfidence = if (allowLowConfidence) Confidence.LOW else Confidence.MEDIUM,
    )

    fun register(listener: SharedPreferences.OnSharedPreferenceChangeListener) =
        prefs.registerOnSharedPreferenceChangeListener(listener)

    fun unregister(listener: SharedPreferences.OnSharedPreferenceChangeListener) =
        prefs.unregisterOnSharedPreferenceChangeListener(listener)

    companion object {
        private const val FILE = "levelup_tracker_prefs"
        const val KEY_TRACKING = "tracking_enabled"
        const val KEY_OVERLAY = "overlay_enabled"
        const val KEY_LIMIT = "daily_limit"
        const val KEY_DWELL = "dwell_ms"
        const val KEY_LOW_CONFIDENCE = "allow_low_confidence"
        const val KEY_APP_PREFIX = "app_enabled_"
        private const val KEY_OVERLAY_X = "overlay_x_v2"
        private const val KEY_OVERLAY_Y = "overlay_y_v2"
        const val DEFAULT_LIMIT = 30
        const val DEFAULT_DWELL = 500L

        @Volatile
        private var instance: TrackerPrefs? = null

        fun get(context: Context): TrackerPrefs =
            instance ?: synchronized(this) { instance ?: TrackerPrefs(context).also { instance = it } }
    }
}
