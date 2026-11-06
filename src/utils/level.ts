import { QUEST_RULES, RANKS } from '../constants/quests';
import type { LevelInfo, RankId } from '../types';

export const totalXpForLevel = (level: number): number =>
  (QUEST_RULES.XP_PER_LEVEL_STEP * (level - 1) * level) / 2;

export const levelFromXp = (xp: number): number => {
  let level = 1;
  while (totalXpForLevel(level + 1) <= Math.max(0, xp)) {
    level += 1;
  }
  return level;
};

export const rankForLevel = (level: number) => {
  let current: (typeof RANKS)[number] = RANKS[0];
  RANKS.forEach((rank: (typeof RANKS)[number]) => {
    if (level >= rank.minLevel) {
      current = rank;
    }
  });
  return current;
};

export const buildLevelInfo = (xp: number): LevelInfo => {
  const safeXp = Math.max(0, xp);
  const level = levelFromXp(safeXp);
  const floor = totalXpForLevel(level);
  const ceiling = totalXpForLevel(level + 1);
  const rank = rankForLevel(level);
  return {
    level,
    currentXp: safeXp - floor,
    nextLevelXp: ceiling - floor,
    progress: ceiling > floor ? (safeXp - floor) / (ceiling - floor) : 0,
    rank: rank.id as RankId,
    rankNameKey: rank.nameKey,
    rankImage: rank.image,
  };
};
