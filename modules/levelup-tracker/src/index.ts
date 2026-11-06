import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  type EmitterSubscription,
} from 'react-native';
import type {
  AuthorizationState,
  DailyReelCounts,
  DailyUsage,
  FeedSession,
  LiveTrackerState,
  MonthlyDay,
  MonthlyUsageReport,
  PermissionKind,
  TrackedAppId,
  TrackerDiagnostics,
  TrackerPlatform,
  TrackerResult,
  TrackingCapabilities,
} from './types';

export * from './types';

const NATIVE_MODULE_NAME = 'LevelUpTracker';
const UPDATE_EVENT = 'LevelUpTrackerUpdate';

const REASONS = {
  MODULE_MISSING: 'native-module-missing',
  ACCESSIBILITY_REQUIRED: 'accessibility-service-disabled',
  IOS_REEL_COUNTING: 'ios-no-per-item-api',
  IOS_SCREEN_TIME: 'ios-family-controls-entitlement-required',
  PLATFORM: 'platform-unsupported',
} as const;

const native = NativeModules?.[NATIVE_MODULE_NAME];

const platform: TrackerPlatform =
  Platform.OS === 'android' ? 'android' : Platform.OS === 'ios' ? 'ios' : 'other';

const isAndroid = platform === 'android' && !!native;

const errorResult = <T>(err: any): TrackerResult<T> => ({
  status: 'error',
  reason: err?.message ?? String(err),
});

const ok = <T>(data: T): TrackerResult<T> => ({ status: 'ok', data });

const nonAndroidResult = <T>(kind: 'reels' | 'usage'): TrackerResult<T> => {
  if (!native && platform !== 'ios') {
    return { status: 'unsupported', reason: REASONS.PLATFORM };
  }
  if (platform === 'ios') {
    return kind === 'reels'
      ? { status: 'unsupported', reason: REASONS.IOS_REEL_COUNTING }
      : { status: 'comingSoon', reason: REASONS.IOS_SCREEN_TIME };
  }
  return { status: 'unsupported', reason: REASONS.MODULE_MISSING };
};

const toNumberRecord = (value: any): Record<string, number> => {
  const out: Record<string, number> = {};
  Object.keys(value ?? {}).forEach((key: string) => {
    out[key] = Number(value?.[key] ?? 0);
  });
  return out;
};

const normalizeAndroidCapabilities = (raw: any): TrackingCapabilities => {
  const accessibility = !!raw?.accessibilityEnabled;
  const overlay = !!raw?.overlayPermission;
  const battery = !!raw?.batteryOptimizationIgnored;
  const missing: PermissionKind[] = [];
  if (!accessibility) {
    missing.push('accessibility');
  }
  return {
    platform: 'android',
    reelCounting: accessibility ? 'supported' : 'permissionRequired',
    reelCountingReason: accessibility ? null : REASONS.ACCESSIBILITY_REQUIRED,
    appUsage: accessibility ? 'supported' : 'permissionRequired',
    appUsageReason: accessibility ? null : REASONS.ACCESSIBILITY_REQUIRED,
    overlay: accessibility ? 'supported' : 'permissionRequired',
    missingPermissions: missing,
    permissions: { accessibility, overlay, battery },
    serviceConnected: !!raw?.serviceConnected,
    restrictedSettingsLikely: !!raw?.restrictedSettingsLikely,
    requiresPaidDeveloperAccount: false,
    trackingEnabled: raw?.trackingEnabled !== false,
    overlayEnabled: raw?.overlayEnabled !== false,
    dailyLimit: Number(raw?.dailyLimit ?? 30),
    dwellMs: Number(raw?.dwellMs ?? 500),
    allowLowConfidence: !!raw?.allowLowConfidence,
    apps: (raw?.apps ?? []).map((app: any) => ({
      id: app?.id,
      packageName: app?.packageName ?? '',
      installed: !!app?.installed,
      versionName: app?.versionName ?? null,
      enabled: app?.enabled !== false,
      experimental: !!app?.experimental,
      detectorVersion: app?.detectorVersion ?? '',
    })),
    validationStatus: raw?.validationStatus ?? 'pendingDeviceValidation',
    sdkInt: raw?.sdkInt ?? null,
  };
};

