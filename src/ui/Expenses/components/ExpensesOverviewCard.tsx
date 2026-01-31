import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Empty, EmptyDescription, EmptyTitle } from "@/src/ui/ui/empty";
import localization from "@/src/lib/localization.json";
import { expensesCategories } from "@/src/ui/Expenses/constants/expensesConstants";
import { TExpense, TTimePeriod } from "@/src/types/Expense";

interface IExpensesOverviewCardProps {
  filteredExpenses: TExpense[];
  timePeriod: TTimePeriod;
}

export function ExpensesOverviewCard({
  filteredExpenses,
  timePeriod,
}: IExpensesOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{localization.expenses.allExpenses}</CardTitle>
        <CardDescription>
          {`${localization.expenses.showingExpensesFor} ${localization.expenses.periods[timePeriod].toLowerCase()}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {filteredExpenses.length === 0 ? (
          <Empty>
            <EmptyTitle>{localization.expenses.noExpenses}</EmptyTitle>
            <EmptyDescription>
              {`${localization.expenses.addFirstExpense} ${localization.expenses.periods[timePeriod].toLowerCase()}`}
            </EmptyDescription>
          </Empty>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${expensesCategories.find((c) => c.value === expense.category)?.color || "bg-gray-500"}`}
                    />
                    <p className="text-sm font-medium leading-none capitalize">
                      {expense.category}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()}
                    {expense.description && ` • ${expense.description}`}
                  </p>
                </div>
                <div className="font-bold">
                  {localization.common.currency}
                  {expense.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
