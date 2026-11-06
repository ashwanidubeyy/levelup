import { PENALTY_QUEST, QUEST_DEFINITIONS, QUEST_IDS, QUEST_RULES } from '../constants/quests';
import type { DayQuestInput, QuestId, QuestProgress, QuestStatus } from '../types';
import { hourOf } from './date';

const reelStatus = (input: DayQuestInput, passed: boolean): QuestStatus => {
  if (!input.trackingAvailable || input.total === null) {
    return 'locked';
  }
  if (input.isFinal && !input.serviceActive) {
    return 'locked';
  }
  if (!passed) {
    return 'failed';
  }
  return input.isFinal ? 'done' : 'inProgress';
};

const statusFor = (id: QuestId, input: DayQuestInput): QuestStatus => {
  const total = input.total ?? 0;
  switch (id) {
    case QUEST_IDS.DISCIPLINE:
      return reelStatus(input, total <= input.dailyLimit);
    case QUEST_IDS.RESTRAINT:
      return reelStatus(input, total <= Math.floor(input.dailyLimit / 2));
    case QUEST_IDS.MORNING:
      return reelStatus(
        input,
        input.firstItemAt === null || hourOf(input.firstItemAt) >= QUEST_RULES.MORNING_CUTOFF_HOUR,
      );
    case QUEST_IDS.JOURNAL:
      if (input.hasJournalEntry) {
        return 'done';
      }
      return input.isFinal ? 'failed' : 'inProgress';
    default:
      return 'locked';
  }
};

export const evaluateQuests = (input: DayQuestInput): QuestProgress[] =>
  QUEST_DEFINITIONS.map((quest: (typeof QUEST_DEFINITIONS)[number]) => ({
    id: quest.id,
    titleKey: quest.titleKey,
    descriptionKey: quest.descriptionKey,
    xp: quest.xp,
    status: statusFor(quest.id, input),
    image: quest.image,
  }));

export const isPenaltyDay = (input: DayQuestInput): boolean =>
  input.trackingAvailable &&
  input.serviceActive &&
  input.total !== null &&
  input.total > input.dailyLimit;

export const penaltyProgress = (input: DayQuestInput): QuestProgress => ({
  id: PENALTY_QUEST.id,
  titleKey: PENALTY_QUEST.titleKey,
  descriptionKey: PENALTY_QUEST.descriptionKey,
  xp: PENALTY_QUEST.xp,
  status: isPenaltyDay(input) ? 'failed' : input.isFinal ? 'done' : 'inProgress',
  image: PENALTY_QUEST.image,
});
