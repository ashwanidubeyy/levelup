package com.levelup.tracker.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.widget.RemoteViews
import com.levelup.tracker.R
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object ClockWidgetRenderer {
    fun renderAll(context: Context) {
        renderDigital(context)
        renderAnalog(context)
    }

    fun hasWidgets(context: Context): Boolean {
        val manager = AppWidgetManager.getInstance(context)
        val digital = manager.getAppWidgetIds(ComponentName(context, DigitalClockWidgetProvider::class.java))
        val analog = manager.getAppWidgetIds(ComponentName(context, AnalogClockWidgetProvider::class.java))
        return digital.isNotEmpty() || analog.isNotEmpty()
    }

    fun renderDigital(context: Context) {
        val manager = AppWidgetManager.getInstance(context)
        val ids = manager.getAppWidgetIds(ComponentName(context, DigitalClockWidgetProvider::class.java))
        if (ids.isEmpty()) {
            return
        }
        val date = dateLabel()
        ids.forEach { id ->
            val views = RemoteViews(context.packageName, R.layout.widget_clock_digital)
            views.setTextViewText(R.id.clock_date, date)
            bindLaunch(context, views, R.id.clock_root)
            manager.updateAppWidget(id, views)
        }
    }

    fun renderAnalog(context: Context) {
        val manager = AppWidgetManager.getInstance(context)
        val ids = manager.getAppWidgetIds(ComponentName(context, AnalogClockWidgetProvider::class.java))
        if (ids.isEmpty()) {
            return
        }
        val face = AnalogClockFace.draw()
        val date = dateLabel()
        ids.forEach { id ->
            val views = RemoteViews(context.packageName, R.layout.widget_clock_analog)
            views.setImageViewBitmap(R.id.analog_face, face)
            views.setTextViewText(R.id.clock_date, date)
            bindLaunch(context, views, R.id.clock_root)
            manager.updateAppWidget(id, views)
        }
    }

    private fun dateLabel(): String = SimpleDateFormat("EEE d MMM", Locale.getDefault()).format(Date())

    private fun bindLaunch(context: Context, views: RemoteViews, rootId: Int) {
        val launch = context.packageManager.getLaunchIntentForPackage(context.packageName) ?: return
        val pending = PendingIntent.getActivity(
            context,
            rootId,
            launch,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        views.setOnClickPendingIntent(rootId, pending)
    }
}
