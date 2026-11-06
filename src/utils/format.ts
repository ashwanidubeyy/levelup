import type { TFunction } from 'i18next';
import { COMMON_CONSTANTS } from '../constants/common';
import { HOME_CONSTANTS } from '../constants/screens';
import { PENALTY_QUEST, QUEST_CONSTANTS } from '../constants/quests';
import type { QuestCardProps, QuestProgress, TrackedAppId } from '../types';
import { splitDuration } from './date';

export const formatDuration = (ms: number, t: TFunction): string => {
  const { hours, minutes } = splitDuration(ms);
  return hours > 0
    ? t(COMMON_CONSTANTS.UNITS.HOURS_MINUTES, { hours, minutes })
    : t(COMMON_CONSTANTS.UNITS.MINUTES, { minutes });
};

export const appLabel = (app: TrackedAppId | null | undefined, t: TFunction): string =>
  app ? t(COMMON_CONSTANTS.APPS[app]) : t(COMMON_CONSTANTS.DASH);

export const appShortLabel = (app: TrackedAppId | null | undefined, t: TFunction): string =>
  app ? t(COMMON_CONSTANTS.APPS_SHORT[app]) : t(COMMON_CONSTANTS.DASH);

export const xpLabel = (xp: number, t: TFunction): string =>
  xp >= 0 ? t(QUEST_CONSTANTS.XP_GAIN, { xp }) : t(QUEST_CONSTANTS.XP_LOSS, { xp });

export const toQuestCardProps = (
  quest: QuestProgress,
  dailyLimit: number,
  t: TFunction,
): Omit<QuestCardProps, 'image'> => ({
  title: t(quest?.titleKey),
  description: t(quest?.descriptionKey, {
    limit: dailyLimit,
    half: Math.floor(dailyLimit / 2),
    xp: Math.abs(PENALTY_QUEST.xp),
  }),
  xpLabel: xpLabel(quest?.xp ?? 0, t),
  statusLabel: t(QUEST_CONSTANTS.STATUS[quest?.status]),
  status: quest?.status,
  negative: (quest?.xp ?? 0) < 0,
});

export const limitMessage = (total: number, limit: number, t: TFunction): string => {
  if (total < limit) {
    return t(HOME_CONSTANTS.REMAINING, { count: limit - total });
  }
  return total === limit
    ? t(HOME_CONSTANTS.AT_LIMIT)
    : t(HOME_CONSTANTS.OVER_LIMIT, { count: total - limit });
};
