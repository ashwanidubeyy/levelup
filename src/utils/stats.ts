import type { BarDatum, MonthlyDay, MonthlyUsageReport } from '../types';

const LABELED_DAYS = [1, 5, 10, 15, 20, 25];

const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export const daysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();

export const buildMonthChart = (report: MonthlyUsageReport | null, year: number, month: number): BarDatum[] => {
  const byDay: Record<string, MonthlyDay> = {};
  report?.days?.forEach((day: MonthlyDay) => {
    byDay[day?.day] = day;
  });
  const total = daysInMonth(year, month);
  const data: BarDatum[] = [];
  for (let dayNumber = 1; dayNumber <= total; dayNumber += 1) {
    const key = `${year}-${pad(month)}-${pad(dayNumber)}`;
    const entry = byDay[key];
    data.push({
      key,
      label: LABELED_DAYS.includes(dayNumber) || dayNumber === total ? `${dayNumber}` : '',
      value: entry?.total ?? 0,
      muted: !entry?.serviceActive,
    });
  }
  return data;
};

export const isSameOrAfterMonth = (year: number, month: number, other: { year: number; month: number }): boolean =>
  year > other.year || (year === other.year && month >= other.month);
