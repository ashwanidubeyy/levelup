export const I18N_CONFIG = {
  DEFAULT_LANGUAGE: 'en',
} as const;

export const APP_INFO = {
  VERSION: '1.0.0',
} as const;

export const STORAGE_KEYS = {
  SETTINGS: 'levelup.settings.v1',
  JOURNAL: 'levelup.journal.v1',
  QUESTS: 'levelup.quests.v1',
  CHALLENGES: 'levelup.challenges.v1',
  REMINDERS: 'levelup.reminders.v1',
  BUDGET: 'levelup.budget.v1',
  FOCUS: 'levelup.focus.v1',
} as const;

export const COMMON_CONSTANTS = {
  APP_NAME: 'common.appName',
  ACTIONS: {
    SAVE: 'common.actions.save',
    CANCEL: 'common.actions.cancel',
    DELETE: 'common.actions.delete',
    OPEN: 'common.actions.open',
    CONTINUE: 'common.actions.continue',
    BACK: 'common.actions.back',
    SKIP: 'common.actions.skip',
    DONE: 'common.actions.done',
    REFRESH: 'common.actions.refresh',
    CLEAR: 'common.actions.clear',
    RETRY: 'common.actions.retry',
    ENABLE: 'common.actions.enable',
    NEW_ENTRY: 'common.actions.newEntry',
    ADD: 'common.actions.add',
    ARISE: 'common.actions.arise',
    PREVIOUS: 'common.actions.previous',
    NEXT: 'common.actions.next',
  },
  APPS: {
    instagram: 'common.apps.instagram',
    youtube: 'common.apps.youtube',
    facebook: 'common.apps.facebook',
  },
  APPS_SHORT: {
    instagram: 'common.appsShort.instagram',
    youtube: 'common.appsShort.youtube',
    facebook: 'common.appsShort.facebook',
  },
  CONFIDENCE: {
    HIGH: 'common.confidence.HIGH',
    MEDIUM: 'common.confidence.MEDIUM',
    LOW: 'common.confidence.LOW',
    NONE: 'common.confidence.NONE',
  },
  UNITS: {
    MINUTES: 'common.units.minutes',
    HOURS_MINUTES: 'common.units.hoursMinutes',
    REELS: 'common.units.reels',
  },
  VALIDATION: {
    pendingDeviceValidation: 'common.pendingValidation',
    validated: 'common.validated',
    notApplicable: 'common.notApplicable',
  },
  EXPERIMENTAL: 'common.experimental',
  TODAY: 'common.today',
  ON: 'common.on',
  OFF: 'common.off',
  DASH: 'common.dash',
} as const;

export const TIME = {
  SECOND_MS: 1000,
  MINUTE_MS: 60000,
  HOUR_MS: 3600000,
  DAY_MS: 86400000,
  SPLASH_MIN_MS: 1800,
  LIVE_REFRESH_MS: 15000,
  PERSIST_DEBOUNCE_MS: 400,
  PERMISSION_POLL_MS: 1500,
} as const;

export const TRACKED_APP_IDS = ['instagram', 'youtube', 'facebook'] as const;
