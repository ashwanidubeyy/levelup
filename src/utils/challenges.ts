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

export const sortChallenges = (items: Challenge[]): Challenge[] =>
  [...(items ?? [])].sort((left: Challenge, right: Challenge) => {
    if (!!left?.completedAt !== !!right?.completedAt) {
      return left?.completedAt ? 1 : -1;
    }
    return compareDayKeys(right?.startDay, left?.startDay);
  });
