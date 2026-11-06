export const FOCUS_RULES = {
  PRESET_25: '25',
  PRESET_45: '45',
  PRESET_60: '60',
  CUSTOM: 'custom',
  DEFAULT_MINUTES: 25,
  MIN_MINUTES: 5,
  MAX_MINUTES: 180,
  STEP: 5,
  XP: 20,
} as const;

export const FOCUS_PRESETS = [
  { labelKey: 'focus.presets.m25', value: FOCUS_RULES.PRESET_25 },
  { labelKey: 'focus.presets.m45', value: FOCUS_RULES.PRESET_45 },
  { labelKey: 'focus.presets.m60', value: FOCUS_RULES.PRESET_60 },
  { labelKey: 'focus.presets.custom', value: FOCUS_RULES.CUSTOM },
] as const;

export const FOCUS_CONSTANTS = {
  TITLE: 'focus.title',
  SUBTITLE: 'focus.subtitle',
  START: 'focus.start',
  PAUSE: 'focus.pause',
  RESET: 'focus.reset',
  MINUTES: 'focus.minutes',
  MINUTES_VALUE: 'focus.minutesValue',
  XP_HINT: 'focus.xpHint',
  DONE: 'focus.done',
  TODAY: 'focus.today',
  IDLE: 'focus.idle',
} as const;
