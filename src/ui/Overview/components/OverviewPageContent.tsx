import localization from "@/src/lib/localization.json";
import { SummaryStatCard } from "@/src/ui/ui/summary-stat-card";
import { OverviewQuickStatsCard } from "@/src/ui/Overview/components/OverviewQuickStatsCard";
import { formatCurrency } from "@/src/lib/calculateProgressiveTax";
import { TDashboardStats, TRecentTransaction } from "@/src/types/Dashboard";
import { overviewStats } from "@/src/ui/Overview/constants/overviewConstants";

interface IOverviewPageContentProps {
  statsData: TDashboardStats;
  recentTransactions: TRecentTransaction[];
}

export function OverviewPageContent({
  statsData,
  recentTransactions,
}: IOverviewPageContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.overview.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {localization.overview.pageDescription}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats(statsData).map((stat) => (
          <SummaryStatCard
            key={stat.title}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {/* <OverviewQuickStatsCard
          title={localization.overview.quickStats}
          description={localization.overview.quickStatsSummary}
        /> */}

        <OverviewQuickStatsCard
          title={localization.overview.recentTransactions}
          description={localization.overview.recentTransactionsDescription}
          data={recentTransactions}
          formatCurrency={formatCurrency}
          emptyState={{
            title: localization.overview.noTransactions,
            description: localization.overview.recentTransactionsMessage,
          }}
        />
      </div>
    </div>
  );
}
