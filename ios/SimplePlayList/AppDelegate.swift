//
//  AppDelegate.swift
//  SimplePlayList
//
//  Created by Midhun Raj on 6/18/20.
//

import UIKit

private let MAIN_MODULE_NAME = "SimplePlayList"

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {
  
  var window: UIWindow?
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    
    #if DEBUG
    AppDelegate.initializeFlipper(application: application)
    #endif
    
    guard let bridge = RCTBridge(delegate: self, launchOptions: launchOptions) else { return false }
    let rootView = RCTRootView(bridge: bridge, moduleName: MAIN_MODULE_NAME, initialProperties: nil)
    rootView.backgroundColor = UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0)
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    self.window?.rootViewController = rootViewController
    
    self.window?.makeKeyAndVisible()
    return true
  }
  
  func sourceURL(for bridge: RCTBridge!) -> URL! {
    #if DEBUG
    return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
  
  #if DEBUG
  static func initializeFlipper(application: UIApplication) {
    let client = FlipperClient.shared()
    let layoutDescriptorMapper = SKDescriptorMapper(defaults: ())
    client?.add(FlipperKitLayoutPlugin(rootNode: application, with: layoutDescriptorMapper))
    client?.add(FKUserDefaultsPlugin(suiteName: nil))
    client?.add(FlipperKitReactPlugin())
    client?.add(FlipperKitNetworkPlugin(networkAdapter: SKIOSNetworkAdapter()))
    client?.start()
  }
  #endif
  
}