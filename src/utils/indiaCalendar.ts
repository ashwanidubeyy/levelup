import { INDIA_CALENDAR_EVENTS } from '../constants/indiaCalendar';
import type { IndiaCalendarEvent } from '../types';
import { compareDayKeys, monthOf } from './date';

export const holidaysOnDay = (day: string): IndiaCalendarEvent[] =>
  INDIA_CALENDAR_EVENTS.filter((event: IndiaCalendarEvent) => event?.day === day);

export const holidaysInMonth = (year: number, month: number): IndiaCalendarEvent[] =>
  INDIA_CALENDAR_EVENTS.filter((event: IndiaCalendarEvent) => {
    const parts = monthOf(event?.day ?? '');
    return parts.year === year && parts.month === month;
  });

export const upcomingHolidays = (fromDay: string): IndiaCalendarEvent[] =>
  INDIA_CALENDAR_EVENTS.filter((event: IndiaCalendarEvent) => compareDayKeys(event?.day ?? '', fromDay) >= 0);
