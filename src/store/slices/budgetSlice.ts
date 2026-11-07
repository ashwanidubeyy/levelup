import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types';
import { BUDGET_CATEGORY_DEFAULT, BUDGET_RULES } from '../../constants/budget';

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
      expenses:
        action.payload?.expenses?.map((item: Expense) => ({
          ...item,
          categoryId: item?.categoryId ?? BUDGET_CATEGORY_DEFAULT,
        })) ?? state.expenses,
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
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const list = state.expenses ?? [];
      const next = list.map((item: Expense) => (item?.id === action.payload?.id ? action.payload : item));
      state.expenses = next;
    },
    clearMonthExpenses: (state, action: PayloadAction<string>) => {
      const prefix = action.payload ?? '';
      state.expenses = state.expenses?.filter((item: Expense) => !item?.day?.startsWith(prefix)) ?? [];
    },
  },
});

export const { hydrateBudget, setMonthlyBudget, setNightReminder, addExpense, removeExpense, updateExpense, clearMonthExpenses } =
  budgetSlice.actions;

export default budgetSlice.reducer;
