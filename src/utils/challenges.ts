import type { Challenge } from '../types';
import { addDays, compareDayKeys } from './date';

export const challengeEndDay = (challenge: Challenge): string => addDays(challenge?.startDay, (challenge?.days ?? 1) - 1);

export const isDayInChallenge = (challenge: Challenge, day: string): boolean =>
  compareDayKeys(day, challenge?.startDay) >= 0 && compareDayKeys(day, challengeEndDay(challenge)) <= 0;

export const canCheckIn = (challenge: Challenge, day: string): boolean =>
  !challenge?.completedAt && isDayInChallenge(challenge, day) && !challenge?.checkIns?.includes(day);

export const challengeRatio = (challenge: Challenge): number => {
  const total = challenge?.days ?? 0;
  if (total <= 0) {
    return 0;
  }
  return Math.min(challenge?.checkIns?.length ?? 0, total) / total;
};

export const activeChallenge = (items: Challenge[], day: string): Challenge | undefined => {
  const open = sortChallenges(items).filter((item: Challenge) => !item?.completedAt);
  return open.find((item: Challenge) => isDayInChallenge(item, day)) ?? open[0];
};

export const challengeStreak = (challenge: Challenge | undefined, today: string): number => {
  const days = new Set(challenge?.checkIns ?? []);
  let cursor = days.has(today) ? today : addDays(today, -1);
  if (!days.has(cursor)) {
    return 0;
  }
  let count = 0;
  while (days.has(cursor)) {
    count += 1;
    cursor = addDays(cursor, -1);
  }
  return count;
};

export const sortChallenges = (items: Challenge[]): Challenge[] =>
  [...(items ?? [])].sort((left: Challenge, right: Challenge) => {
    if (!!left?.completedAt !== !!right?.completedAt) {
      return left?.completedAt ? 1 : -1;
    }
    return compareDayKeys(right?.startDay, left?.startDay);
  });
