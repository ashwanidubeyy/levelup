import { useCallback, useEffect, useState } from 'react';
import trackerService from '../services/tracker.service';
import { useAppActive } from './useAppActive';
import type { TrackerDiagnostics } from '../types';
import { resultData } from '../utils/trackerResult';

export const useDiagnostics = () => {
  const [diagnostics, setDiagnostics] = useState<TrackerDiagnostics | null>(null);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    trackerService
      .getDiagnostics()
      .then(result => setDiagnostics(resultData(result)))
      .catch(() => setDiagnostics(null))
      .finally(() => setLoading(false));
  }, []);

  const clear = useCallback(() => {
    trackerService
      .clearDiagnostics()
      .then(reload)
      .catch(() => null);
  }, [reload]);

  useAppActive(reload);

  useEffect(() => {
    reload();
  }, [reload]);

  return { diagnostics, loading, reload, clear };
};
