//
//  SongManager.swift
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

import Foundation

@objc(SongManager)
class SongManager: NSObject {
  
  @objc
  func getAllSongs(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    var songs = [String]()
    
    (1...10).forEach { (i) in
      songs.append("Song \(i) iOS")
    }
    
    let map = [ "songs" : songs ]
    
    resolve(map)
    
  }
  
}
