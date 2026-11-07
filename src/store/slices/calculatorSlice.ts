import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CalculatorEntry } from '../../types';

export interface CalculatorState {
  entries: CalculatorEntry[];
}

const HISTORY_LIMIT = 50;

const initialState: CalculatorState = {
  entries: [],
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    hydrateCalculator: (state, action: PayloadAction<CalculatorEntry[] | null>) => {
      state.entries = action.payload ?? [];
    },
    addCalculatorEntry: (state, action: PayloadAction<CalculatorEntry>) => {
      state.entries = [action.payload, ...(state.entries ?? [])].slice(0, HISTORY_LIMIT);
    },
    removeCalculatorEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries?.filter((item: CalculatorEntry) => item?.id !== action.payload) ?? [];
    },
  },
});

export const { hydrateCalculator, addCalculatorEntry, removeCalculatorEntry } = calculatorSlice.actions;

export default calculatorSlice.reducer;
