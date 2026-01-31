"use client";

import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/src/ui/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/ui/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/ui/select";
import { AddExpenseDialog } from "@/src/ui/Expenses/components/addExpenseDialog";
import { SummaryStatCard } from "@/src/ui/ui/summary-stat-card";
import { ExpensesOverviewCard } from "@/src/ui/Expenses/components/ExpensesOverviewCard";
import { ExpensesCategoryCard } from "@/src/ui/Expenses/components/ExpensesCategoryCard";
import localization from "@/src/lib/localization.json";
import { TExpense, TTimePeriod } from "@/src/types/Expense";
import { useExpenseMetrics } from "@/src/ui/Expenses/hooks/useExpenseMetrics";
import { statsConfig } from "@/src/ui/Expenses/constants/expensesConstants";

interface ExpensesPageContentProps {
  initialExpenses: TExpense[];
}

export function ExpensesPageContent({
  initialExpenses,
}: ExpensesPageContentProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState<TTimePeriod>("thisMonth");
  const [activeTab, setActiveTab] = useState("overview");

  const { filteredExpenses, totalSpent, averageDaily, totalTransactions } =
    useExpenseMetrics(initialExpenses, timePeriod);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {localization.expenses.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {localization.expenses.pageDescription}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={timePeriod}
            onValueChange={(v) => setTimePeriod(v as TTimePeriod)}
          >
            <SelectTrigger className="w-45">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(localization.expenses.periods).map(
                ([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {localization.expenses.addExpense}
          </Button>
        </div>
      </div>

      <AddExpenseDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      <div className="grid gap-4 md:grid-cols-4">
        {statsConfig(
          totalSpent,
          averageDaily,
          totalTransactions,
          timePeriod,
        ).map((stat, i) => (
          <SummaryStatCard key={i} {...stat} />
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">
            {localization.expenses.overviewTab}
          </TabsTrigger>
          <TabsTrigger value="byCategory">
            {localization.expenses.byCategory}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ExpensesOverviewCard
            filteredExpenses={filteredExpenses}
            timePeriod={timePeriod}
          />
        </TabsContent>

        <TabsContent value="byCategory" className="mt-6 space-y-4">
          <ExpensesCategoryCard
            filteredExpenses={filteredExpenses}
            timePeriod={timePeriod}
            totalSpent={totalSpent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
