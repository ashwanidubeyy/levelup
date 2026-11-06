import { useMemo } from 'react';
import { useAppSelector } from '../store';
import journalService from '../services/journal.service';
import { evaluateQuests, penaltyProgress } from '../utils/questRules';
import { buildLevelInfo } from '../utils/level';
import { resultData } from '../utils/trackerResult';
import { todayKey } from '../utils/date';
import type { DayQuestInput } from '../types';

export const useQuestBoard = () => {
  const today = useAppSelector(state => state?.tracker?.today);
  const capabilities = useAppSelector(state => state?.tracker?.capabilities);
  const entries = useAppSelector(state => state?.journal?.entries);
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit);
  const xp = useAppSelector(state => state?.quests?.xp);
  const log = useAppSelector(state => state?.quests?.log);

  const input: DayQuestInput = useMemo(() => {
    const counts = resultData(today);
    const day = todayKey();
    return {
      day,
      total: counts?.total ?? null,
      serviceActive: !!counts?.serviceActive,
      firstItemAt: counts?.firstItemAt ?? null,
      hasJournalEntry: journalService.hasEntryOn(entries ?? [], day),
      dailyLimit: dailyLimit ?? 0,
      trackingAvailable:
        capabilities?.platform === 'android' && !!capabilities?.permissions?.accessibility,
      isFinal: false,
    };
  }, [today, entries, dailyLimit, capabilities]);

  const quests = useMemo(() => evaluateQuests(input), [input]);
  const penalty = useMemo(() => penaltyProgress(input), [input]);
  const levelInfo = useMemo(() => buildLevelInfo(xp ?? 0), [xp]);

  return { quests, penalty, levelInfo, log: log ?? [], input };
};
