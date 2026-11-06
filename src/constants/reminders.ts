export const REMINDER_RULES = {
  ONCE: 'once',
  DAILY: 'daily',
  DEFAULT_HOUR: 9,
  DEFAULT_MINUTE: 0,
  MINUTE_STEP: 5,
  HOUR_MAX: 23,
  MINUTE_MAX: 55,
} as const;

export const REMINDER_REPEAT_OPTIONS = [
  { labelKey: 'calendar.repeat.once', value: REMINDER_RULES.ONCE },
  { labelKey: 'calendar.repeat.daily', value: REMINDER_RULES.DAILY },
] as const;

export const CALENDAR_CONSTANTS = {
  TITLE: 'calendar.title',
  SUBTITLE: 'calendar.subtitle',
  ADD: 'calendar.add',
  NAME: 'calendar.name',
  NAME_PLACEHOLDER: 'calendar.namePlaceholder',
  TIME: 'calendar.time',
  HOUR: 'calendar.hour',
  MINUTE: 'calendar.minute',
  REPEAT: 'calendar.repeat',
  EMPTY: 'calendar.empty',
  AT: 'calendar.at',
  WHEN: 'calendar.when',
  WHEN_DAILY: 'calendar.whenDaily',
  DAILY_TAG: 'calendar.dailyTag',
  WEEKDAYS: [
    'calendar.weekdays.sun',
    'calendar.weekdays.mon',
    'calendar.weekdays.tue',
    'calendar.weekdays.wed',
    'calendar.weekdays.thu',
    'calendar.weekdays.fri',
    'calendar.weekdays.sat',
  ],
  VALIDATION: {
    TITLE: 'calendar.validation.title',
  },
} as const;
