import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ActiveFocus, FocusLog } from '../../types';

export interface FocusState {
  logs: FocusLog[];
  active: ActiveFocus | null;
}

const initialState: FocusState = { logs: [], active: null };

const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    hydrateFocus: (state, action: PayloadAction<FocusState | null>) => ({
      logs: action.payload?.logs ?? [],
      active: action.payload?.active ?? null,
    }),
    setActiveFocus: (state, action: PayloadAction<ActiveFocus>) => {
      state.active = action.payload;
    },
    clearActiveFocus: state => {
      state.active = null;
    },
    addFocusLog: (state, action: PayloadAction<FocusLog>) => {
      state.logs = [action.payload, ...(state.logs ?? [])].slice(0, 60);
      state.active = null;
    },
  },
});

export const { hydrateFocus, setActiveFocus, clearActiveFocus, addFocusLog } = focusSlice.actions;

export default focusSlice.reducer;
