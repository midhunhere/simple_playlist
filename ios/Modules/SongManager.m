//
//  ModuleDefinitions.m
//  SimplePlayList
//
//  Created by Midhun Raj on 6/19/20.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SongManager, NSObject)

RCT_EXTERN_METHOD(
  getAllSongs: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  getAllPlayLists: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  getAllSongs: (NSInteger)playlistId
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

@end
