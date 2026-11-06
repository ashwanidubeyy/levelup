import type { ImageSourcePropType } from 'react-native';

export type QuestId = 'discipline' | 'restraint' | 'morning' | 'journal' | 'penalty';

export type QuestStatus = 'done' | 'inProgress' | 'failed' | 'locked';

export type RankId = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface XpLogEntry {
  id: string;
  day: string;
  questId: string;
  xp: number;
  at: number;
}

export interface QuestProgress {
  id: QuestId;
  titleKey: string;
  descriptionKey: string;
  xp: number;
  status: QuestStatus;
  image: ImageSourcePropType;
}

export interface LevelInfo {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progress: number;
  rank: RankId;
  rankNameKey: string;
  rankImage: ImageSourcePropType;
}

export interface DayQuestInput {
  day: string;
  total: number | null;
  serviceActive: boolean;
  firstItemAt: number | null;
  hasJournalEntry: boolean;
  dailyLimit: number;
  trackingAvailable: boolean;
  isFinal: boolean;
}
