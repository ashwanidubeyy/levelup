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
        if (intent.action == ACTION_REFRESH) {
            val manager = AppWidgetManager.getInstance(context)
            val component = ComponentName(context, ReelCountWidgetProvider::class.java)
            val ids = manager.getAppWidgetIds(component)
            val total = if (intent.hasExtra(EXTRA_TOTAL)) intent.getIntExtra(EXTRA_TOTAL, 0) else null
            val limit = if (intent.hasExtra(EXTRA_LIMIT)) intent.getIntExtra(EXTRA_LIMIT, 0) else null
            ids.forEach { id -> render(context, manager, id, total, limit) }
            return
        }
        super.onReceive(context, intent)
    }

    private fun render(context: Context, manager: AppWidgetManager, id: Int, total: Int? = null, limit: Int? = null) {
        val shownTotal = total ?: runCatching { TrackerRepository.get(context).todayTotal() }.getOrDefault(0)
        val shownLimit = limit ?: TrackerPrefs.get(context).dailyLimit
        val views = RemoteViews(context.packageName, R.layout.widget_reel_count)
        views.setTextViewText(R.id.widget_count, "$shownTotal/$shownLimit")
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

        const val EXTRA_TOTAL = "total"
        const val EXTRA_LIMIT = "limit"

        fun refreshAll(context: Context, total: Int? = null, limit: Int? = null) {
            val intent = Intent(context, ReelCountWidgetProvider::class.java).apply {
                action = ACTION_REFRESH
                if (total != null) putExtra(EXTRA_TOTAL, total)
                if (limit != null) putExtra(EXTRA_LIMIT, limit)
            }
            context.sendBroadcast(intent)
        }
    }
}
