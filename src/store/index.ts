import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import settingsReducer from './slices/settingsSlice';
import trackerReducer from './slices/trackerSlice';
import journalReducer from './slices/journalSlice';
import questReducer from './slices/questSlice';
import challengeReducer from './slices/challengeSlice';
import reminderReducer from './slices/reminderSlice';
import budgetReducer from './slices/budgetSlice';
import focusReducer from './slices/focusSlice';
import storageService from '../services/storage.service';
import { STORAGE_KEYS, TIME } from '../constants/common';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    tracker: trackerReducer,
    journal: journalReducer,
    quests: questReducer,
    challenges: challengeReducer,
    reminders: reminderReducer,
    budget: budgetReducer,
    focus: focusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

let persistTimer: ReturnType<typeof setTimeout> | null = null;
let lastSnapshot: Pick<RootState, 'settings' | 'journal' | 'quests' | 'challenges' | 'reminders' | 'budget' | 'focus'> | null =
  null;

const persist = () => {
  const state = store.getState();
  if (!state?.settings?.hydrated) {
    return;
  }
  if (lastSnapshot?.settings !== state.settings) {
    storageService.writeJson(STORAGE_KEYS.SETTINGS, state.settings);
  }
  if (lastSnapshot?.journal !== state.journal) {
    storageService.writeJson(STORAGE_KEYS.JOURNAL, state.journal?.entries ?? []);
  }
  if (lastSnapshot?.quests !== state.quests) {
    storageService.writeJson(STORAGE_KEYS.QUESTS, state.quests);
  }
  if (lastSnapshot?.challenges !== state.challenges) {
    storageService.writeJson(STORAGE_KEYS.CHALLENGES, state.challenges);
  }
  if (lastSnapshot?.reminders !== state.reminders) {
    storageService.writeJson(STORAGE_KEYS.REMINDERS, state.reminders);
  }
  if (lastSnapshot?.budget !== state.budget) {
    storageService.writeJson(STORAGE_KEYS.BUDGET, state.budget);
  }
  if (lastSnapshot?.focus !== state.focus) {
    storageService.writeJson(STORAGE_KEYS.FOCUS, state.focus);
  }
  lastSnapshot = {
    settings: state.settings,
    journal: state.journal,
    quests: state.quests,
    challenges: state.challenges,
    reminders: state.reminders,
    budget: state.budget,
    focus: state.focus,
  };
};

store.subscribe(() => {
  if (persistTimer) {
    clearTimeout(persistTimer);
  }
  persistTimer = setTimeout(persist, TIME.PERSIST_DEBOUNCE_MS);
});
