import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import localization from "@/src/lib/localization.json";
import { expensesCategories } from "@/src/ui/Expenses/constants/expensesConstants";
import { TExpense, TTimePeriod } from "@/src/types/Expense";
import { ExpensesCategoryInternalCard } from "@/src/ui/Expenses/components/ExpensesCategoryInternalCard";

interface IExpensesCategoryCardProps {
  filteredExpenses: TExpense[];
  timePeriod: TTimePeriod;
  totalSpent: number;
}

export function ExpensesCategoryCard({
  filteredExpenses,
  timePeriod,
  totalSpent,
}: IExpensesCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{localization.expenses.byCategory}</CardTitle>
        <CardDescription>
          {`${localization.expenses.breakdownFor} ${localization.expenses.periods[timePeriod].toLowerCase()}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {expensesCategories.map((category) => {
            const catTotal = filteredExpenses
              .filter((e) => e.category === category.value)
              .reduce((sum, e) => sum + e.amount, 0);

            const percent = totalSpent > 0 ? (catTotal / totalSpent) * 100 : 0;

            return (
              <ExpensesCategoryInternalCard
                key={category.value}
                category={category}
                catTotal={catTotal}
                percent={percent}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
