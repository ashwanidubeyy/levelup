package com.levelup.tracker.data

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class TrackerDatabase(context: Context) : SQLiteOpenHelper(context.applicationContext, NAME, null, VERSION) {

    override fun onConfigure(db: SQLiteDatabase) {
        db.enableWriteAheadLogging()
    }

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(
            """
            CREATE TABLE sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                app TEXT NOT NULL,
                day TEXT NOT NULL,
                started_at INTEGER NOT NULL,
                ended_at INTEGER,
                last_activity_at INTEGER NOT NULL,
                item_count INTEGER NOT NULL DEFAULT 0,
                start_confidence TEXT NOT NULL,
                end_reason TEXT
            )
            """.trimIndent()
        )
        db.execSQL(
            """
            CREATE TABLE items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER,
                app TEXT NOT NULL,
                day TEXT NOT NULL,
                seen_at INTEGER NOT NULL,
                confidence TEXT NOT NULL,
                method TEXT NOT NULL
            )
            """.trimIndent()
        )
        db.execSQL(
            """
            CREATE TABLE service_days (
                day TEXT PRIMARY KEY,
                first_seen INTEGER NOT NULL,
                last_seen INTEGER NOT NULL
            )
            """.trimIndent()
        )
        db.execSQL(
            """
            CREATE TABLE diagnostics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ts INTEGER NOT NULL,
                app TEXT,
                kind TEXT NOT NULL,
                detail TEXT
            )
            """.trimIndent()
        )
        db.execSQL("CREATE INDEX idx_items_day ON items(day)")
        db.execSQL("CREATE INDEX idx_sessions_day ON sessions(day)")
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) = Unit

    companion object {
        private const val NAME = "levelup_tracker.db"
        private const val VERSION = 1
    }
}
