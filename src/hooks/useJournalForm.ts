import { useCallback, useState } from 'react';
import type { JournalEntry, JournalFormErrors, JournalFormValues } from '../types';
import { JOURNAL_CONSTANTS } from '../constants/journal';

const toValues = (entry: JournalEntry | null | undefined): JournalFormValues => ({
  body: entry?.body ?? '',
  startedAt: entry?.createdAt ?? null,
});

export const useJournalForm = (entry: JournalEntry | null | undefined) => {
  const [values, setValues] = useState<JournalFormValues>(() => toValues(entry));
  const [errors, setErrors] = useState<JournalFormErrors>({});

  const setBody = useCallback((body: string) => {
    setValues(prev => ({
      ...prev,
      body,
      startedAt: prev.startedAt ?? (body.trim().length > 0 ? Date.now() : null),
    }));
    setErrors({});
  }, []);

  const validate = useCallback((): boolean => {
    const nextErrors: JournalFormErrors = {};
    if (!values?.body?.trim()) {
      nextErrors.body = JOURNAL_CONSTANTS.FORMS.VALIDATION.BODY_REQUIRED;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  return { values, errors, setBody, validate };
};
