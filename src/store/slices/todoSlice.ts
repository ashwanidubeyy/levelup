import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodoItem } from '../../types';
import { PLANNER_RULES } from '../../constants/planner';

export interface TodoState {
  items: TodoItem[];
  reminderEnabled: boolean;
  reminderHour: number;
  reminderMinute: number;
}

const initialState: TodoState = {
  items: [],
  reminderEnabled: true,
  reminderHour: PLANNER_RULES.REMINDER_HOUR,
  reminderMinute: PLANNER_RULES.REMINDER_MINUTE,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    hydrateTodos: (state, action: PayloadAction<Partial<TodoState> | null>) => ({
      ...state,
      ...(action.payload ?? {}),
      items: action.payload?.items ?? [],
    }),
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.items = [action.payload, ...(state.items ?? [])];
    },
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      state.items =
        state.items?.map((item: TodoItem) => (item?.id === action.payload?.id ? action.payload : item)) ?? [];
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items?.filter((item: TodoItem) => item?.id !== action.payload) ?? [];
    },
    clearDayTodos: (state, action: PayloadAction<string>) => {
      state.items = state.items?.filter((item: TodoItem) => item?.day !== action.payload) ?? [];
    },
    setPlannerReminder: (
      state,
      action: PayloadAction<{ hour: number; minute: number; enabled: boolean }>,
    ) => {
      state.reminderEnabled = action.payload.enabled;
      state.reminderHour = action.payload.hour;
      state.reminderMinute = action.payload.minute;
    },
  },
});

export const { hydrateTodos, addTodo, updateTodo, removeTodo, clearDayTodos, setPlannerReminder } = todoSlice.actions;

export default todoSlice.reducer;
