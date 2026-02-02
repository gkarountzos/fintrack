export type TDashboardStats = {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
};

export type TRecentTransaction = {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string | null;
};
