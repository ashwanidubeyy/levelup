import type { AppSettings } from '../types';

export const isTrackingSnoozed = (settings: AppSettings, now: number): boolean =>
  (settings?.trackingSnoozeUntil ?? 0) > now;

export const effectiveTrackingEnabled = (settings: AppSettings, now: number): boolean =>
  !!settings?.trackingEnabled && !isTrackingSnoozed(settings, now);

export const trackingSnoozeLabelMs = (settings: AppSettings, now: number): number =>
  Math.max(0, (settings?.trackingSnoozeUntil ?? 0) - now);
