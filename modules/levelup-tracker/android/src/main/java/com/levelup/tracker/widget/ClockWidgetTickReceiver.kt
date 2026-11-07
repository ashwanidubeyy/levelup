package com.levelup.tracker.widget

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class ClockWidgetTickReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        if (intent?.action != ClockWidgetScheduler.ACTION_TICK) {
            return
        }
        ClockWidgetRenderer.renderAll(context)
        if (ClockWidgetRenderer.hasWidgets(context)) {
            ClockWidgetScheduler.schedule(context)
        }
    }
}
