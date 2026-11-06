import { useCallback, useState } from 'react';
import type { JournalEntry, JournalFormErrors, JournalFormValues, MoodValue } from '../types';
import { JOURNAL_CONSTANTS } from '../constants/journal';

const toValues = (entry: JournalEntry | null | undefined): JournalFormValues => ({
  title: entry?.title ?? '',
  body: entry?.body ?? '',
  mood: entry?.mood ?? JOURNAL_CONSTANTS.DEFAULT_MOOD,
});

export const useJournalForm = (entry: JournalEntry | null | undefined) => {
  const [values, setValues] = useState<JournalFormValues>(() => toValues(entry));
  const [errors, setErrors] = useState<JournalFormErrors>({});

  const setTitle = useCallback((title: string) => setValues(prev => ({ ...prev, title })), []);

  const setBody = useCallback((body: string) => {
    setValues(prev => ({ ...prev, body }));
    setErrors({});
  }, []);

  const setMood = useCallback((mood: string) => setValues(prev => ({ ...prev, mood: mood as MoodValue })), []);

  const validate = useCallback((): boolean => {
    const nextErrors: JournalFormErrors = {};
    if (!values?.body?.trim()) {
      nextErrors.body = JOURNAL_CONSTANTS.FORMS.VALIDATION.BODY_REQUIRED;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  return { values, errors, setTitle, setBody, setMood, validate };
};
