package com.simpleplaylist.modules

import com.facebook.react.bridge.*

public class SongManager(private val reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

    /*///////////////////////////////////////////////////////////
     * OVERRIDES
     *///////////////////////////////////////////////////////////
    override fun getName() = "SongManager"

    /*///////////////////////////////////////////////////////////
     * REACT METHODS
     *///////////////////////////////////////////////////////////
    @ReactMethod
    public fun getAllSongs(promise: Promise) {
        val map = Arguments.createMap()

        val songs = Arguments.createArray()
        (1 until 10).forEach{ songs.pushString("Song $it Android") }

        map.putArray("songs", songs)
        promise.resolve(map)
    }
}
