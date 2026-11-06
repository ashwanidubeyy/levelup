import type { AgendaItem, IndiaCalendarEvent, Reminder } from '../types';
import { addDays, compareDayKeys, timestampFor, todayKey } from './date';
import { upcomingHolidays } from './indiaCalendar';

const reminderAt = (reminder: Reminder, now: number): { day: string; at: number } | null => {
  if (reminder?.repeat === 'daily') {
    const start = compareDayKeys(todayKey(), reminder?.day ?? '') >= 0 ? todayKey() : reminder?.day ?? todayKey();
    const at = timestampFor(start, reminder?.hour ?? 0, reminder?.minute ?? 0);
    const day = at > now ? start : addDays(start, 1);
    return { day, at: timestampFor(day, reminder?.hour ?? 0, reminder?.minute ?? 0) };
  }
  const at = timestampFor(reminder?.day ?? '', reminder?.hour ?? 0, reminder?.minute ?? 0);
  if (at <= now) {
    return null;
  }
  return { day: reminder?.day ?? '', at };
};

export const buildAgenda = (reminders: Reminder[], now: number, limit: number): AgendaItem[] => {
  const items: AgendaItem[] = [];
  upcomingHolidays(todayKey()).forEach((event: IndiaCalendarEvent) => {
    items.push({
      id: event?.id ?? '',
      day: event?.day ?? '',
      kind: 'holiday',
      title: '',
      titleKey: event?.nameKey ?? '',
      at: timestampFor(event?.day ?? '', 0, 0),
    });
  });
  reminders?.forEach((reminder: Reminder) => {
    const next = reminderAt(reminder, now);
    if (!next) {
      return;
    }
    items.push({
      id: reminder?.id ?? '',
      day: next.day,
      kind: 'reminder',
      title: reminder?.title ?? '',
      titleKey: '',
      at: next.at,
    });
  });
  items.sort((left: AgendaItem, right: AgendaItem) => left.at - right.at);
  return items.slice(0, limit);
};