const iosCapabilities = (raw: any): TrackingCapabilities => ({
  platform: 'ios',
  reelCounting: 'unsupported',
  reelCountingReason: raw?.reelCountingReason ?? REASONS.IOS_REEL_COUNTING,
  appUsage: 'comingSoon',
  appUsageReason: raw?.appUsageReason ?? REASONS.IOS_SCREEN_TIME,
  overlay: 'unsupported',
  missingPermissions: [],
  permissions: { accessibility: false, overlay: false, battery: true },
  serviceConnected: false,
  restrictedSettingsLikely: false,
  requiresPaidDeveloperAccount: true,
  trackingEnabled: false,
  overlayEnabled: false,
  dailyLimit: 30,
  dwellMs: 500,
  allowLowConfidence: false,
  apps: [],
  validationStatus: 'notApplicable',
  sdkInt: null,
});

const unsupportedCapabilities = (): TrackingCapabilities => ({
  ...iosCapabilities(null),
  platform,
  reelCountingReason: native ? REASONS.PLATFORM : REASONS.MODULE_MISSING,
  appUsage: 'unsupported',
  requiresPaidDeveloperAccount: false,
});

export const getTrackingCapabilities = (): Promise<TrackingCapabilities> => {
  if (!native) {
    return Promise.resolve(unsupportedCapabilities());
  }
  return native
    .getCapabilities()
    .then((raw: any) =>
      platform === 'android' ? normalizeAndroidCapabilities(raw) : iosCapabilities(raw),
    )
    .catch(() => unsupportedCapabilities());
};

const withPermission = <T>(load: () => Promise<T>): Promise<TrackerResult<T>> =>
  Promise.all([getTrackingCapabilities(), load()])
    .then(([caps, data]: [TrackingCapabilities, T]) =>
      caps?.permissions?.accessibility
        ? ok(data)
        : ({
            status: 'permissionRequired',
            missing: caps?.missingPermissions ?? ['accessibility'],
            reason: REASONS.ACCESSIBILITY_REQUIRED,
            data,
          } as TrackerResult<T>),
    )
    .catch((err: any) => errorResult<T>(err));

const mapDayCounts = (raw: any): DailyReelCounts => ({
  day: raw?.day ?? '',
  total: Number(raw?.total ?? 0),
  byApp: toNumberRecord(raw?.byApp),
  byConfidence: toNumberRecord(raw?.byConfidence),
  sessions: Number(raw?.sessions ?? 0),
  serviceActive: !!raw?.serviceActive,
  firstItemAt: raw?.firstItemAt ?? null,
});

const mapDayUsage = (raw: any): DailyUsage => ({
  day: raw?.day ?? '',
  feedTimeMs: Number(raw?.feedTimeMs ?? 0),
  feedTimeByApp: toNumberRecord(raw?.feedTimeByApp),
  sessions: Number(raw?.sessions ?? 0),
  source: 'trackedFeedSessions',
});

const mapMonthlyDay = (raw: any): MonthlyDay => ({
  day: raw?.day ?? '',
  total: Number(raw?.total ?? 0),
  byApp: toNumberRecord(raw?.byApp),
  feedTimeMs: Number(raw?.feedTimeMs ?? 0),
  sessions: Number(raw?.sessions ?? 0),
  serviceActive: !!raw?.serviceActive,
});

const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

const buildMonthlyReport = (month: string, days: MonthlyDay[]): MonthlyUsageReport => {
  const tracked = days?.filter((day: MonthlyDay) => day?.serviceActive) ?? [];
  let total = 0;
  let feedTimeMs = 0;
  let peakDay: MonthlyDay | null = null;
  let lowestDay: MonthlyDay | null = null;
  days?.forEach((day: MonthlyDay) => {
    total += day?.total ?? 0;
    feedTimeMs += day?.feedTimeMs ?? 0;
  });
  tracked.forEach((day: MonthlyDay) => {
    if (!peakDay || day?.total > peakDay.total) {
      peakDay = day;
    }
    if (!lowestDay || day?.total < lowestDay.total) {
      lowestDay = day;
    }
  });
  return {
    month,
    days,
    total,
    feedTimeMs,
    trackedDays: tracked.length,
    averagePerTrackedDay: tracked.length > 0 ? Math.round(total / tracked.length) : 0,
    peakDay,
    lowestDay,
  };
};

export const requestTrackingAuthorization = (): Promise<TrackerResult<AuthorizationState>> => {
  if (!isAndroid) {
    return Promise.resolve(nonAndroidResult<AuthorizationState>('usage'));
  }
  return getTrackingCapabilities()
    .then((caps: TrackingCapabilities) => {
      if (caps?.permissions?.accessibility) {
        return ok<AuthorizationState>({ missing: [], opened: null });
      }
      return native
        .openAccessibilitySettings()
        .then(() =>
          ({
            status: 'permissionRequired',
            missing: caps?.missingPermissions ?? ['accessibility'],
            reason: REASONS.ACCESSIBILITY_REQUIRED,
            data: { missing: caps?.missingPermissions ?? ['accessibility'], opened: 'accessibility' },
          } as TrackerResult<AuthorizationState>),
        );
    })
    .catch((err: any) => errorResult<AuthorizationState>(err));
};

