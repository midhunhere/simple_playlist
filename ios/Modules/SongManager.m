//
//  ModuleDefinitions.m
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// ================================================================================================
// SONG MANAGER MODULE EXPORT
// ================================================================================================
#pragma mark - SONG MANAGER MODULE EXPORT
@interface RCT_EXTERN_MODULE(SongManager, RCTEventEmitter)

// ================================================================================================
// EXPOSED MODULE METHODS
// ================================================================================================
#pragma mark - EXPOSED MODULE METHODS
RCT_EXTERN_METHOD(
  getAllSongs: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  getAllPlayLists: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  getAllSongsForPlayList: (NSInteger)playlistId
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  syncPlayList: (NSInteger)playlistId
  songs: (NSArray *)songId
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

@end
