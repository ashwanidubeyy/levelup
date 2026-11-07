import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { hydrateSettings, setInstallDay } from '../store/slices/settingsSlice';
import { hydrateJournal } from '../store/slices/journalSlice';
import { hydrateQuests } from '../store/slices/questSlice';
import { hydrateChallenges } from '../store/slices/challengeSlice';
import { hydrateReminders } from '../store/slices/reminderSlice';
import { hydrateBudget } from '../store/slices/budgetSlice';
import { hydrateFocus } from '../store/slices/focusSlice';
import { hydrateTodos } from '../store/slices/todoSlice';
import { hydrateNotes } from '../store/slices/notesSlice';
import { hydrateCalculator } from '../store/slices/calculatorSlice';
import { fetchCapabilities, fetchToday } from '../store/slices/trackerSlice';
import storageService from '../services/storage.service';
import trackerService from '../services/tracker.service';
import { STORAGE_KEYS, TIME } from '../constants/common';
import type { AppSettings, JournalEntry } from '../types';
import type { QuestState } from '../store/slices/questSlice';
import type { ChallengeState } from '../store/slices/challengeSlice';
import type { ReminderState } from '../store/slices/reminderSlice';
import type { BudgetState } from '../store/slices/budgetSlice';
import type { FocusState } from '../store/slices/focusSlice';
import type { TodoState } from '../store/slices/todoSlice';
import type { Note, CalculatorEntry } from '../types';
import { store } from '../store';
import { todayKey } from '../utils/date';

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const hydrate = () =>
  Promise.all([
    storageService.readJson<Partial<AppSettings>>(STORAGE_KEYS.SETTINGS),
    storageService.readJson<JournalEntry[]>(STORAGE_KEYS.JOURNAL),
    storageService.readJson<Partial<QuestState>>(STORAGE_KEYS.QUESTS),
    storageService.readJson<ChallengeState>(STORAGE_KEYS.CHALLENGES),
    storageService.readJson<ReminderState>(STORAGE_KEYS.REMINDERS),
    storageService.readJson<Partial<BudgetState>>(STORAGE_KEYS.BUDGET),
    storageService.readJson<FocusState>(STORAGE_KEYS.FOCUS),
    storageService.readJson<Partial<TodoState>>(STORAGE_KEYS.TODOS),
    storageService.readJson<Note[]>(STORAGE_KEYS.NOTES),
    storageService.readJson<CalculatorEntry[]>(STORAGE_KEYS.CALCULATOR),
  ]);

export const useAppInit = () => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const boot = hydrate()
      .then(([settings, journal, quests, challenges, reminders, budget, focus, todos, notes, calculator]) => {
        dispatch(hydrateSettings(settings));
        dispatch(hydrateJournal(journal));
        dispatch(hydrateQuests(quests));
        dispatch(hydrateChallenges(challenges));
        dispatch(hydrateReminders(reminders));
        dispatch(hydrateBudget(budget));
        dispatch(hydrateFocus(focus));
        dispatch(hydrateTodos(todos));
        dispatch(hydrateNotes(notes));
        dispatch(hydrateCalculator(calculator));
        dispatch(setInstallDay(todayKey()));
        return trackerService.syncSettingsToNative(store.getState().settings);
      })
      .then(() => dispatch(fetchCapabilities()).unwrap())
      .then(() => {
        dispatch(fetchToday());
      })
      .catch(() => null);

    Promise.all([boot, wait(TIME.SPLASH_MIN_MS)]).then(() => {
      setOnboardingComplete(store.getState().settings.onboardingComplete);
      setReady(true);
    });
  }, [dispatch]);

  return { ready, onboardingComplete };
};
