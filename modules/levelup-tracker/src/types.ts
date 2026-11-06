export type TrackerPlatform = 'android' | 'ios' | 'other';

export type FeatureStatus =
  | 'supported'
  | 'permissionRequired'
  | 'unsupported'
  | 'comingSoon';

export type PermissionKind = 'accessibility' | 'overlay' | 'battery';

export type TrackedAppId = 'instagram' | 'youtube' | 'facebook';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export type ValidationStatus = 'pendingDeviceValidation' | 'validated' | 'notApplicable';

export type TrackerResult<T> =
  | { status: 'ok'; data: T }
  | { status: 'permissionRequired'; missing: PermissionKind[]; reason: string; data?: T }
  | { status: 'unsupported'; reason: string }
  | { status: 'comingSoon'; reason: string }
  | { status: 'error'; reason: string };

export interface SupportedApp {
  id: TrackedAppId;
  packageName: string;
  installed: boolean;
  versionName: string | null;
  enabled: boolean;
  experimental: boolean;
  detectorVersion: string;
}

export interface PermissionStates {
  accessibility: boolean;
  overlay: boolean;
  battery: boolean;
}

export interface TrackingCapabilities {
  platform: TrackerPlatform;
  reelCounting: FeatureStatus;
  reelCountingReason: string | null;
  appUsage: FeatureStatus;
  appUsageReason: string | null;
  overlay: FeatureStatus;
  missingPermissions: PermissionKind[];
  permissions: PermissionStates;
  serviceConnected: boolean;
  restrictedSettingsLikely: boolean;
  requiresPaidDeveloperAccount: boolean;
  trackingEnabled: boolean;
  overlayEnabled: boolean;
  dailyLimit: number;
  dwellMs: number;
  allowLowConfidence: boolean;
  apps: SupportedApp[];
  validationStatus: ValidationStatus;
  sdkInt: number | null;
}

export interface DailyReelCounts {
  day: string;
  total: number;
  byApp: Partial<Record<TrackedAppId, number>>;
  byConfidence: Partial<Record<ConfidenceLevel, number>>;
  sessions: number;
  serviceActive: boolean;
  firstItemAt: number | null;
}

export interface DailyUsage {
  day: string;
  feedTimeMs: number;
  feedTimeByApp: Partial<Record<TrackedAppId, number>>;
  sessions: number;
  source: 'trackedFeedSessions';
}

export interface MonthlyDay {
  day: string;
  total: number;
  byApp: Partial<Record<TrackedAppId, number>>;
  feedTimeMs: number;
  sessions: number;
  serviceActive: boolean;
}

export interface MonthlyUsageReport {
  month: string;
  days: MonthlyDay[];
  total: number;
  feedTimeMs: number;
  trackedDays: number;
  averagePerTrackedDay: number;
  peakDay: MonthlyDay | null;
  lowestDay: MonthlyDay | null;
}

export interface FeedSession {
  id: number;
  app: TrackedAppId;
  startedAt: number;
  endedAt: number | null;
  lastActivityAt: number;
  itemCount: number;
  startConfidence: ConfidenceLevel;
  endReason: string | null;
}

export interface LiveTrackerState {
  app: TrackedAppId | null;
  inFeed: boolean;
  confidence: ConfidenceLevel;
  sessionCount: number;
  todayTotal: number;
  dailyLimit: number;
  at: number;
}

export interface AppDiagnostics {
  id: TrackedAppId;
  detectorVersion: string;
  versionName: string | null;
  experimental: boolean;
  eventsSeen: number;
  inspections: number;
  detectionsHigh: number;
  detectionsMedium: number;
  detectionsLow: number;
  detectionsNone: number;
  counted: number;
  fingerprintsSeen: number;
  lastState: string | null;
  lastConfidence: string | null;
  lastSignals: string | null;
  lastDetectionAt: number;
  lastCountedAt: number;
  lastInspectionNodes: number;
  lastInspectionMs: number;
}

export interface EngineDiagnostics {
  app: TrackedAppId | null;
  inFeed: boolean;
  idle: boolean;
  feedConfidence: ConfidenceLevel;
  visitedCount: number;
  recentFingerprintCount: number;
  counted: number;
  duplicateEvents: number;
  nonFeedScrolls: number;
  revisits: number;
  belowDwell: number;
  lowConfidence: number;
  entryResumed: number;
  feedReloads: number;
}

export interface DiagnosticLogEntry {
  ts: number;
  app: TrackedAppId | null;
  kind: string;
  detail: string | null;
}

export interface TrackerDiagnostics {
  serviceConnected: boolean;
  serviceConnectedAt: number;
  validationStatus: ValidationStatus;
  engine: EngineDiagnostics;
  apps: AppDiagnostics[];
  recent: DiagnosticLogEntry[];
}

export interface AuthorizationState {
  missing: PermissionKind[];
  opened: PermissionKind | null;
}
