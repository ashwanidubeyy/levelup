import {
  clearDiagnostics,
  getDailyReelCounts,
  getDailyUsage,
  getDiagnostics,
  getLiveState,
  getMonthlyUsageReport,
  getSessions,
  getTrackingCapabilities,
  openPermissionSettings,
  requestTrackingAuthorization,
  setAllowLowConfidence,
  setAppEnabled,
  setDailyLimit,
  setDwellMs,
  setOverlayEnabled,
  setTrackingEnabled,
  subscribeToUpdates,
} from 'levelup-tracker';
import type { AppSettings, TrackedAppId, TrackerStatusKind, TrackingCapabilities } from '../types';
import { TRACKED_APP_IDS } from '../constants/common';

const statusFromCapabilities = (caps: TrackingCapabilities | null): TrackerStatusKind => {
  if (!caps) {
    return 'unsupported';
  }
  if (caps.platform === 'ios') {
    return 'comingSoon';
  }
  if (caps.reelCounting === 'unsupported') {
    return 'unsupported';
  }
  if (!caps.permissions?.accessibility) {
    return 'permissionRequired';
  }
  if (!caps.trackingEnabled) {
    return 'paused';
  }
  return caps.serviceConnected ? 'active' : 'notConnected';
};

const syncSettingsToNative = (settings: AppSettings): Promise<boolean> => {
  const calls: Promise<unknown>[] = [
    setTrackingEnabled(settings?.trackingEnabled),
    setOverlayEnabled(settings?.overlayEnabled),
    setDailyLimit(settings?.dailyLimit),
    setDwellMs(settings?.dwellMs),
    setAllowLowConfidence(settings?.allowLowConfidence),
  ];
  TRACKED_APP_IDS.forEach((id: TrackedAppId) => {
    calls.push(setAppEnabled(id, settings?.appsEnabled?.[id] !== false));
  });
  return Promise.all(calls)
    .then(() => true)
    .catch(() => false);
};

const trackerService = {
  getCapabilities: getTrackingCapabilities,
  requestAuthorization: requestTrackingAuthorization,
  getDayCounts: getDailyReelCounts,
  getDayUsage: getDailyUsage,
  getMonthReport: getMonthlyUsageReport,
  getSessions,
  getDiagnostics,
  clearDiagnostics,
  getLiveState,
  subscribe: subscribeToUpdates,
  openSettings: openPermissionSettings,
  setTrackingEnabled,
  setOverlayEnabled,
  setAppEnabled,
  setDailyLimit,
  setDwellMs,
  setAllowLowConfidence,
  statusFromCapabilities,
  syncSettingsToNative,
};

export default trackerService;
