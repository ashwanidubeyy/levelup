export interface Challenge {
  id: string;
  title: string;
  startDay: string;
  days: number;
  reminderHour: number;
  reminderMinute: number;
  reminderEnabled: boolean;
  checkIns: string[];
  completedAt: number | null;
  createdAt: number;
}
