import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import { Plus } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { TIncome } from "@/src/types/Income";
import { incomeTimePeriodMap } from "@/src/ui/Income/constants/incomeConstants";

interface IIncomeListProps {
  filteredData: TIncome[];
  activeTab: string;
}

export const IncomeList = ({ filteredData, activeTab }: IIncomeListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>History ({incomeTimePeriodMap[activeTab]})</CardTitle>
    </CardHeader>
    <CardContent>
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">
            {localization.income.noIncome}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {'Click "Add Income" to record your first entry'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredData.map((income) => (
            <div
              key={income.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none capitalize">
                  {income.category}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(income.date).toLocaleDateString()}
                  {income.description && ` • ${income.description}`}
                </p>
              </div>
              <div className="font-bold">
                +{localization.common.currency}
                {income.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);
