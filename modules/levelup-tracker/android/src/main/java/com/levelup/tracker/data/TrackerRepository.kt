package com.levelup.tracker.data

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import com.levelup.tracker.core.Confidence
import com.levelup.tracker.core.CountMethod
import com.levelup.tracker.core.ExitReason
import com.levelup.tracker.core.TrackedApp
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

data class DayCounts(
    val day: String,
    val total: Int,
    val byApp: Map<String, Int>,
    val byConfidence: Map<String, Int>,
    val sessions: Int,
    val feedTimeMs: Long,
    val feedTimeByApp: Map<String, Long>,
    val serviceActive: Boolean,
    val firstItemAt: Long?,
)

data class SessionRow(
    val id: Long,
    val app: String,
    val startedAt: Long,
    val endedAt: Long?,
    val lastActivityAt: Long,
    val itemCount: Int,
    val startConfidence: String,
    val endReason: String?,
)

data class DiagnosticRow(val ts: Long, val app: String?, val kind: String, val detail: String?)

class TrackerRepository private constructor(context: Context) {
    private val helper = TrackerDatabase(context)
    private val writer: ExecutorService = Executors.newSingleThreadExecutor()
    private var currentSessionId: Long? = null
    private var diagnosticsSinceTrim = 0

    fun sessionStarted(app: TrackedApp, at: Long, confidence: Confidence) = writer.execute {
        closeOpenSession(at, ExitReason.SERVICE_STOPPED.name)
        val values = ContentValues().apply {
            put("app", app.id)
            put("day", dayKey(at))
            put("started_at", at)
            put("last_activity_at", at)
            put("item_count", 0)
            put("start_confidence", confidence.name)
        }
        currentSessionId = helper.writableDatabase.insert("sessions", null, values)
    }

    fun itemCounted(app: TrackedApp, at: Long, confidence: Confidence, method: CountMethod) = writer.execute {
        val db = helper.writableDatabase
        val values = ContentValues().apply {
            put("session_id", currentSessionId)
            put("app", app.id)
            put("day", dayKey(at))
            put("seen_at", at)
            put("confidence", confidence.name)
            put("method", method.name)
        }
        db.insert("items", null, values)
        currentSessionId?.let { id ->
            db.execSQL(
                "UPDATE sessions SET item_count = item_count + 1, last_activity_at = ? WHERE id = ?",
                arrayOf<Any>(at, id),
            )
        }
    }

    fun touchSession(at: Long) = writer.execute {
        val id = currentSessionId ?: return@execute
        helper.writableDatabase.execSQL(
            "UPDATE sessions SET last_activity_at = MAX(last_activity_at, ?) WHERE id = ?",
            arrayOf<Any>(at, id),
        )
    }

    fun sessionEnded(at: Long, reason: ExitReason) = writer.execute {
        closeOpenSession(at, reason.name)
    }

    fun closeDanglingSessions() = writer.execute {
        currentSessionId = null
        helper.writableDatabase.execSQL(
            "UPDATE sessions SET ended_at = last_activity_at, end_reason = ? WHERE ended_at IS NULL",
            arrayOf<Any>(ExitReason.SERVICE_STOPPED.name),
        )
    }

    fun markServiceDay(at: Long) = writer.execute {
        val day = dayKey(at)
        val db = helper.writableDatabase
        db.execSQL(
            "INSERT OR IGNORE INTO service_days(day, first_seen, last_seen) VALUES (?, ?, ?)",
            arrayOf<Any>(day, at, at),
        )
        db.execSQL("UPDATE service_days SET last_seen = ? WHERE day = ?", arrayOf<Any>(at, day))
    }

    fun diagnostic(app: TrackedApp?, kind: String, detail: String?) = writer.execute {
        val db = helper.writableDatabase
        val values = ContentValues().apply {
            put("ts", System.currentTimeMillis())
            put("app", app?.id)
            put("kind", kind)
            put("detail", detail?.take(MAX_DETAIL))
        }
        db.insert("diagnostics", null, values)
        diagnosticsSinceTrim++
        if (diagnosticsSinceTrim >= TRIM_EVERY) {
            diagnosticsSinceTrim = 0
            db.execSQL(
                "DELETE FROM diagnostics WHERE id NOT IN (SELECT id FROM diagnostics ORDER BY id DESC LIMIT ?)",
                arrayOf<Any>(MAX_DIAGNOSTICS),
            )
        }
    }

    fun clearDiagnostics() = writer.execute {
        helper.writableDatabase.delete("diagnostics", null, null)
    }

