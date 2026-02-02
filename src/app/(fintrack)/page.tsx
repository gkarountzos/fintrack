import {
  getDashboardStats,
  getRecentTransactions,
} from "@/src/actions/dashboard/dashboardActions";
import { OverviewPageContent } from "@/src/ui/Overview/components/OverviewPageContent";

export default async function OverviewPage() {
  const [statsData, recentTransactions] = await Promise.all([
    getDashboardStats(),
    getRecentTransactions(),
  ]);

  return (
    <OverviewPageContent
      statsData={statsData}
      recentTransactions={recentTransactions}
    />
  );
}
