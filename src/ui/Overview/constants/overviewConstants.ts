import { formatCurrency } from "@/src/lib/calculateProgressiveTax";
import localization from "@/src/lib/localization.json";
import { TDashboardStats } from "@/src/types/Dashboard";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export const overviewStats = (statsData: TDashboardStats) => [
  {
    title: localization.overview.totalBalance,
    value: formatCurrency(statsData.totalBalance),
    icon: Wallet,
  },
  {
    title: localization.overview.monthlyIncome,
    value: formatCurrency(statsData.monthlyIncome),
    icon: TrendingUp,
  },
  {
    title: localization.overview.monthlyExpenses,
    value: formatCurrency(statsData.monthlyExpenses),
    icon: TrendingDown,
  },
  {
    title: localization.overview.monthlySavings,
    value: formatCurrency(statsData.monthlySavings),
    icon: DollarSign,
  },
];
