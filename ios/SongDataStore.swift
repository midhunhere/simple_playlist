//
//  SongDataStore.swift
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

import Foundation

class Song: NSObject, Codable {
  var id: Int64 = 0
  var name: String = ""
  
  override init() {
    super.init()
    self.id = 0
    self.name = ""
  }
  
  convenience init(id:Int64, name:String) {
    self.init()
    
    self.id = id
    self.name = name
  }
}

class PlayList: NSObject, Codable {
  var id: Int64 = 0
  var name: String = ""
  var tint: String = ""
  var songs: [Int64] = [Int64]()
  
  override init() {
    super.init()
  }
  
  convenience init(id:Int64, name:String, tint:String, songs:[Int64]) {
    self.init()
    
    self.id = id
    self.name = name
    self.tint = tint
    self.songs = songs
  }
}