    fun dayCounts(day: String): DayCounts {
        val db = helper.readableDatabase
        val byApp = LinkedHashMap<String, Int>()
        val byConfidence = LinkedHashMap<String, Int>()
        var total = 0
        db.rawQuery("SELECT app, confidence, COUNT(*) FROM items WHERE day = ? GROUP BY app, confidence", arrayOf(day)).use { c ->
            while (c.moveToNext()) {
                val count = c.getInt(2)
                total += count
                byApp[c.getString(0)] = (byApp[c.getString(0)] ?: 0) + count
                byConfidence[c.getString(1)] = (byConfidence[c.getString(1)] ?: 0) + count
            }
        }
        val feedTimeByApp = LinkedHashMap<String, Long>()
        var sessions = 0
        var feedTime = 0L
        db.rawQuery(
            "SELECT app, COUNT(*), SUM(MAX(0, COALESCE(ended_at, last_activity_at) - started_at)) FROM sessions WHERE day = ? GROUP BY app",
            arrayOf(day),
        ).use { c ->
            while (c.moveToNext()) {
                sessions += c.getInt(1)
                val time = c.getLong(2)
                feedTime += time
                feedTimeByApp[c.getString(0)] = time
            }
        }
        val active = db.rawQuery("SELECT 1 FROM service_days WHERE day = ?", arrayOf(day)).use { it.moveToFirst() }
        val firstItemAt = db.rawQuery("SELECT MIN(seen_at) FROM items WHERE day = ?", arrayOf(day)).use { c ->
            if (c.moveToFirst() && !c.isNull(0)) c.getLong(0) else null
        }
        return DayCounts(day, total, byApp, byConfidence, sessions, feedTime, feedTimeByApp, active, firstItemAt)
    }

    fun monthCounts(monthPrefix: String): List<DayCounts> {
        val days = LinkedHashSet<String>()
        val db = helper.readableDatabase
        val pattern = "$monthPrefix-%"
        db.rawQuery(
            "SELECT day FROM items WHERE day LIKE ? UNION SELECT day FROM sessions WHERE day LIKE ? UNION SELECT day FROM service_days WHERE day LIKE ? ORDER BY day",
            arrayOf(pattern, pattern, pattern),
        ).use { c -> while (c.moveToNext()) days.add(c.getString(0)) }
        return days.map { dayCounts(it) }
    }

    fun sessions(day: String): List<SessionRow> =
        helper.readableDatabase.rawQuery(
            "SELECT id, app, started_at, ended_at, last_activity_at, item_count, start_confidence, end_reason FROM sessions WHERE day = ? ORDER BY started_at DESC",
            arrayOf(day),
        ).use { c ->
            val rows = mutableListOf<SessionRow>()
            while (c.moveToNext()) rows += c.toSession()
            rows
        }

    fun recentDiagnostics(limit: Int): List<DiagnosticRow> =
        helper.readableDatabase.rawQuery(
            "SELECT ts, app, kind, detail FROM diagnostics ORDER BY id DESC LIMIT ?",
            arrayOf(limit.toString()),
        ).use { c ->
            val rows = mutableListOf<DiagnosticRow>()
            while (c.moveToNext()) {
                rows += DiagnosticRow(c.getLong(0), c.getStringOrNull(1), c.getString(2), c.getStringOrNull(3))
            }
            rows
        }

    fun todayTotal(): Int = dayCounts(dayKey(System.currentTimeMillis())).total

    private fun closeOpenSession(at: Long, reason: String) {
        val id = currentSessionId ?: return
        helper.writableDatabase.execSQL(
            "UPDATE sessions SET ended_at = MAX(started_at, ?), last_activity_at = MAX(last_activity_at, ?), end_reason = ? WHERE id = ? AND ended_at IS NULL",
            arrayOf<Any>(at, at, reason, id),
        )
        currentSessionId = null
    }

    private fun Cursor.toSession() = SessionRow(
        id = getLong(0),
        app = getString(1),
        startedAt = getLong(2),
        endedAt = if (isNull(3)) null else getLong(3),
        lastActivityAt = getLong(4),
        itemCount = getInt(5),
        startConfidence = getString(6),
        endReason = getStringOrNull(7),
    )

    private fun Cursor.getStringOrNull(index: Int): String? = if (isNull(index)) null else getString(index)

    companion object {
        private const val MAX_DIAGNOSTICS = 500
        private const val TRIM_EVERY = 50
        private const val MAX_DETAIL = 240

        @Volatile
        private var instance: TrackerRepository? = null

        fun get(context: Context): TrackerRepository =
            instance ?: synchronized(this) { instance ?: TrackerRepository(context).also { instance = it } }

        fun dayKey(at: Long): String = SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Date(at))
    }
}
