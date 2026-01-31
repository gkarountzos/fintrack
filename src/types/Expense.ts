export type TExpense = {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
};

export type TTimePeriod =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

export interface IExpenseCategory {
  name: string;
  value: string;
  color: string;
}
