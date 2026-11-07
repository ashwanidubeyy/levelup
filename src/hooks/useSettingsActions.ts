import { useCallback } from 'react';
import { store, useAppDispatch } from '../store';
import {
  setAppEnabledSetting,
  setDailyLimitSetting,
  setDwellSetting,
  setLowConfidenceSetting,
  setOverlaySetting,
  setTrackingSetting,
  startTrackingSnooze,
  clearTrackingSnooze,
} from '../store/slices/settingsSlice';
import { fetchCapabilities, fetchToday } from '../store/slices/trackerSlice';
import trackerService from '../services/tracker.service';
import type { PermissionKind, TrackedAppId } from '../types';

export const useSettingsActions = () => {
  const dispatch = useAppDispatch();

  const refreshCapabilities = useCallback(() => {
    dispatch(fetchCapabilities());
  }, [dispatch]);

  const changeTracking = useCallback(
    (enabled: boolean) => {
      dispatch(setTrackingSetting(enabled));
      trackerService.setTrackingEnabled(enabled).then(refreshCapabilities);
    },
    [dispatch, refreshCapabilities],
  );

  const changeOverlay = useCallback(
    (enabled: boolean) => {
      dispatch(setOverlaySetting(enabled));
      trackerService.setOverlayEnabled(enabled).then(refreshCapabilities);
    },
    [dispatch, refreshCapabilities],
  );

  const changeLimit = useCallback(
    (limit: number) => {
      dispatch(setDailyLimitSetting(limit));
      trackerService.setDailyLimit(limit).then(() => dispatch(fetchToday()));
    },
    [dispatch],
  );

  const changeDwell = useCallback(
    (dwellMs: number) => {
      dispatch(setDwellSetting(dwellMs));
      trackerService.setDwellMs(dwellMs).then(refreshCapabilities);
    },
    [dispatch, refreshCapabilities],
  );

  const changeLowConfidence = useCallback(
    (enabled: boolean) => {
      dispatch(setLowConfidenceSetting(enabled));
      trackerService.setAllowLowConfidence(enabled).then(refreshCapabilities);
    },
    [dispatch, refreshCapabilities],
  );

  const changeApp = useCallback(
    (app: TrackedAppId, enabled: boolean) => {
      dispatch(setAppEnabledSetting({ app, enabled }));
      trackerService.setAppEnabled(app, enabled).then(refreshCapabilities);
    },
    [dispatch, refreshCapabilities],
  );

  const openPermission = useCallback(
    (kind: PermissionKind | 'appDetails') => {
      trackerService.openSettings(kind).then(refreshCapabilities);
    },
    [refreshCapabilities],
  );

  const snoozeTracking = useCallback(
    (until: number) => {
      dispatch(startTrackingSnooze({ until }));
      trackerService.syncSettingsToNative(store.getState().settings).catch(() => undefined);
    },
    [dispatch],
  );

  const endSnooze = useCallback(() => {
    dispatch(clearTrackingSnooze());
    trackerService.syncSettingsToNative(store.getState().settings).catch(() => undefined);
  }, [dispatch]);

  return {
    changeTracking,
    changeOverlay,
    changeLimit,
    changeDwell,
    changeLowConfidence,
    changeApp,
    openPermission,
    refreshCapabilities,
    snoozeTracking,
    endSnooze,
  };
};
