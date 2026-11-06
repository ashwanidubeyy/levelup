import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Reminder } from '../../types';

export interface ReminderState {
  items: Reminder[];
}

const initialState: ReminderState = { items: [] };

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    hydrateReminders: (state, action: PayloadAction<ReminderState | null>) => ({
      ...state,
      ...(action.payload ?? {}),
      items: action.payload?.items ?? [],
    }),
    addReminder: (state, action: PayloadAction<Reminder>) => {
      state.items = [action.payload, ...(state.items ?? [])];
    },
    removeReminder: (state, action: PayloadAction<string>) => {
      state.items = state.items?.filter((item: Reminder) => item?.id !== action.payload) ?? [];
    },
  },
});

export const { hydrateReminders, addReminder, removeReminder } = reminderSlice.actions;

export default reminderSlice.reducer;
