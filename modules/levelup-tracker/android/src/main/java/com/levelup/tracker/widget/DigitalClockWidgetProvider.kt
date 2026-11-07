package com.levelup.tracker.widget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context

class DigitalClockWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
        ClockWidgetRenderer.renderDigital(context)
        ClockWidgetScheduler.schedule(context)
    }

    override fun onEnabled(context: Context) {
        ClockWidgetRenderer.renderDigital(context)
        ClockWidgetScheduler.schedule(context)
    }

    override fun onDisabled(context: Context) {
        if (!ClockWidgetRenderer.hasWidgets(context)) {
            ClockWidgetScheduler.cancel(context)
        }
    }
}
