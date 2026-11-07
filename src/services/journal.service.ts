import type { JournalEntry, JournalFormValues } from '../types';
import { JOURNAL_CONSTANTS } from '../constants/journal';
import { generateId } from '../utils/helpers';
import { toDayKey } from '../utils/date';

const createEntry = (values: JournalFormValues): JournalEntry => {
  const started = values?.startedAt ?? Date.now();
  return {
    id: generateId(),
    day: toDayKey(new Date(started)),
    title: '',
    body: values?.body?.trim() ?? '',
    mood: JOURNAL_CONSTANTS.DEFAULT_MOOD,
    createdAt: started,
    updatedAt: Date.now(),
  };
};

const updateEntry = (entry: JournalEntry, values: JournalFormValues): JournalEntry => ({
  ...entry,
  body: values?.body?.trim() ?? '',
  updatedAt: Date.now(),
});

const sortEntries = (entries: JournalEntry[]): JournalEntry[] =>
  [...(entries ?? [])].sort((a: JournalEntry, b: JournalEntry) => b?.createdAt - a?.createdAt);

const hasEntryOn = (entries: JournalEntry[], day: string): boolean =>
  entries?.some((entry: JournalEntry) => entry?.day === day) ?? false;

const journalService = { createEntry, updateEntry, sortEntries, hasEntryOn };

export default journalService;
