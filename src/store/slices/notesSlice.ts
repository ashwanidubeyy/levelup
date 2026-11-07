import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Note } from '../../types';
import notesService from '../../services/notes.service';

export interface NotesState {
  items: Note[];
}

const initialState: NotesState = {
  items: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    hydrateNotes: (state, action: PayloadAction<Note[] | null>) => {
      state.items = notesService.sortNotes(action.payload ?? []);
    },
    upsertNote: (state, action: PayloadAction<Note>) => {
      const existing = state.items?.some((item: Note) => item?.id === action.payload?.id) ?? false;
      const next = existing
        ? state.items?.map((item: Note) => (item?.id === action.payload?.id ? action.payload : item)) ?? []
        : [action.payload, ...(state.items ?? [])];
      state.items = notesService.sortNotes(next);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.items = state.items?.filter((item: Note) => item?.id !== action.payload) ?? [];
    },
  },
});

export const { hydrateNotes, upsertNote, removeNote } = notesSlice.actions;

export default notesSlice.reducer;
