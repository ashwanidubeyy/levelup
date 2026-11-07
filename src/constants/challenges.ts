export const CHALLENGE_RULES = {
  PRESET_21: '21',
  PRESET_90: '90',
  CUSTOM: 'custom',
  MIN_DAYS: 1,
  MAX_DAYS: 365,
  CHECK_IN_XP: 25,
  COMPLETE_XP: 150,
  DEFAULT_HOUR: 8,
  DEFAULT_MINUTE: 0,
  MINUTE_STEP: 5,
  HOUR_MAX: 23,
  MINUTE_MAX: 55,
} as const;

export const CHALLENGE_PRESETS = [
  { labelKey: 'challenges.presets.days21', value: CHALLENGE_RULES.PRESET_21 },
  { labelKey: 'challenges.presets.days90', value: CHALLENGE_RULES.PRESET_90 },
  { labelKey: 'challenges.presets.custom', value: CHALLENGE_RULES.CUSTOM },
] as const;

export const CHALLENGE_CONSTANTS = {
  TITLE: 'challenges.title',
  SUBTITLE: 'challenges.subtitle',
  NEW: 'challenges.new',
  NAME: 'challenges.name',
  NAME_PLACEHOLDER: 'challenges.namePlaceholder',
  REWARD: 'challenges.reward',
  REWARD_PLACEHOLDER: 'challenges.rewardPlaceholder',
  LENGTH: 'challenges.length',
  DAYS: 'challenges.days',
  DAYS_VALUE: 'challenges.daysValue',
  START: 'challenges.start',
  REMINDER: 'challenges.reminder',
  REMINDER_HINT: 'challenges.reminderHint',
  HOUR: 'challenges.hour',
  MINUTE: 'challenges.minute',
  CREATE: 'challenges.create',
  EMPTY: 'challenges.empty',
  PROGRESS: 'challenges.progress',
  RANGE: 'challenges.range',
  CHECK_IN: 'challenges.checkIn',
  DONE: 'challenges.done',
  XP_LINE: 'challenges.xpLine',
  RECENT: 'challenges.recent',
  LEVEL_TITLE: 'challenges.levelTitle',
  VALIDATION: {
    TITLE: 'challenges.validation.title',
  },
  XP: {
    CHECK_IN: 'challenges.xp.checkIn',
    COMPLETE: 'challenges.xp.complete',
    FOCUS: 'challenges.xp.focus',
    JOURNAL: 'challenges.xp.journal',
    GENERIC: 'challenges.xp.generic',
  },
} as const;

export const XP_SOURCES = {
  CHECK_IN: 'challenge-checkin',
  COMPLETE: 'challenge-complete',
  FOCUS: 'focus',
  JOURNAL: 'journal',
} as const;
