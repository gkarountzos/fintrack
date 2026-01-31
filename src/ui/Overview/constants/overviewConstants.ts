import localization from "@/src/lib/localization.json";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export const overviewStats = [
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
