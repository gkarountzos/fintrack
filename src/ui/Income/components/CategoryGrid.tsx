import { categories } from "@/src/ui/Income/constants/incomeConstants";
import {
  getCategoryCount,
  getCategoryTotal,
} from "@/src/ui/Income/services/incomeUtils";
import { Card, CardContent } from "@/src/ui/ui/card";
import localization from "@/src/lib/localization.json";
import { TIncome } from "@/src/types/Income";

interface ICategoryGridProps {
  filteredData: TIncome[];
}

export const CategoryGrid = ({ filteredData }: ICategoryGridProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const catTotal = getCategoryTotal(category.value, filteredData);
        const catCount = getCategoryCount(category.value, filteredData);

        return (
          <Card
            key={category.name}
            className={`border-2 ${catTotal > 0 ? "border-primary/20 bg-primary/5" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {catCount} entries
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    {localization.common.currency}
                    {catTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
