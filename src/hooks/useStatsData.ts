import { useCallback, useEffect, useState } from 'react';
import trackerService from '../services/tracker.service';
import { useAppActive } from './useAppActive';
import type {
  DailyReelCounts,
  DailyUsage,
  FeedSession,
  MonthlyUsageReport,
  TrackerResult,
} from '../types';

interface DayStats {
  counts: TrackerResult<DailyReelCounts> | null;
  usage: TrackerResult<DailyUsage> | null;
  sessions: TrackerResult<FeedSession[]> | null;
}

const EMPTY_DAY: DayStats = { counts: null, usage: null, sessions: null };

export const useDayStats = (day: string, enabled: boolean) => {
  const [data, setData] = useState<DayStats>(EMPTY_DAY);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    if (!enabled) {
      return;
    }
    setLoading(true);
    Promise.all([trackerService.getDayCounts(day), trackerService.getDayUsage(day), trackerService.getSessions(day)])
      .then(([counts, usage, sessions]) => setData({ counts, usage, sessions }))
      .catch(() => setData(EMPTY_DAY))
      .finally(() => setLoading(false));
  }, [day, enabled]);

  useAppActive(load);

  useEffect(() => {
    load();
  }, [load]);

  return { ...data, loading, reload: load };
};

export const useMonthStats = (year: number, month: number, enabled: boolean) => {
  const [report, setReport] = useState<TrackerResult<MonthlyUsageReport> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    if (!enabled) {
      return;
    }
    setLoading(true);
    trackerService
      .getMonthReport(year, month)
      .then(setReport)
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, [year, month, enabled]);

  useAppActive(load);

  useEffect(() => {
    load();
  }, [load]);

  return { report, loading, reload: load };
};
