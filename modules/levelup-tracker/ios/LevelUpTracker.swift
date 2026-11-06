import Foundation
import React

@objc(LevelUpTracker)
final class LevelUpTracker: RCTEventEmitter {

  private static let reelCountingReason = "iOS does not expose other apps' screen content or scroll events to third-party apps, so per-Reel and per-Short counting is not possible."
  private static let screenTimeReason = "App-level usage from Screen Time (FamilyControls / DeviceActivity) requires the Family Controls entitlement on a paid Apple Developer account. Raw usage values are only visible inside a DeviceActivityReport extension."

  override static func requiresMainQueueSetup() -> Bool { false }

  override func supportedEvents() -> [String]! { ["LevelUpTrackerUpdate"] }

  @objc(getCapabilities:rejecter:)
  func getCapabilities(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve([
      "platform": "ios",
      "systemVersion": UIDevice.current.systemVersion,
      "reelCounting": "unsupported",
      "reelCountingReason": Self.reelCountingReason,
      "appUsage": "comingSoon",
      "appUsageReason": Self.screenTimeReason,
      "requiresPaidDeveloperAccount": true,
      "overlay": "unsupported",
      "validationStatus": "notApplicable",
    ])
  }

  @objc(requestAuthorization:rejecter:)
  func requestAuthorization(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(["status": "comingSoon", "reason": Self.screenTimeReason])
  }
}
