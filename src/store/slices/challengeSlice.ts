import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Challenge } from '../../types';

export interface ChallengeState {
  items: Challenge[];
}

const initialState: ChallengeState = { items: [] };

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    hydrateChallenges: (state, action: PayloadAction<ChallengeState | null>) => ({
      ...state,
      ...(action.payload ?? {}),
      items: action.payload?.items ?? state.items,
    }),
    addChallenge: (state, action: PayloadAction<Challenge>) => {
      state.items = [action.payload, ...(state.items ?? [])];
    },
    checkInChallenge: (state, action: PayloadAction<{ id: string; day: string }>) => {
      const challenge = state.items?.find((item: Challenge) => item?.id === action.payload?.id);
      if (!challenge || challenge.checkIns?.includes(action.payload?.day)) {
        return;
      }
      challenge.checkIns = [...(challenge.checkIns ?? []), action.payload.day];
      if (challenge.checkIns.length >= challenge.days) {
        challenge.completedAt = Date.now();
      }
    },
    removeChallenge: (state, action: PayloadAction<string>) => {
      state.items = state.items?.filter((item: Challenge) => item?.id !== action.payload) ?? [];
    },
  },
});

export const { hydrateChallenges, addChallenge, checkInChallenge, removeChallenge } = challengeSlice.actions;

export default challengeSlice.reducer;
