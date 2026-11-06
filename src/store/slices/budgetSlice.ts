import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types';
import { BUDGET_RULES } from '../../constants/budget';

export interface BudgetState {
  monthlyBudget: number;
  nightHour: number;
  nightMinute: number;
  nightReminderEnabled: boolean;
  expenses: Expense[];
}

const initialState: BudgetState = {
  monthlyBudget: 0,
  nightHour: BUDGET_RULES.NIGHT_HOUR,
  nightMinute: BUDGET_RULES.NIGHT_MINUTE,
  nightReminderEnabled: true,
  expenses: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    hydrateBudget: (state, action: PayloadAction<Partial<BudgetState> | null>) => ({
      ...state,
      ...(action.payload ?? {}),
      expenses: action.payload?.expenses ?? state.expenses,
    }),
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    },
    setNightReminder: (state, action: PayloadAction<{ hour: number; minute: number; enabled: boolean }>) => {
      state.nightHour = action.payload.hour;
      state.nightMinute = action.payload.minute;
      state.nightReminderEnabled = action.payload.enabled;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses = [action.payload, ...(state.expenses ?? [])];
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses?.filter((item: Expense) => item?.id !== action.payload) ?? [];
    },
  },
});

export const { hydrateBudget, setMonthlyBudget, setNightReminder, addExpense, removeExpense } = budgetSlice.actions;

export default budgetSlice.reducer;
