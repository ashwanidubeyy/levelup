import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { XpLogEntry } from '../../types';
import { QUEST_RULES } from '../../constants/quests';

export interface QuestState {
  xp: number;
  log: XpLogEntry[];
  finalizedThrough: string | null;
  journalAwardedDays: string[];
}

const initialState: QuestState = {
  xp: 0,
  log: [],
  finalizedThrough: null,
  journalAwardedDays: [],
};

const applyEntries = (state: QuestState, entries: XpLogEntry[]) => {
  entries?.forEach((entry: XpLogEntry) => {
    state.xp = Math.max(0, state.xp + (entry?.xp ?? 0));
  });
  state.log = [...(entries ?? []), ...state.log].slice(0, QUEST_RULES.LOG_LIMIT);
};

const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    hydrateQuests: (state, action: PayloadAction<Partial<QuestState> | null>) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    applyFinalization: (
      state,
      action: PayloadAction<{ entries: XpLogEntry[]; finalizedThrough: string | null }>,
    ) => {
      applyEntries(state, action.payload?.entries ?? []);
      state.finalizedThrough = action.payload?.finalizedThrough ?? state.finalizedThrough;
    },
    awardJournal: (state, action: PayloadAction<XpLogEntry>) => {
      if (state.journalAwardedDays.includes(action.payload?.day)) {
        return;
      }
      state.journalAwardedDays = [action.payload.day, ...state.journalAwardedDays].slice(
        0,
        QUEST_RULES.LOG_LIMIT,
      );
      applyEntries(state, [action.payload]);
    },
  },
});

export const { hydrateQuests, applyFinalization, awardJournal } = questSlice.actions;

export default questSlice.reducer;
