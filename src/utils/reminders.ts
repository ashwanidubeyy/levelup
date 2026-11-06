import type { Reminder } from '../types';
import { compareDayKeys, timestampFor } from './date';
import { nextDailyTimestamp } from './notificationPlan';

export const remindersOnDay = (items: Reminder[], day: string): Reminder[] =>
  items?.filter((item: Reminder) =>
    item?.repeat === 'daily' ? compareDayKeys(day, item?.day) >= 0 : item?.day === day,
  ) ?? [];

export const nextReminderAt = (
  items: Reminder[],
  now: number,
): { reminder: Reminder; at: number } | null => {
  let best: { reminder: Reminder; at: number } | null = null;
  items?.forEach((reminder: Reminder) => {
    const at =
      reminder?.repeat === 'daily'
        ? nextDailyTimestamp(reminder.day, reminder.hour, reminder.minute, now)
        : timestampFor(reminder.day, reminder.hour, reminder.minute);
    if (at <= now) {
      return;
    }
    if (!best || at < best.at) {
      best = { reminder, at };
    }
  });
  return best;
};
