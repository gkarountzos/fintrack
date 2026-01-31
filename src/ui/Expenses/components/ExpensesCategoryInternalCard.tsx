import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import localization from "@/src/lib/localization.json";
import { IExpenseCategory } from "@/src/types/Expense";

interface IExpensesCategoryInternalCardProps {
  category: IExpenseCategory;
  catTotal: number;
  percent: number;
}

export function ExpensesCategoryInternalCard({
  category,
  catTotal,
  percent,
}: IExpensesCategoryInternalCardProps) {
  return (
    <Card key={category.value}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className={`h-3 w-3 rounded-full ${category.color}`} />
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {localization.common.currency}
          {catTotal.toFixed(2)}
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${category.color}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {`${percent.toFixed(1)}% ${localization.common.ofTotal}`}
        </p>
      </CardContent>
    </Card>
  );
}
