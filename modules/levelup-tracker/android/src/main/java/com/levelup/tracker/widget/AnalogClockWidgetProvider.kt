package com.levelup.tracker.widget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context

class AnalogClockWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
        ClockWidgetRenderer.renderAnalog(context)
        ClockWidgetScheduler.schedule(context)
    }

    override fun onEnabled(context: Context) {
        ClockWidgetRenderer.renderAnalog(context)
        ClockWidgetScheduler.schedule(context)
    }

    override fun onDisabled(context: Context) {
        if (!ClockWidgetRenderer.hasWidgets(context)) {
            ClockWidgetScheduler.cancel(context)
        }
    }
}
