package com.simpleplaylist.database

import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.drivers.native.NativeSqliteDriver


actual fun getDriver(): SqlDriver? {
    return NativeSqliteDriver(SongDb.Schema, "song.db")
}

