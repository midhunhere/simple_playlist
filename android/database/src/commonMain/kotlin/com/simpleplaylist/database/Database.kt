package com.simpleplaylist.database


expect fun getSongDatabase(): SongDatabase

open class Mapper {
    open fun map(type:String, data:Map<String, Any>): Any {
        //Child class should implement mapping
        return Unit
    }
}

class SongDatabase(private val database: SongDb) {

    fun getAllSongs(mapper: Mapper): List<Any> {
        return database.schemaQueries.getAllSongs { id, name ->
            val map = mutableMapOf<String, Any>()
            map["id"] = id
            map["name"] = name
            mapper.map("Song", map)
        }.executeAsList()
    }

    fun getAllPlayLists(mapper: Mapper): List<Any> {
        return database.schemaQueries.getAllPlayLists { id, name, tint, playListId, songId ->
            val map = mutableMapOf<String, Any>()
            map["id"] = id
            map["name"] = name
            map["tint"] = tint
            map["playListId"] = playListId
            map["songId"] = songId
            mapper.map("PlayList", map)
        }.executeAsList()
    }

    fun getAllSongs(playListId: Int, mapper: Mapper): List<Any> {
        return database.schemaQueries.getAllSongsForPlayList(
            playListId = playListId.toLong(),
            mapper = { id, name ->
                val map = mutableMapOf<String, Any>()
                map["id"] = id
                map["name"] = name
                mapper.map("Song", map)
            }).executeAsList()
    }

    fun getPlayList(playListId: Int,mapper:Mapper): List<Any> {
        return database.schemaQueries.getPlayList(
            id = playListId.toLong(),
            mapper = { id, name, tint ->
            val map = mutableMapOf<String, Any>()
            map["id"] = id
            map["name"] = name
            map["tint"] = tint
            mapper.map("PlayList", map)
        }).executeAsList()
    }
}
