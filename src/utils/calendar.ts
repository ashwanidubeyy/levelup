import { daysBetween, toDayKey } from './date';
import type { Reminder } from '../types';
import { remindersOnDay } from './reminders';

export const monthWeeks = (year: number, month: number): Array<Array<string | null>> => {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: Array<string | null> = [];
  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toDayKey(new Date(year, month - 1, day)));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  const weeks: Array<Array<string | null>> = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
};

export const markedDaysInMonth = (items: Reminder[], year: number, month: number): string[] => {
  const start = toDayKey(new Date(year, month - 1, 1));
  const end = toDayKey(new Date(year, month, 0));
  return daysBetween(start, end).filter((day: string) => remindersOnDay(items, day).length > 0);
};
