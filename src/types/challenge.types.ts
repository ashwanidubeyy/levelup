export interface Challenge {
  id: string;
  title: string;
  startDay: string;
  days: number;
  reminderHour: number;
  reminderMinute: number;
  reminderEnabled: boolean;
  checkIns: string[];
  reward?: string;
  completedAt: number | null;
  createdAt: number;
}
