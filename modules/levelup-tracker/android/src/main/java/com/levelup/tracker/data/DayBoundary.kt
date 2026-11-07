package com.levelup.tracker.data

import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

object DayBoundary {
    const val START_HOUR = 6

    fun dayKey(at: Long): String {
        val cal = Calendar.getInstance(Locale.US).apply { timeInMillis = at }
        if (cal.get(Calendar.HOUR_OF_DAY) < START_HOUR) {
            cal.add(Calendar.DAY_OF_MONTH, -1)
        }
        return SimpleDateFormat("yyyy-MM-dd", Locale.US).format(cal.time)
    }
}
