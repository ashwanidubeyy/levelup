import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { hydrateSettings, setInstallDay } from '../store/slices/settingsSlice';
import { hydrateJournal } from '../store/slices/journalSlice';
import { applyFinalization, hydrateQuests } from '../store/slices/questSlice';
import { fetchCapabilities, fetchToday } from '../store/slices/trackerSlice';
import storageService from '../services/storage.service';
import trackerService from '../services/tracker.service';
import questService from '../services/quest.service';
import { STORAGE_KEYS, TIME } from '../constants/common';
import type { AppSettings, JournalEntry, TrackingCapabilities } from '../types';
import type { QuestState } from '../store/slices/questSlice';
import { store } from '../store';
import { todayKey } from '../utils/date';

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const hydrate = () =>
  Promise.all([
    storageService.readJson<Partial<AppSettings>>(STORAGE_KEYS.SETTINGS),
    storageService.readJson<JournalEntry[]>(STORAGE_KEYS.JOURNAL),
    storageService.readJson<Partial<QuestState>>(STORAGE_KEYS.QUESTS),
  ]);

export const useAppInit = () => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const boot = hydrate()
      .then(([settings, journal, quests]) => {
        dispatch(hydrateSettings(settings));
        dispatch(hydrateJournal(journal));
        dispatch(hydrateQuests(quests));
        dispatch(setInstallDay(todayKey()));
        return trackerService.syncSettingsToNative(store.getState().settings);
      })
      .then(() => dispatch(fetchCapabilities()).unwrap())
      .then((caps: TrackingCapabilities) => {
        dispatch(fetchToday());
        const state = store.getState();
        return questService
          .finalizePastDays({
            installDay: state.settings.installDay,
            finalizedThrough: state.quests.finalizedThrough,
            dailyLimit: state.settings.dailyLimit,
            trackingAvailable: caps?.platform === 'android' && caps?.reelCounting !== 'unsupported',
          })
          .then(result => dispatch(applyFinalization(result)));
      })
      .catch(() => null);

    Promise.all([boot, wait(TIME.SPLASH_MIN_MS)]).then(() => {
      setOnboardingComplete(store.getState().settings.onboardingComplete);
      setReady(true);
    });
  }, [dispatch]);

  return { ready, onboardingComplete };
};
