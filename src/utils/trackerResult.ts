import type { TrackerResult } from '../types';

export const resultData = <T>(result: TrackerResult<T> | null | undefined): T | null => {
  if (result?.status === 'ok') {
    return result.data;
  }
  if (result?.status === 'permissionRequired') {
    return result.data ?? null;
  }
  return null;
};

export const resultReason = <T>(result: TrackerResult<T> | null | undefined): string | null =>
  result && result.status !== 'ok' && 'reason' in result ? result.reason : null;

export const isPermissionRequired = <T>(result: TrackerResult<T> | null | undefined): boolean =>
  result?.status === 'permissionRequired';
