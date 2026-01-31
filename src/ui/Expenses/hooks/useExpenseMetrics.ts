import { TExpense, TTimePeriod } from "@/src/types/Expense";
import { useMemo } from "react";

export function useExpenseMetrics(
  expenses: TExpense[],
  timePeriod: TTimePeriod,
) {
  const filteredExpenses = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return expenses.filter((expense) => {
      const date = new Date(expense.date);

      switch (timePeriod) {
        case "today":
          return expense.date === now.toISOString().split("T")[0];
        case "yesterday": {
          const y = new Date(now);
          y.setDate(y.getDate() - 1);
          return expense.date === y.toISOString().split("T")[0];
        }
        case "thisWeek": {
          const d = new Date(now);
          d.setDate(now.getDate() - now.getDay());
          return date >= d;
        }
        case "thisMonth":
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        case "lastMonth": {
          const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return (
            date.getMonth() === lm.getMonth() &&
            date.getFullYear() === lm.getFullYear()
          );
        }
        case "last3Months": {
          const d = new Date(now);
          d.setMonth(now.getMonth() - 3);
          return date >= d;
        }
        case "thisYear":
          return date.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  }, [timePeriod, expenses]);

  const metrics = useMemo(() => {
    const totalSpent = filteredExpenses.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const totalTransactions = filteredExpenses.length;

    let divisor = 1;
    const now = new Date();
    if (totalSpent > 0) {
      if (timePeriod === "thisMonth") divisor = now.getDate();
      else if (timePeriod === "thisWeek") divisor = now.getDay() + 1;
      else if (timePeriod === "thisYear") {
        const start = new Date(now.getFullYear(), 0, 0);
        divisor = Math.floor((now.getTime() - start.getTime()) / 86400000);
      }
    }

    return {
      totalSpent,
      totalTransactions,
      averageDaily: totalSpent / (divisor || 1),
    };
  }, [filteredExpenses, timePeriod]);

  return { filteredExpenses, ...metrics };
}
