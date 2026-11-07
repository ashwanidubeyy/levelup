package com.levelup.tracker.widget

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build

object ClockWidgetScheduler {
    const val ACTION_TICK = "com.levelup.tracker.widget.CLOCK_TICK"

    fun schedule(context: Context) {
        val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val trigger = System.currentTimeMillis() + millisUntilNextMinute()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarm.setAndAllowWhileIdle(AlarmManager.RTC, trigger, pending(context))
        } else {
            alarm.set(AlarmManager.RTC, trigger, pending(context))
        }
    }

    fun cancel(context: Context) {
        val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarm.cancel(pending(context))
    }

    private fun pending(context: Context): PendingIntent {
        val intent = Intent(context, ClockWidgetTickReceiver::class.java).apply { action = ACTION_TICK }
        return PendingIntent.getBroadcast(
            context,
            REQUEST_CODE,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
    }

    private fun millisUntilNextMinute(): Long {
        val remainder = System.currentTimeMillis() % MINUTE_MS
        return MINUTE_MS - remainder + ALIGN_MS
    }

    private const val REQUEST_CODE = 47
    private const val MINUTE_MS = 60_000L
    private const val ALIGN_MS = 250L
}
