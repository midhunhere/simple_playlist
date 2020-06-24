//
//  SongManager.swift
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

import Foundation
import database


//====================================================================
//  MARK: MAPPER CLASS
//====================================================================
class SwiftMapper: Mapper {
  
  //====================================================================
  //  MARK: PUBLIC MEMBERS
  //====================================================================
  var mapperFunc:((String,[String : Any])->(Any))?

  //====================================================================
  //  MARK: OVERRIDES
  //====================================================================
  override func map(type: String, data: [String : Any]) -> Any {
    if let mapper = mapperFunc {
      return mapper(type, data)
    } else {
      return data
    }
  }
  
}


//====================================================================
//  MARK: SONG MANAGER REACT NATIVE MODULE
//====================================================================
@objc(SongManager)
class SongManager: RCTEventEmitter {
  
  //====================================================================
  //  MARK: PRIVATE MEMBERS
  //====================================================================
  private lazy var database: SongDatabase = DatabaseKt.getSongDatabase()
  
  
  //====================================================================
  //  MARK: PUBLIC METHODS
  //====================================================================
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
      let playLists = self.database.getAllPlayLists(mapper: SwiftMapper())
      let map = [ "playlists" : playLists ]
      resolve(map)
    }
    
  }
  
  @objc
  func getAllSongsForPlayList(_ playlistId:NSInteger, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    DispatchQueue.global().async { [unowned self] in
    
      // Get songs for given playlistID
      let allSongs = self.database.getAllSongs(playListId: Int32(playlistId), mapper: SwiftMapper())
      var map: [String: Any] = [ "songs" : allSongs ]

      // Get playlist details
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
  func syncPlayList(_ playlistId:NSInteger, songs songIds:NSArray, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    DispatchQueue.global().async { [unowned self] in
      
      let modified = self.database.syncPlayList(playListId: Int32(playlistId), songs: songIds.map { KotlinInt(int: ($0 as! NSNumber).int32Value) })
      resolve(true)
      
      if(modified) {
        // Sent event when data is modified
        self.sendEvent(withName: "DataUpdate", body: ["time":Date().timeIntervalSince1970])
      }
      
    }
    
  }
  
  
  //====================================================================
  //  MARK: OVERRIDES
  //====================================================================
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    return ["DataUpdate"]
  }
  
}
