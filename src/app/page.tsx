import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Empty, EmptyTitle, EmptyDescription } from "@/src/ui/ui/empty";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import localization from "@/src/lib/localization.json";

export default function OverviewPage() {
  const stats = [
    {
      title: localization.overview.totalBalance,
      value: "",
      icon: Wallet,
      trend: null,
    },
    {
      title: localization.overview.monthlyIncome,
      value: "",
      icon: TrendingUp,
      trend: null,
    },
    {
      title: localization.overview.monthlyExpenses,
      value: "",
      icon: TrendingDown,
      trend: null,
    },
    {
      title: localization.overview.monthlySavings,
      value: "",
      icon: DollarSign,
      trend: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.overview.title}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value || localization.common.currency + "0.00"}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{localization.overview.quickStats}</CardTitle>
            <CardDescription>
              {localization.overview.quickStatsSummary}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Empty>
              <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
              <EmptyDescription>
                {localization.overview.quickStatsDescription}
              </EmptyDescription>
            </Empty>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{localization.overview.recentTransactions}</CardTitle>
            <CardDescription>
              {localization.overview.recentTransactionsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Empty>
              <EmptyTitle>{localization.overview.noTransactions}</EmptyTitle>
              <EmptyDescription>
                {localization.overview.recentTransactionsMessage}
              </EmptyDescription>
            </Empty>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
