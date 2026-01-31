import { Empty, EmptyTitle, EmptyDescription } from "@/src/ui/ui/empty";
import localization from "@/src/lib/localization.json";
import { overviewStats } from "@/src/ui/Overview/constants/overviewConstants";
import { SummaryStatCard } from "@/src/ui/ui/summary-stat-card";
import { OverviewQuickStatsCard } from "@/src/ui/Overview/components/OverviewQuickStatsCard";

export function OverviewPageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.overview.title}
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => {
          return (
            <SummaryStatCard
              key={stat.title}
              title={stat.title}
              icon={stat.icon}
              value={stat.value || `${localization.common.currency}0.00`}
            />
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <OverviewQuickStatsCard
          title={localization.overview.quickStats}
          description={localization.overview.quickStatsSummary}
        >
          <Empty>
            <EmptyTitle>{localization.analytics.noData}</EmptyTitle>
            <EmptyDescription>
              {localization.overview.quickStatsDescription}
            </EmptyDescription>
          </Empty>
        </OverviewQuickStatsCard>

        <OverviewQuickStatsCard
          title={localization.overview.recentTransactions}
          description={localization.overview.recentTransactionsDescription}
        >
          <Empty>
            <EmptyTitle>{localization.overview.noTransactions}</EmptyTitle>
            <EmptyDescription>
              {localization.overview.recentTransactionsMessage}
            </EmptyDescription>
          </Empty>
        </OverviewQuickStatsCard>
      </div>
    </div>
  );
}
