import trackerService from './tracker.service';
import { PENALTY_QUEST, QUEST_IDS, QUEST_RULES } from '../constants/quests';
import type { DailyReelCounts, DayQuestInput, QuestId, QuestProgress, XpLogEntry } from '../types';
import { addDays, compareDayKeys, daysBetween, trackerDayKey } from '../utils/date';
import { evaluateQuests, isPenaltyDay } from '../utils/questRules';
import { generateId } from '../utils/helpers';
import { resultData } from '../utils/trackerResult';

interface FinalizeParams {
  installDay: string | null;
  finalizedThrough: string | null;
  dailyLimit: number;
  trackingAvailable: boolean;
}

interface FinalizeResult {
  entries: XpLogEntry[];
  finalizedThrough: string | null;
}

const xpEntry = (day: string, questId: QuestId, xp: number): XpLogEntry => ({
  id: generateId(),
  day,
  questId,
  xp,
  at: Date.now(),
});

const REEL_QUESTS: QuestId[] = [QUEST_IDS.DISCIPLINE, QUEST_IDS.RESTRAINT, QUEST_IDS.MORNING];

const awardsForDay = (input: DayQuestInput): XpLogEntry[] => {
  const awards: XpLogEntry[] = [];
  if (!input.serviceActive) {
    return awards;
  }
  evaluateQuests(input).forEach((quest: QuestProgress) => {
    if (REEL_QUESTS.includes(quest.id) && quest.status === 'done') {
      awards.push(xpEntry(input.day, quest.id, quest.xp));
    }
  });
  if (isPenaltyDay(input)) {
    awards.push(xpEntry(input.day, PENALTY_QUEST.id, PENALTY_QUEST.xp));
  }
  return awards;
};

const finalizeStart = (params: FinalizeParams, yesterday: string): string => {
  const lookbackStart = addDays(yesterday, -(QUEST_RULES.FINALIZE_LOOKBACK_DAYS - 1));
  const candidates = [lookbackStart];
  if (params.installDay) {
    candidates.push(params.installDay);
  }
  if (params.finalizedThrough) {
    candidates.push(addDays(params.finalizedThrough, 1));
  }
  return candidates.sort(compareDayKeys)[candidates.length - 1];
};

const finalizePastDays = (params: FinalizeParams): Promise<FinalizeResult> => {
  const yesterday = addDays(trackerDayKey(), -1);
  const start = finalizeStart(params, yesterday);
  if (compareDayKeys(start, yesterday) > 0) {
    return Promise.resolve({ entries: [], finalizedThrough: params.finalizedThrough });
  }
  if (!params.trackingAvailable) {
    return Promise.resolve({ entries: [], finalizedThrough: yesterday });
  }
  const days = daysBetween(start, yesterday);
  return Promise.all(days.map((day: string) => trackerService.getDayCounts(day)))
    .then((results) => {
      const entries: XpLogEntry[] = [];
      results.forEach((result, index: number) => {
        const counts: DailyReelCounts | null = resultData(result);
        const input: DayQuestInput = {
          day: days[index],
          total: counts?.total ?? null,
          serviceActive: !!counts?.serviceActive,
          firstItemAt: counts?.firstItemAt ?? null,
          hasJournalEntry: false,
          dailyLimit: params.dailyLimit,
          trackingAvailable: counts !== null,
          isFinal: true,
        };
        awardsForDay(input).forEach((entry: XpLogEntry) => entries.push(entry));
      });
      return { entries, finalizedThrough: yesterday };
    })
    .catch(() => ({ entries: [], finalizedThrough: params.finalizedThrough }));
};

const journalAward = (day: string): XpLogEntry => {
  const journalQuest = evaluateQuests({
    day,
    total: null,
    serviceActive: false,
    firstItemAt: null,
    hasJournalEntry: true,
    dailyLimit: 0,
    trackingAvailable: false,
    isFinal: false,
  }).find((quest: QuestProgress) => quest.id === QUEST_IDS.JOURNAL);
  return xpEntry(day, QUEST_IDS.JOURNAL, journalQuest?.xp ?? 0);
};

const questService = { finalizePastDays, journalAward };

export default questService;
