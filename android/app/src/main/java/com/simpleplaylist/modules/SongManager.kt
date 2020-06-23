package com.simpleplaylist.modules

import com.facebook.react.bridge.*
import com.simpleplaylist.database.Mapper
import com.simpleplaylist.database.SongDatabase
import com.simpleplaylist.database.getSongDatabase

public class SongManager(private val reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

    /*///////////////////////////////////////////////////////////
     * PRIVATE MEMBERS
     *///////////////////////////////////////////////////////////
    private val database: SongDatabase by lazy {
        getSongDatabase()
    }


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

        database.getAllSongs(object : Mapper() {
            override fun map(type: String, data: Map<String, Any>): Any {
                val songMap = Arguments.createMap()
                songMap.putInt("id", (data["id"] as Long).toInt())
                songMap.putString("name", data["name"] as String)

                songs.pushMap(songMap)
                return songMap
            }
        })

        map.putArray("songs", songs)
        promise.resolve(map)
    }

    @ReactMethod
    public fun getAllSongsForPlayList(playlistId:Int, promise: Promise) {
        val map = Arguments.createMap()
        val songs = Arguments.createArray()

        database.getAllSongs(playlistId, object : Mapper() {
            override fun map(type: String, data: Map<String, Any>): Any {
                val songMap = Arguments.createMap()
                songMap.putInt("id", (data["id"] as Long).toInt())
                songMap.putString("name", data["name"] as String)

                songs.pushMap(songMap)

                return songMap
            }
        })

        map.putArray("songs", songs)

        database.getPlayList(playlistId, object : Mapper(){
            override fun map(type: String, data: Map<String, Any>): Any {
                return Arguments.createMap().also {
                    map.putInt("id", (data["id"] as Long).toInt())
                    map.putString("name", data["name"] as String)
                    map.putString("tint", data["tint"] as String)
                }
            }
        })

        promise.resolve(map)
    }

    @ReactMethod
    public fun getAllPlayLists(promise: Promise) {
        val map = Arguments.createMap()
        val playLists = Arguments.createArray()
        val parseMap = HashMap<Int, WritableMap>()
        val songMap = HashMap<Int, WritableArray>()

        database.getAllPlayLists(object : Mapper() {
            override fun map(type: String, data: Map<String, Any>): Any {
                val playlistId = (data["id"] as? Long)?.toInt() ?: return Unit

                val playListMap = parseMap[playlistId] ?: Arguments.createMap().also {
                    it.putInt("id", playlistId)
                    it.putString("name", data["name"] as String)
                    it.putString("tint", data["tint"] as String)

                    parseMap[playlistId] = it
                }

                val songs = songMap[playlistId] ?: Arguments.createArray().also {
                    songMap[playlistId] = it
                }
                songs.pushInt((data["songId"] as Long).toInt())

                return playListMap
            }
        })

        parseMap.entries.forEach { entry ->
            val playList = entry.value
            songMap[entry.key]?.apply {
                playList.putArray("songs", this)
            }
            playLists.pushMap(playList)
        }

        map.putArray("playlists", playLists)
        promise.resolve(map)
    }

    @ReactMethod
    public fun syncPlayList(playlistId: Int, songs:ReadableArray, promise: Promise) {
        database.syncPlayList(playlistId, (0 until songs.size()).map { songs.getInt(it) })
        promise.resolve(true)
    }
}
