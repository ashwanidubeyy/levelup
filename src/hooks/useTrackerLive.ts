import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../store';
import { fetchCapabilities, fetchToday, liveUpdated } from '../store/slices/trackerSlice';
import trackerService from '../services/tracker.service';
import { useAppActive } from './useAppActive';
import { TIME } from '../constants/common';
import type { LiveTrackerState } from '../types';
import { resultData } from '../utils/trackerResult';

export const useTrackerLive = () => {
  const dispatch = useAppDispatch();
  const lastTotalRef = useRef<number | null>(null);

  const refresh = useCallback(() => {
    dispatch(fetchCapabilities());
    dispatch(fetchToday());
  }, [dispatch]);

  useAppActive(refresh);

  useEffect(() => {
    trackerService.getLiveState().then(result => {
      const data = resultData(result);
      if (data) {
        dispatch(liveUpdated(data));
      }
    });
    const unsubscribe = trackerService.subscribe((state: LiveTrackerState) => {
      dispatch(liveUpdated(state));
      if (lastTotalRef.current !== state?.todayTotal) {
        lastTotalRef.current = state?.todayTotal ?? null;
        dispatch(fetchToday());
      }
    });
    const interval = setInterval(refresh, TIME.LIVE_REFRESH_MS);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [dispatch, refresh]);
};
