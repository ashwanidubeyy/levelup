import type { XpLogEntry } from '../types';
import { CHALLENGE_CONSTANTS, XP_SOURCES } from '../constants/challenges';
import { QUEST_TITLE_KEYS } from '../constants/quests';
import { generateId } from './helpers';

export const makeXp = (day: string, source: string, xp: number): XpLogEntry => ({
  id: generateId(),
  day,
  questId: source,
  xp,
  at: Date.now(),
});

export const xpSourceKey = (source: string): string => {
  if (source === XP_SOURCES.CHECK_IN) {
    return CHALLENGE_CONSTANTS.XP.CHECK_IN;
  }
  if (source === XP_SOURCES.COMPLETE) {
    return CHALLENGE_CONSTANTS.XP.COMPLETE;
  }
  if (source === XP_SOURCES.FOCUS) {
    return CHALLENGE_CONSTANTS.XP.FOCUS;
  }
  if (source === XP_SOURCES.JOURNAL) {
    return CHALLENGE_CONSTANTS.XP.JOURNAL;
  }
  return QUEST_TITLE_KEYS[source] ?? CHALLENGE_CONSTANTS.XP.GENERIC;
};
