import { parseDayKey } from './date';
import { TIME } from '../constants/common';

export const daysInMonthFromDay = (dayKey: string): number => {
  const d = parseDayKey(dayKey);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};

export const daysElapsedInMonthInclusive = (dayKey: string): number => {
  const d = parseDayKey(dayKey);
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.floor((d.getTime() - first.getTime()) / TIME.DAY_MS) + 1;
};

export const daysLeftInMonthInclusive = (dayKey: string): number =>
  daysInMonthFromDay(dayKey) - parseDayKey(dayKey).getDate() + 1;

export const projectedMonthSpend = (spentSoFar: number, dayKey: string): number => {
  const elapsed = daysElapsedInMonthInclusive(dayKey);
  const dim = daysInMonthFromDay(dayKey);
  if (elapsed <= 0 || dim <= 0) return 0;
  return (spentSoFar / elapsed) * dim;
};

export const safeDailyForRest = (remaining: number, dayKey: string): number => {
  const left = daysLeftInMonthInclusive(dayKey);
  if (left <= 0 || remaining <= 0) return 0;
  return remaining / left;
};
