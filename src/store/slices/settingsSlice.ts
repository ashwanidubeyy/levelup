import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppSettings, TrackedAppId } from '../../types';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { DEFAULT_THEME_ID } from '../../theme/presets';
import { EMPTY_THEME_OVERRIDES } from '../../theme/tokens';
import type { ThemeOverrides } from '../../theme/types';

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
  themeId: DEFAULT_THEME_ID,
  colorScheme: 'dark',
  themeOverrides: EMPTY_THEME_OVERRIDES,
  appMode: 'tracker',
  fontId: 'minimal',
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
      themeId: action.payload?.themeId ?? DEFAULT_THEME_ID,
      colorScheme: action.payload?.colorScheme ?? 'dark',
      themeOverrides: {
        accent: action.payload?.themeOverrides?.accent ?? null,
        background: action.payload?.themeOverrides?.background ?? null,
        surface: action.payload?.themeOverrides?.surface ?? null,
        text: action.payload?.themeOverrides?.text ?? null,
      },
      appMode: action.payload?.appMode === 'tools' ? 'tools' : 'tracker',
      fontId:
        action.payload?.fontId === 'rajdhani' || action.payload?.fontId === 'orbitron'
          ? action.payload.fontId
          : 'minimal',
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
    setThemeId: (state, action: PayloadAction<AppSettings['themeId']>) => {
      state.themeId = action.payload;
    },
    setColorScheme: (state, action: PayloadAction<AppSettings['colorScheme']>) => {
      state.colorScheme = action.payload;
    },
    setThemeOverride: (state, action: PayloadAction<Partial<ThemeOverrides>>) => {
      state.themeOverrides = {
        accent: state.themeOverrides?.accent ?? null,
        background: state.themeOverrides?.background ?? null,
        surface: state.themeOverrides?.surface ?? null,
        text: state.themeOverrides?.text ?? null,
        ...action.payload,
      };
    },
    clearThemeOverrides: state => {
      state.themeOverrides = {
        accent: null,
        background: null,
        surface: null,
        text: null,
      };
    },
    setAppMode: (state, action: PayloadAction<AppSettings['appMode']>) => {
      state.appMode = action.payload;
    },
    setFontId: (state, action: PayloadAction<AppSettings['fontId']>) => {
      state.fontId = action.payload;
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
  setThemeId,
  setColorScheme,
  setThemeOverride,
  clearThemeOverrides,
  setAppMode,
  setFontId,
} = settingsSlice.actions;

export default settingsSlice.reducer;
