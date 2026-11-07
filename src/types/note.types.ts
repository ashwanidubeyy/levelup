export interface Note {
  id: string;
  title: string;
  description: string;
  day: string;
  createdAt: number;
  updatedAt: number;
}

export interface NoteFormValues {
  title: string;
  description: string;
  day: string;
}

export interface NoteFormErrors {
  title?: string;
  description?: string;
}
