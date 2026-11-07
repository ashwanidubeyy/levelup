import type { TrackedAppId } from './tracker.types';

export interface AppSettings {
  onboardingComplete: boolean;
  installDay: string | null;
  dailyLimit: number;
  dwellMs: number;
  overlayEnabled: boolean;
  trackingEnabled: boolean;
  allowLowConfidence: boolean;
  appsEnabled: Record<TrackedAppId, boolean>;
  trackingSnoozeUntil: number | null;
  trackingSnoozeRestore: boolean;
}
