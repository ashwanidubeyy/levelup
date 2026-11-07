import type { TodoItem } from '../types';

export const todosForDay = (items: TodoItem[], day: string): TodoItem[] =>
  items?.filter((item: TodoItem) => item?.day === day) ?? [];

export const openTodosForDay = (items: TodoItem[], day: string): TodoItem[] =>
  todosForDay(items, day)?.filter((item: TodoItem) => !item?.done) ?? [];

export const doneCountForDay = (items: TodoItem[], day: string): number =>
  todosForDay(items, day)?.filter((item: TodoItem) => item?.done)?.length ?? 0;
