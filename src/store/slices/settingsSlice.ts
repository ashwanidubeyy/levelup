import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppSettings, TrackedAppId } from '../../types';
import { TRACKER_CONSTANTS } from '../../constants/tracker';

export interface SettingsState extends AppSettings {
  hydrated: boolean;
}

const initialState: SettingsState = {
  hydrated: false,
  onboardingComplete: false,
  installDay: null,
  dailyLimit: TRACKER_CONSTANTS.LIMIT.DEFAULT,
  dwellMs: TRACKER_CONSTANTS.DWELL_DEFAULT,
  overlayEnabled: true,
  trackingEnabled: true,
  allowLowConfidence: false,
  appsEnabled: { instagram: true, youtube: true, facebook: true },
  trackingSnoozeUntil: null,
  trackingSnoozeRestore: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    hydrateSettings: (state, action: PayloadAction<Partial<AppSettings> | null>) => ({
      ...state,
      ...(action.payload ?? {}),
      appsEnabled: { ...state.appsEnabled, ...(action.payload?.appsEnabled ?? {}) },
      trackingSnoozeUntil: action.payload?.trackingSnoozeUntil ?? null,
      trackingSnoozeRestore:
        action.payload?.trackingSnoozeRestore === undefined ? true : action.payload.trackingSnoozeRestore,
      hydrated: true,
    }),
    setInstallDay: (state, action: PayloadAction<string>) => {
      state.installDay = state.installDay ?? action.payload;
    },
    setOnboardingComplete: (state, action: PayloadAction<boolean>) => {
      state.onboardingComplete = action.payload;
    },
    setDailyLimitSetting: (state, action: PayloadAction<number>) => {
      state.dailyLimit = action.payload;
    },
    setDwellSetting: (state, action: PayloadAction<number>) => {
      state.dwellMs = action.payload;
    },
    setOverlaySetting: (state, action: PayloadAction<boolean>) => {
      state.overlayEnabled = action.payload;
    },
    setTrackingSetting: (state, action: PayloadAction<boolean>) => {
      state.trackingEnabled = action.payload;
    },
    setLowConfidenceSetting: (state, action: PayloadAction<boolean>) => {
      state.allowLowConfidence = action.payload;
    },
    setAppEnabledSetting: (state, action: PayloadAction<{ app: TrackedAppId; enabled: boolean }>) => {
      state.appsEnabled[action.payload.app] = action.payload.enabled;
    },
    startTrackingSnooze: (state, action: PayloadAction<{ until: number }>) => {
      state.trackingSnoozeRestore = state.trackingEnabled;
      state.trackingEnabled = false;
      state.trackingSnoozeUntil = action.payload.until;
    },
    clearTrackingSnooze: state => {
      if (state.trackingSnoozeRestore) {
        state.trackingEnabled = true;
      }
      state.trackingSnoozeUntil = null;
      state.trackingSnoozeRestore = true;
    },
    expireTrackingSnooze: state => {
      if (state.trackingSnoozeRestore) {
        state.trackingEnabled = true;
      }
      state.trackingSnoozeUntil = null;
      state.trackingSnoozeRestore = true;
    },
  },
});

export const {
  hydrateSettings,
  setInstallDay,
  setOnboardingComplete,
  setDailyLimitSetting,
  setDwellSetting,
  setOverlaySetting,
  setTrackingSetting,
  setLowConfidenceSetting,
  setAppEnabledSetting,
  startTrackingSnooze,
  clearTrackingSnooze,
  expireTrackingSnooze,
} = settingsSlice.actions;

export default settingsSlice.reducer;
