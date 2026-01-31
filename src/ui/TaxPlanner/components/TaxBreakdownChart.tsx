import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/ui/ui/chart";
import localization from "@/src/lib/localization.json";
import { TTaxCalculationResult } from "@/src/types/Tax";
import { LegendItem } from "@/src/ui/ui/legend-item";

interface TaxBreakdownChartProps {
  grossSalary: number;
  results: TTaxCalculationResult;
}

export function TaxBreakdownChart({
  grossSalary,
  results,
}: TaxBreakdownChartProps) {
  const chartData = [
    {
      name: localization.taxPlanner.taxBite,
      value: results.totalTax,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: localization.taxPlanner.takeHomePay,
      value: results.netAnnual,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const chartConfig = {
    value: { label: localization.common.currency },
  };

  const taxPercentage =
    grossSalary > 0 ? ((results.totalTax / grossSalary) * 100).toFixed(1) : 0;
  const netPercentage =
    grossSalary > 0 ? ((results.netAnnual / grossSalary) * 100).toFixed(1) : 0;

  if (grossSalary <= 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{localization.taxPlanner.taxBreakdown}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            Enter a gross salary to see the breakdown
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{localization.taxPlanner.taxBreakdown}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ChartContainer config={chartConfig} className="mx-auto h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="space-y-2">
            <LegendItem
              color="hsl(var(--chart-1))"
              label={localization.taxPlanner.taxBite}
              percentage={Number(taxPercentage)}
            />
            <LegendItem
              color="hsl(var(--chart-2))"
              label={localization.taxPlanner.takeHomePay}
              percentage={Number(netPercentage)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
