export type BudgetCategoryId =
  | 'food'
  | 'transport'
  | 'bills'
  | 'shopping'
  | 'health'
  | 'entertainment'
  | 'other';

export interface Expense {
  id: string;
  day: string;
  amount: number;
  note: string;
  categoryId: BudgetCategoryId;
  createdAt: number;
}
