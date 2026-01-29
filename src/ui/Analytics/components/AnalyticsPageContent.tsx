import localization from "@/src/lib/localization.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Empty, EmptyTitle, EmptyDescription } from "@/src/ui/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/ui/ui/tabs";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/src/components/ui/chart";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

export function AnalyticsPageContent() {
  // Empty data arrays - will be populated when database is implemented
  // const monthlyData: any[] = [];
  // const categoryData: any[] = [];
  // const yearlyData: any[] = [];

  // const chartConfig = {
  //   expenses: {
  //     label: "Expenses",
  //     color: "hsl(var(--chart-1))",
  //   },
  //   income: {
  //     label: "Income",
  //     color: "hsl(var(--chart-2))",
  //   },
  //   savings: {
  //     label: "Savings",
  //     color: "hsl(var(--chart-3))",
  //   },
  // };
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.analytics.title}
        </h1>
      </div>

      {/* Period Tabs */}
      <Tabs defaultValue="month" className="w-full">
        <TabsList>
          <TabsTrigger value="week">
            {localization.analytics.period.week}
          </TabsTrigger>
          <TabsTrigger value="month">
            {localization.analytics.period.month}
          </TabsTrigger>
          <TabsTrigger value="year">
            {localization.analytics.period.year}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{localization.analytics.weeklyTrend}</CardTitle>
                <CardDescription>
                  {localization.analytics.weeklySpendingTrends}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
                  <EmptyDescription>
                    {localization.analytics.weeklyTrendChart}
                  </EmptyDescription>
                </Empty>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {localization.analytics.expensesByCategory}
                </CardTitle>
                <CardDescription>
                  {localization.analytics.categoryBreakdownThisWeek}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
                  <EmptyDescription>
                    {localization.analytics.categoryBreakdownMessage}
                  </EmptyDescription>
                </Empty>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="month" className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{localization.analytics.monthlyTrend}</CardTitle>
                <CardDescription>
                  {localization.analytics.monthlySpendingPatterns}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
                  <EmptyDescription>
                    {localization.analytics.monthlyTrendChart}
                  </EmptyDescription>
                </Empty>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {localization.analytics.expensesByCategory}
                </CardTitle>
                <CardDescription>
                  {localization.analytics.categoryBreakdownThisMonth}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
                  <EmptyDescription>
                    {localization.analytics.categoryBreakdownMessage}
                  </EmptyDescription>
                </Empty>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="year" className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{localization.analytics.yearlyOverview}</CardTitle>
                <CardDescription>
                  {localization.analytics.annualSpendingOverview}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
                  <EmptyDescription>
                    {localization.analytics.yearlyOverviewChart}
                  </EmptyDescription>
                </Empty>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{localization.analytics.topCategories}</CardTitle>
                <CardDescription>
                  {localization.analytics.topSpendingCategories}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
                  <EmptyDescription>
                    {localization.analytics.topCategoriesMessage}
                  </EmptyDescription>
                </Empty>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.analytics.averageDailySpending}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.analytics.highestCategory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">-</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.analytics.savingsRate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
