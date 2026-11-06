import { ANIME_IMAGES } from './images';

export const QUEST_IDS = {
  DISCIPLINE: 'discipline',
  RESTRAINT: 'restraint',
  MORNING: 'morning',
  JOURNAL: 'journal',
  PENALTY: 'penalty',
} as const;

export const QUEST_DEFINITIONS = [
  {
    id: QUEST_IDS.DISCIPLINE,
    titleKey: 'quests.items.discipline.title',
    descriptionKey: 'quests.items.discipline.description',
    xp: 100,
    requiresTracking: true,
    image: ANIME_IMAGES.ZORO_BLADE,
  },
  {
    id: QUEST_IDS.RESTRAINT,
    titleKey: 'quests.items.restraint.title',
    descriptionKey: 'quests.items.restraint.description',
    xp: 50,
    requiresTracking: true,
    image: ANIME_IMAGES.ITACHI,
  },
  {
    id: QUEST_IDS.MORNING,
    titleKey: 'quests.items.morning.title',
    descriptionKey: 'quests.items.morning.description',
    xp: 50,
    requiresTracking: true,
    image: ANIME_IMAGES.LUFFY_FREE,
  },
  {
    id: QUEST_IDS.JOURNAL,
    titleKey: 'quests.items.journal.title',
    descriptionKey: 'quests.items.journal.description',
    xp: 50,
    requiresTracking: false,
    image: ANIME_IMAGES.JIRAIYA,
  },
] as const;

export const PENALTY_QUEST = {
  id: QUEST_IDS.PENALTY,
  titleKey: 'quests.items.penalty.title',
  descriptionKey: 'quests.items.penalty.description',
  xp: -40,
  image: ANIME_IMAGES.SASUKE,
} as const;

export const QUEST_TITLE_KEYS: Record<string, string> = {
  discipline: 'quests.items.discipline.title',
  restraint: 'quests.items.restraint.title',
  morning: 'quests.items.morning.title',
  journal: 'quests.items.journal.title',
  penalty: 'quests.items.penalty.title',
};

export const QUEST_RULES = {
  MORNING_CUTOFF_HOUR: 12,
  FINALIZE_LOOKBACK_DAYS: 31,
  LOG_LIMIT: 120,
  XP_PER_LEVEL_STEP: 100,
} as const;

export const RANKS = [
  { id: 'E', minLevel: 1, nameKey: 'ranks.E', image: ANIME_IMAGES.GOKU_KID },
  { id: 'D', minLevel: 5, nameKey: 'ranks.D', image: ANIME_IMAGES.LUFFY_SHANKS },
  { id: 'C', minLevel: 10, nameKey: 'ranks.C', image: ANIME_IMAGES.NARUTO },
  { id: 'B', minLevel: 20, nameKey: 'ranks.B', image: ANIME_IMAGES.ZORO_DRAGON },
  { id: 'A', minLevel: 35, nameKey: 'ranks.A', image: ANIME_IMAGES.ITACHI },
  { id: 'S', minLevel: 50, nameKey: 'ranks.S', image: ANIME_IMAGES.SOLO_LEVELING },
] as const;

export const QUEST_CONSTANTS = {
  TITLE: 'quests.title',
  SUBTITLE: 'quests.subtitle',
  DAILY: 'quests.daily',
  EVALUATED: 'quests.evaluated',
  STATUS: {
    done: 'quests.status.done',
    inProgress: 'quests.status.inProgress',
    failed: 'quests.status.failed',
    locked: 'quests.status.locked',
  },
  RANKS: 'quests.ranks',
  RANK_LEVEL: 'quests.rankLevel',
  CURRENT: 'quests.current',
  LOG: 'quests.log',
  EMPTY_LOG: 'quests.emptyLog',
  XP_GAIN: 'quests.xpGain',
  XP_LOSS: 'quests.xpLoss',
  LOCKED_REASON: 'quests.lockedReason',
  RANK_LABEL: 'ranks.label',
  LEVEL_XP: 'quests.levelXp',
  LOG_LABEL: 'quests.logLabel',
} as const;
