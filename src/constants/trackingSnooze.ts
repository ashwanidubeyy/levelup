export const TRACKING_SNOOZE_RULES = {
  MINUTES: [15, 30, 60, 120],
  UNTIL_MIDNIGHT: 'untilMidnight',
} as const;

export const TRACKING_SNOOZE_CONSTANTS = {
  TITLE: 'settings.trackingSnooze.title',
  HINT: 'settings.trackingSnooze.hint',
  ACTIVE: 'settings.trackingSnooze.active',
  END: 'settings.trackingSnooze.end',
  OPTION: 'settings.trackingSnooze.option',
  UNTIL_MIDNIGHT: 'settings.trackingSnooze.untilMidnight',
  CLEAR: 'settings.trackingSnooze.clear',
} as const;
