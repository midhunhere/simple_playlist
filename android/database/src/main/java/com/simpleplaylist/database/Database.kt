package com.simpleplaylist.database

import android.content.Context
import com.squareup.sqldelight.android.AndroidSqliteDriver
import com.squareup.sqldelight.db.SqlDriver

actual fun getSongDatabase(): SongDatabase {
    return Db.database
}

object Db {
    private var driverRef: SqlDriver? = null
    private var dbRef: SongDb? = null
    private var songDatabaseRef: SongDatabase? = null


    //Called from Android
    fun dbSetup(context: Context) {
        val driver = AndroidSqliteDriver(SongDb.Schema, context, "song.db")
        val db = SongDb(driver)
        driverRef = driver
        dbRef = db
        songDatabaseRef = SongDatabase(db)
    }

    internal fun dbClear() {
        driverRef!!.close()
        dbRef = null
        driverRef = null
    }

    val instance: SongDb
        get() = dbRef!!

    val database: SongDatabase
        get() = songDatabaseRef!!
}
