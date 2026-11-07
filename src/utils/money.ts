import type { BudgetCategoryId, Expense } from '../types';

export const monthKeyFromDay = (day: string): string => day?.slice(0, 7) ?? '';

export const formatAmount = (amount: number): string => {
  const safe = Number.isFinite(amount) ? amount : 0;
  const rounded = Math.round(safe * 100) / 100;
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2);
};

export const parseAmount = (value: string): number => {
  const normalized = value?.replace(/[^0-9.]/g, '') ?? '';
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
};

export const expensesForMonth = (expenses: Expense[], monthKey: string): Expense[] =>
  expenses?.filter((expense: Expense) => expense?.day?.startsWith(monthKey)) ?? [];

export const expensesForDay = (expenses: Expense[], day: string): Expense[] =>
  expenses?.filter((expense: Expense) => expense?.day === day) ?? [];

export const sumExpenses = (expenses: Expense[]): number =>
  expenses?.reduce((total: number, expense: Expense) => total + (expense?.amount ?? 0), 0) ?? 0;

export const sumExpensesByCategory = (
  expenses: Expense[],
): Array<{ categoryId: BudgetCategoryId; amount: number }> => {
  const totals = new Map<BudgetCategoryId, number>();
  expenses?.forEach((expense: Expense) => {
    const key = expense?.categoryId ?? 'other';
    totals.set(key, (totals.get(key) ?? 0) + (expense?.amount ?? 0));
  });
  return Array.from(totals.entries())
    .map(([categoryId, amount]: [BudgetCategoryId, number]) => ({ categoryId, amount }))
    .sort((left, right) => right.amount - left.amount);
};
