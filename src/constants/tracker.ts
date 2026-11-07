export const TRACKER_RULES = {
  DAY_START_HOUR: 6,
} as const;

export const TRACKER_CONSTANTS = {
  STATUS: {
    ACTIVE: 'tracker.status.active',
    PERMISSION_REQUIRED: 'tracker.status.permissionRequired',
    NOT_CONNECTED: 'tracker.status.notConnected',
    PAUSED: 'tracker.status.paused',
    UNSUPPORTED: 'tracker.status.unsupported',
    COMING_SOON: 'tracker.status.comingSoon',
  },
  STATUS_LABELS: {
    active: 'tracker.status.active',
    permissionRequired: 'tracker.status.permissionRequired',
    notConnected: 'tracker.status.notConnected',
    paused: 'tracker.status.paused',
    unsupported: 'tracker.status.unsupported',
    comingSoon: 'tracker.status.comingSoon',
  },
  REASONS: {
    'accessibility-service-disabled': 'tracker.reasons.accessibility',
    'ios-no-per-item-api': 'tracker.reasons.iosReels',
    'ios-family-controls-entitlement-required': 'tracker.reasons.iosScreenTime',
    'platform-unsupported': 'tracker.reasons.platform',
    'native-module-missing': 'tracker.reasons.moduleMissing',
  } as Record<string, string>,
  LIVE: {
    IN_FEED: 'tracker.live.inFeed',
    IDLE: 'tracker.live.idle',
  },
  LIMIT: {
    DEFAULT: 30,
    MIN: 5,
    MAX: 300,
    STEP: 5,
  },
  DWELL_DEFAULT: 500,
  DWELL_OPTIONS: [
    { labelKey: 'settings.dwellOptions.fast', value: 300 },
    { labelKey: 'settings.dwellOptions.normal', value: 500 },
    { labelKey: 'settings.dwellOptions.careful', value: 1000 },
    { labelKey: 'settings.dwellOptions.strict', value: 2000 },
  ],
  WARNING_RATIO: 0.8,
  PLATFORM: {
    ANDROID: 'android',
    IOS: 'ios',
  },
  RESTRICTED_SETTINGS_SDK: 33,
} as const;
