import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JournalEntry } from '../../types';
import journalService from '../../services/journal.service';

export interface JournalState {
  entries: JournalEntry[];
}

const initialState: JournalState = { entries: [] };

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    hydrateJournal: (state, action: PayloadAction<JournalEntry[] | null>) => {
      state.entries = journalService.sortEntries(action.payload ?? []);
    },
    upsertEntry: (state, action: PayloadAction<JournalEntry>) => {
      const others = state.entries.filter((entry: JournalEntry) => entry?.id !== action.payload?.id);
      state.entries = journalService.sortEntries([...others, action.payload]);
    },
    removeEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((entry: JournalEntry) => entry?.id !== action.payload);
    },
  },
});

export const { hydrateJournal, upsertEntry, removeEntry } = journalSlice.actions;

export default journalSlice.reducer;
