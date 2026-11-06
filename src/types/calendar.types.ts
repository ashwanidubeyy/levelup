export interface IndiaCalendarEvent {
  id: string;
  day: string;
  nameKey: string;
}

export type AgendaKind = 'holiday' | 'reminder';

export interface AgendaItem {
  id: string;
  day: string;
  kind: AgendaKind;
  title: string;
  titleKey: string;
  at: number;
}
