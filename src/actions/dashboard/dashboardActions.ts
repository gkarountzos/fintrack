"use server";

import { createClient } from "@/src/lib/supabase/server";
import { TDashboardStats, TRecentTransaction } from "@/src/types/Dashboard";

interface TransactionRow {
  amount: number | null;
  date: string;
}

export async function getDashboardStats(): Promise<TDashboardStats> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      monthlySavings: 0,
    };
  }

  const [allIncomes, allExpenses, allSavings] = await Promise.all([
    supabase.from("incomes").select("amount, date").returns<TransactionRow[]>(),
    supabase
      .from("expenses")
      .select("amount, date")
      .returns<TransactionRow[]>(),
    supabase
      .from("savings_transactions")
      .select("amount, date")
      .returns<TransactionRow[]>(),
  ]);

  const incomes = allIncomes.data || [];
  const expenses = allExpenses.data || [];
  const savings = allSavings.data || [];

  const totalBalance = sum(incomes) - sum(expenses);

  const avgMonthlyIncome = sum(filterRecent(incomes)) / 12;
  const avgMonthlyExpense = sum(filterRecent(expenses)) / 12;
  const avgMonthlySavings = sum(filterRecent(savings)) / 12;

  return {
    totalBalance,
    monthlyIncome: avgMonthlyIncome,
    monthlyExpenses: avgMonthlyExpense,
    monthlySavings: avgMonthlySavings,
  };
}

export async function getRecentTransactions(): Promise<TRecentTransaction[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("expenses")
    .select("id, category, amount, date, description")
    .order("date", { ascending: false })
    .limit(5)
    .returns<TRecentTransaction[]>();

  return data || [];
}

const sum = (data: TransactionRow[]) =>
  data.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
const oneYearAgoStr = oneYearAgo.toISOString();

const filterRecent = (data: TransactionRow[]) =>
  data.filter((item) => item.date >= oneYearAgoStr);
