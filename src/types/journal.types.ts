export type MoodValue = 'radiant' | 'focused' | 'neutral' | 'drained' | 'defeated';

export interface JournalEntry {
  id: string;
  day: string;
  title: string;
  body: string;
  mood: MoodValue;
  createdAt: number;
  updatedAt: number;
}

export interface JournalFormValues {
  title: string;
  body: string;
  mood: MoodValue;
}

export interface JournalFormErrors {
  body?: string;
}
