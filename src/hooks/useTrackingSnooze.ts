import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { expireTrackingSnooze } from '../store/slices/settingsSlice';
import trackerService from '../services/tracker.service';
import { store } from '../store';
import { isTrackingSnoozed } from '../utils/trackingSnooze';
import { TIME } from '../constants/common';

export const useTrackingSnooze = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state?.settings);

  useEffect(() => {
    const sync = () => {
      const now = Date.now();
      if (settings?.trackingSnoozeUntil && settings.trackingSnoozeUntil <= now) {
        dispatch(expireTrackingSnooze());
      }
      trackerService.syncSettingsToNative(store.getState().settings).catch(() => undefined);
    };
    sync();
    const interval = setInterval(sync, TIME.MINUTE_MS);
    return () => clearInterval(interval);
  }, [dispatch, settings?.trackingSnoozeUntil, settings?.trackingEnabled, settings?.trackingSnoozeRestore]);

  return {
    snoozed: isTrackingSnoozed(settings, Date.now()),
    until: settings?.trackingSnoozeUntil ?? null,
  };
};
