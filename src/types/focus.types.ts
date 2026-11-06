export interface FocusLog {
  id: string;
  day: string;
  minutes: number;
  completedAt: number;
}

export interface ActiveFocus {
  endsAt: number;
  minutes: number;
}
