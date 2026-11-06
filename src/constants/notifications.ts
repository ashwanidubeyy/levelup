export const NOTIFICATION_RULES = {
  QUOTE_HOUR: 6,
  QUOTE_MINUTE: 0,
  WINDOW_DAYS: 7,
  BUDGET_WINDOW_DAYS: 7,
  FOCUS_ID: 'focus-done',
  QUOTE_PREFIX: 'quote-',
  REMINDER_PREFIX: 'reminder-',
  CHALLENGE_PREFIX: 'challenge-',
  BUDGET_PREFIX: 'budget-',
} as const;

export const NOTIFICATION_CHANNELS = {
  QUOTES: 'quotes',
  REMINDERS: 'reminders',
  BUDGET: 'budget',
  FOCUS: 'focus',
  CHALLENGES: 'challenges',
} as const;

export const NOTIFICATION_CONSTANTS = {
  QUOTE_TITLE: 'notifications.quoteTitle',
  QUOTE_CHANNEL: 'notifications.quoteChannel',
  REMINDER_CHANNEL: 'notifications.reminderChannel',
  BUDGET_TITLE: 'notifications.budgetTitle',
  BUDGET_BODY: 'notifications.budgetBody',
  BUDGET_CHANNEL: 'notifications.budgetChannel',
  FOCUS_TITLE: 'notifications.focusTitle',
  FOCUS_BODY: 'notifications.focusBody',
  FOCUS_CHANNEL: 'notifications.focusChannel',
  CHALLENGE_TITLE: 'notifications.challengeTitle',
  CHALLENGE_BODY: 'notifications.challengeBody',
  CHALLENGE_CHANNEL: 'notifications.challengeChannel',
} as const;
