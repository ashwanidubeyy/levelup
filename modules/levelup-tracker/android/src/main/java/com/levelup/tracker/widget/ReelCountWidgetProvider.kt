package com.levelup.tracker.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import com.levelup.tracker.R
import com.levelup.tracker.data.TrackerPrefs
import com.levelup.tracker.data.TrackerRepository

class ReelCountWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
        ids.forEach { id -> render(context, manager, id) }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_REFRESH) {
            val manager = AppWidgetManager.getInstance(context)
            val component = ComponentName(context, ReelCountWidgetProvider::class.java)
            val ids = manager.getAppWidgetIds(component)
            onUpdate(context, manager, ids)
        }
    }

    private fun render(context: Context, manager: AppWidgetManager, id: Int) {
        val total = runCatching { TrackerRepository.get(context).todayTotal() }.getOrDefault(0)
        val limit = TrackerPrefs.get(context).dailyLimit
        val views = RemoteViews(context.packageName, R.layout.widget_reel_count)
        views.setTextViewText(R.id.widget_count, "$total/$limit")
        views.setTextViewText(
            R.id.widget_hint,
            context.getString(R.string.levelup_widget_resets),
        )
        val launch = context.packageManager.getLaunchIntentForPackage(context.packageName)
        if (launch != null) {
            val pending = PendingIntent.getActivity(
                context,
                0,
                launch,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
            )
            views.setOnClickPendingIntent(R.id.widget_root, pending)
        }
        manager.updateAppWidget(id, views)
    }

    companion object {
        const val ACTION_REFRESH = "com.levelup.tracker.widget.REFRESH"

        fun refreshAll(context: Context) {
            val intent = Intent(context, ReelCountWidgetProvider::class.java).apply { action = ACTION_REFRESH }
            context.sendBroadcast(intent)
        }
    }
}
