import type { TrackedAppId } from './tracker.types';
import type { ColorSchemeId, ThemeId } from '../theme/types';

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
  themeId: ThemeId;
  colorScheme: ColorSchemeId;
}
