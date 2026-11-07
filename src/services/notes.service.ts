import type { Note, NoteFormValues } from '../types';
import { generateId } from '../utils/helpers';

const createNote = (values: NoteFormValues): Note => {
  const now = Date.now();
  return {
    id: generateId(),
    title: values?.title?.trim() ?? '',
    description: values?.description?.trim() ?? '',
    day: values?.day,
    createdAt: now,
    updatedAt: now,
  };
};

const updateNote = (note: Note, values: NoteFormValues): Note => ({
  ...note,
  title: values?.title?.trim() ?? '',
  description: values?.description?.trim() ?? '',
  day: values?.day,
  updatedAt: Date.now(),
});

const sortNotes = (notes: Note[]): Note[] =>
  [...(notes ?? [])].sort((a: Note, b: Note) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));

const notesService = { createNote, updateNote, sortNotes };

export default notesService;
