//
//  SongManager.swift
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

import Foundation
import database

class SwiftMapper: Mapper {
  
  var mapperFunc:((String,[String : Any])->(Any))?

  override func map(type: String, data: [String : Any]) -> Any {
    if let mapper = mapperFunc {
      return mapper(type, data)
    } else {
      return data
    }
  }
  
}

@objc(SongManager)
class SongManager: NSObject {
  
  private lazy var database: SongDatabase = DatabaseKt.getSongDatabase()
  
  @objc
  func getAllSongs(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    DispatchQueue.global().async { [unowned self] in
      
      let allSongs = self.database.getAllSongs(mapper: SwiftMapper())
      
      let map = [ "songs" : allSongs ]
      
      resolve(map)
    }
    
  }
  
  @objc
  func getAllPlayLists(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    DispatchQueue.global().async { [unowned self] in
    
      var playLists = [[String: Any]]()
      var parseMap = [Int:[String: Any]]()
      var songMap = [Int:[Int]]()
      
      let mapper = SwiftMapper()
      
      mapper.mapperFunc = { (type, data) in
        
        if let playListId = data["id"] as? NSNumber {
          
          var playList =  [String: Any]()
          var songs = [Int]()
          
          if let savedSongs = songMap[playListId.intValue] {
            songs = savedSongs
          }
          
          if parseMap[playListId.intValue] == nil {
            playList["id"] = playListId.intValue
            playList["name"] = data["name"] as? String
            playList["tint"] = data["tint"] as? String
          } else {
            playList = parseMap[playListId.intValue]!
          }
          
          if let songId = data["songId"] as? NSNumber {
            songs.append(songId.intValue)
            
            songMap[playListId.intValue] = songs
          }
          
          parseMap[playListId.intValue] = playList
          
          return playList
        }
        
        return data
      }
      
      self.database.getAllPlayLists(mapper: mapper)
      
      mapper.mapperFunc = nil
      
      parseMap.keys.sorted().forEach { key in
        
        if let value = parseMap[key] {
        
          var playlist = value
          
          if let songs = songMap[key] {
            playlist["songs"] = songs
          }
          
          playLists.append(playlist)
        }
      }
      
      let map = [ "playlists" : playLists ]
      
      resolve(map)
    }
  }
  
  @objc
  func getAllSongsForPlayList(_ playlistId:NSInteger, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    DispatchQueue.global().async { [unowned self] in
    
      
      let allSongs = self.database.getAllSongs(playListId: Int32(playlistId), mapper: SwiftMapper())
      
      var map: [String: Any] = [ "songs" : allSongs ]
      
      let mapper = SwiftMapper()
      
      mapper.mapperFunc = { (type, data) in
        
        map["name"] = data["name"]
        map["id"] = data["id"]
        map["tint"] = data["tint"]
        
        return data
      }
      
      _ = self.database.getPlayList(playListId: Int32(playlistId), mapper: mapper)
      
      mapper.mapperFunc = nil
      
      resolve(map)
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
}
