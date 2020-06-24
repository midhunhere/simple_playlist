package com.simpleplaylist.database

import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.drivers.native.NativeSqliteDriver
import kotlin.native.concurrent.AtomicReference
import kotlin.native.concurrent.freeze

actual fun getSongDatabase(): SongDatabase {
    return Db.database
}

object Db {

    /*///////////////////////////////////////////////////////////
     * PRIVATE MEMBERS
     *///////////////////////////////////////////////////////////
    private val driverRef = AtomicReference<SqlDriver?>(null)
    private val dbRef = AtomicReference<SongDb?>(null)
    private val songDatabaseRef = AtomicReference<SongDatabase?>(null)

    // Called from swift
    fun dbSetup() {
        val driver = NativeSqliteDriver(SongDb.Schema, "song.db")
        val db = SongDb(driver)
        driverRef.value = driver.freeze()
        dbRef.value = db.freeze()
        val songDatabase = SongDatabase(db)
        songDatabaseRef.value = songDatabase.freeze()
    }

    internal fun dbClear() {
        driverRef.value!!.close()
        dbRef.value = null
        driverRef.value = null
        songDatabaseRef.value = null
    }

    /*///////////////////////////////////////////////////////////
     * EXPOSED METHODS
     *///////////////////////////////////////////////////////////
    val instance: SongDb
        get() = dbRef.value!!

    val database: SongDatabase
        get() = songDatabaseRef.value!!
}
