import { COMMON_CONSTANTS, TIME } from '../constants/common';
import { TRACKER_RULES } from '../constants/tracker';

const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export const toDayKey = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const todayKey = (): string => toDayKey(new Date());

export const trackerDayKey = (date: Date = new Date()): string => {
  const adjusted = new Date(date);
  if (adjusted.getHours() < TRACKER_RULES.DAY_START_HOUR) {
    adjusted.setDate(adjusted.getDate() - 1);
  }
  return toDayKey(adjusted);
};

export const parseDayKey = (key: string): Date => {
  const [year, month, day] = key?.split('-')?.map((part: string) => Number(part)) ?? [];
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
};

export const addDays = (key: string, amount: number): string => {
  const date = parseDayKey(key);
  date.setDate(date.getDate() + amount);
  return toDayKey(date);
};

export const compareDayKeys = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

export const daysBetween = (from: string, to: string): string[] => {
  const days: string[] = [];
  let cursor = from;
  while (compareDayKeys(cursor, to) <= 0) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
};

export const formatDayLabel = (key: string, locale?: string): string =>
  parseDayKey(key).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });

export const isTomorrow = (key: string, referenceDay: string = todayKey()): boolean => addDays(referenceDay, 1) === key;

export const formatAgendaDay = (
  key: string,
  translate: (translationKey: string) => string,
  referenceDay: string = todayKey(),
): string => {
  if (key === referenceDay) {
    return translate(COMMON_CONSTANTS.TODAY);
  }
  if (isTomorrow(key, referenceDay)) {
    return translate(COMMON_CONSTANTS.TOMORROW);
  }
  return formatDayLabel(key);
};

export const formatShortDay = (key: string): string => `${parseDayKey(key).getDate()}`;

export const formatMonthLabel = (year: number, month: number, locale?: string): string =>
  new Date(year, month - 1, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });

export const formatTime = (timestamp: number, locale?: string): string =>
  new Date(timestamp).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

export const formatDateTime = (timestamp: number, locale?: string): string =>
  new Date(timestamp).toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

export const splitDuration = (ms: number): { hours: number; minutes: number } => {
  const totalMinutes = Math.round((ms ?? 0) / TIME.MINUTE_MS);
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
};

export const hourOf = (timestamp: number): number => new Date(timestamp).getHours();

export const formatClock = (hour: number, minute: number): string => `${pad(hour)}:${pad(minute)}`;

export const timestampFor = (day: string, hour: number, minute: number): number => {
  const date = parseDayKey(day);
  date.setHours(hour, minute, 0, 0);
  return date.getTime();
};

export const upcomingDays = (count: number, from: string = todayKey()): string[] => {
  const days: string[] = [];
  for (let index = 0; index < count; index += 1) {
    days.push(addDays(from, index));
  }
  return days;
};

export const formatCountdown = (ms: number): { minutes: string; seconds: string } => {
  const totalSeconds = Math.max(0, Math.ceil((ms ?? 0) / TIME.SECOND_MS));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes: pad(minutes), seconds: pad(seconds) };
};

export const monthOf = (key: string): { year: number; month: number } => {
  const date = parseDayKey(key);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
};

export const shiftMonth = (year: number, month: number, delta: number): { year: number; month: number } => {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
};

export const dayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / TIME.DAY_MS);
};
