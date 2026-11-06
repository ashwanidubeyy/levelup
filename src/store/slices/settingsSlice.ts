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
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    hydrateSettings: (state, action: PayloadAction<Partial<AppSettings> | null>) => ({
      ...state,
      ...(action.payload ?? {}),
      appsEnabled: { ...state.appsEnabled, ...(action.payload?.appsEnabled ?? {}) },
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
} = settingsSlice.actions;

export default settingsSlice.reducer;
