//
//  SongManager.swift
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

import Foundation

@objc(SongManager)
class SongManager: NSObject {
  
  let AllSongs = [
    Song(id: 1, name: "Song 1"),
    Song(id: 2, name: "Song 2"),
    Song(id: 3, name: "Song 3"),
    Song(id: 4, name: "Song 4"),
    Song(id: 5, name: "Song 5"),
    Song(id: 6, name: "Song 6"),
    Song(id: 7, name: "Song 7"),
    Song(id: 8, name: "Song 8"),
    Song(id: 9, name: "Song 9"),
    Song(id: 10, name: "Song 10")
  ]

  let AllPlayLists = [
    PlayList(id: 1, name: "Play List 1", tint: "green", songs: [1, 2, 5]),
    PlayList(id: 2, name: "Play List 2", tint: "yellow", songs: [2, 6]),
    PlayList(id: 3, name: "Play List 3", tint: "orange", songs: [8])
  ]
  
  @objc
  func getAllSongs(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    guard let data = try? JSONEncoder().encode(AllSongs) else {
      reject("","",NSError())
      return
    }
    guard let dictionary = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [[String: Any]] else {
      reject("","",NSError())
      return
    }
    
    let map = [ "songs" : dictionary ]
    
    resolve(map)
    
  }
  
  @objc
  func getAllPlayLists(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    guard let data = try? JSONEncoder().encode(AllPlayLists) else {
      reject("","",NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    guard let dictionary = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [[String: Any]] else {
      reject("","",NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    
    let map = [ "playlists" : dictionary ]
    
    resolve(map)
  }
  
  @objc
  func getAllSongsForPlayList(_ playlistId:NSInteger, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let givenPlayList = AllPlayLists.first { $0.id == playlistId }
    guard let playlist = givenPlayList else {
      reject("","",NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    
    let filteredSongs = AllSongs.filter { playlist.songs.contains($0.id)}
    
    guard let data = try? JSONEncoder().encode(filteredSongs) else {
      reject("","",NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    guard let dictionary = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [[String: Any]] else {
      reject("","",NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    
    let map = [ "songs" : dictionary,
                "name": playlist.name,
                "id": playlist.id,
                "tint": playlist.tint ] as [String : Any]
    
    resolve(map)
  }
  
}
