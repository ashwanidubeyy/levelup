export type ReminderRepeat = 'once' | 'daily';

export interface Reminder {
  id: string;
  title: string;
  day: string;
  hour: number;
  minute: number;
  repeat: ReminderRepeat;
  createdAt: number;
}