export const getDailyReelCounts = (day: string): Promise<TrackerResult<DailyReelCounts>> =>
  isAndroid
    ? withPermission(() => native.getDayCounts(day).then(mapDayCounts))
    : Promise.resolve(nonAndroidResult<DailyReelCounts>('reels'));

export const getDailyUsage = (day: string): Promise<TrackerResult<DailyUsage>> =>
  isAndroid
    ? withPermission(() => native.getDayCounts(day).then(mapDayUsage))
    : Promise.resolve(nonAndroidResult<DailyUsage>('usage'));

export const getMonthlyUsageReport = (
  year: number,
  month: number,
): Promise<TrackerResult<MonthlyUsageReport>> => {
  const key = `${year}-${pad(month)}`;
  if (!isAndroid) {
    return Promise.resolve(nonAndroidResult<MonthlyUsageReport>('usage'));
  }
  return withPermission(() =>
    native
      .getMonthCounts(key)
      .then((rows: any[]) => buildMonthlyReport(key, rows?.map(mapMonthlyDay) ?? [])),
  );
};

export const getSessions = (day: string): Promise<TrackerResult<FeedSession[]>> =>
  isAndroid
    ? withPermission(() =>
        native.getSessions(day).then((rows: any[]) => (rows ?? []) as FeedSession[]),
      )
    : Promise.resolve(nonAndroidResult<FeedSession[]>('reels'));

const setter = <T>(call: () => Promise<T>): Promise<TrackerResult<T>> =>
  isAndroid
    ? call()
        .then((value: T) => ok(value))
        .catch((err: any) => errorResult<T>(err))
    : Promise.resolve(nonAndroidResult<T>('reels'));

export const setTrackingEnabled = (enabled: boolean) =>
  setter<boolean>(() => native.setTrackingEnabled(enabled));

export const setOverlayEnabled = (enabled: boolean) =>
  setter<boolean>(() => native.setOverlayEnabled(enabled));

export const setAppEnabled = (app: TrackedAppId, enabled: boolean) =>
  setter<boolean>(() => native.setAppEnabled(app, enabled));

export const setDailyLimit = (limit: number) =>
  setter<number>(() => native.setDailyLimit(limit));

export const setDwellMs = (dwellMs: number) =>
  setter<number>(() => native.setDwellMs(dwellMs));

export const setAllowLowConfidence = (enabled: boolean) =>
  setter<boolean>(() => native.setAllowLowConfidence(enabled));

const OPENERS: Record<PermissionKind | 'appDetails', string> = {
  accessibility: 'openAccessibilitySettings',
  overlay: 'openOverlaySettings',
  battery: 'openBatterySettings',
  appDetails: 'openAppDetails',
};

export const openPermissionSettings = (kind: PermissionKind | 'appDetails') =>
  setter<boolean>(() => native[OPENERS[kind]]());

export const getDiagnostics = (): Promise<TrackerResult<TrackerDiagnostics>> =>
  isAndroid
    ? native
        .getDiagnostics()
        .then((raw: any) => ok(raw as TrackerDiagnostics))
        .catch((err: any) => errorResult<TrackerDiagnostics>(err))
    : Promise.resolve(nonAndroidResult<TrackerDiagnostics>('reels'));

export const clearDiagnostics = () => setter<boolean>(() => native.clearDiagnostics());

export const getLiveState = (): Promise<TrackerResult<LiveTrackerState>> =>
  isAndroid
    ? native
        .getLiveState()
        .then((raw: any) => ok(raw as LiveTrackerState))
        .catch((err: any) => errorResult<LiveTrackerState>(err))
    : Promise.resolve(nonAndroidResult<LiveTrackerState>('reels'));

const emitter = isAndroid ? new NativeEventEmitter(native) : null;

export const subscribeToUpdates = (listener: (state: LiveTrackerState) => void): (() => void) => {
  const subscription: EmitterSubscription | undefined = emitter?.addListener(
    UPDATE_EVENT,
    (raw: any) => listener(raw as LiveTrackerState),
  );
  return () => subscription?.remove();
};

export const TRACKER_REASONS = REASONS;
