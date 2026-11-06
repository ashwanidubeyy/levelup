import type { JournalEntry, JournalFormValues } from '../types';
import { generateId } from '../utils/helpers';
import { toDayKey } from '../utils/date';

const createEntry = (values: JournalFormValues): JournalEntry => {
  const now = Date.now();
  return {
    id: generateId(),
    day: toDayKey(new Date(now)),
    title: values?.title?.trim() ?? '',
    body: values?.body?.trim() ?? '',
    mood: values?.mood,
    createdAt: now,
    updatedAt: now,
  };
};

const updateEntry = (entry: JournalEntry, values: JournalFormValues): JournalEntry => ({
  ...entry,
  title: values?.title?.trim() ?? '',
  body: values?.body?.trim() ?? '',
  mood: values?.mood,
  updatedAt: Date.now(),
});

const sortEntries = (entries: JournalEntry[]): JournalEntry[] =>
  [...(entries ?? [])].sort((a: JournalEntry, b: JournalEntry) => b?.createdAt - a?.createdAt);

const hasEntryOn = (entries: JournalEntry[], day: string): boolean =>
  entries?.some((entry: JournalEntry) => entry?.day === day) ?? false;

const journalService = { createEntry, updateEntry, sortEntries, hasEntryOn };

export default journalService;
