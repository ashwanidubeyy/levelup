export const PLANNER_RULES = {
  REMINDER_HOUR: 21,
  REMINDER_MINUTE: 0,
  TITLE_MAX: 120,
  PREVIEW_LIMIT: 3,
} as const;

export const PLANNER_CONSTANTS = {
  TITLE: 'planner.title',
  SUBTITLE: 'planner.subtitle',
  ADD: 'planner.add',
  TASK: 'planner.task',
  TASK_PLACEHOLDER: 'planner.taskPlaceholder',
  EMPTY: 'planner.empty',
  DONE: 'planner.done',
  OPEN: 'planner.open',
  EDIT: 'planner.edit',
  RESET_DAY: 'planner.resetDay',
  RESET_TITLE: 'planner.resetTitle',
  RESET_MESSAGE: 'planner.resetMessage',
  REMINDER: 'planner.reminder',
  REMINDER_HINT: 'planner.reminderHint',
  REMINDER_TIME: 'planner.reminderTime',
  HOUR: 'planner.hour',
  MINUTE: 'planner.minute',
  PROGRESS: 'planner.progress',
  VALIDATION: {
    TITLE: 'planner.validation.title',
  },
} as const;
