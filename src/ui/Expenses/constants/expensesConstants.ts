import localization from "@/src/lib/localization.json";
import { IExpenseCategory, TTimePeriod } from "@/src/types/Expense";
import { TrendingDown } from "lucide-react";

export const expensesCategories: IExpenseCategory[] = [
  {
    name: localization.expenses.categoryLabels.food,
    value: "food",
    color: "bg-blue-500",
  },
  {
    name: localization.expenses.categoryLabels.transport,
    value: "transport",
    color: "bg-green-500",
  },
  {
    name: localization.expenses.categoryLabels.shopping,
    value: "shopping",
    color: "bg-purple-500",
  },
  {
    name: localization.expenses.categoryLabels.entertainment,
    value: "entertainment",
    color: "bg-pink-500",
  },
  {
    name: localization.expenses.categoryLabels.health,
    value: "health",
    color: "bg-red-500",
  },
  {
    name: localization.expenses.categoryLabels.bills,
    value: "bills",
    color: "bg-yellow-500",
  },
  {
    name: localization.expenses.categoryLabels.misc,
    value: "misc",
    color: "bg-gray-500",
  },
];

export const statsConfig = (
  totalSpent: number,
  averageDaily: number,
  totalTransactions: number,
  timePeriod: TTimePeriod,
) => [
  {
    title: localization.expenses.totalSpent,
    value: `${localization.common.currency}${totalSpent.toFixed(2)}`,
    icon: TrendingDown,
    description: `For ${localization.expenses.periods[timePeriod].toLowerCase()}`,
  },
  {
    title: localization.expenses.averageDaily,
    value: `${localization.common.currency}${averageDaily.toFixed(2)}`,
    description: "Daily average (Est.)",
  },
  {
    title: localization.expenses.budgetRemaining,
    value: `${localization.common.currency}0.00`,
    description: "No budget set",
  },
  {
    title: "Transactions",
    value: totalTransactions,
    description: "Total transactions",
  },
];
