"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Empty, EmptyTitle, EmptyDescription } from "@/src/ui/ui/empty";
import { Button } from "@/src/ui/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/ui/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/ui/select";
import { Plus, TrendingDown, Calendar } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { AddExpenseDialog } from "@/src/ui/Expenses/components/addExpenseDialog";

type TimePeriod =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

export function ExpensesPageContent() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("thisMonth");
  const [activeTab, setActiveTab] = useState("overview");

  const categories = [
    {
      name: localization.expenses.categoryLabels.food,
      value: "food",
      color: "bg-blue-500",
    },
    {
      name: localization.expenses.categoryLabels.transport,
      value: "transport",
      color: "bg-green-500",
    },
    {
      name: localization.expenses.categoryLabels.shopping,
      value: "shopping",
      color: "bg-purple-500",
    },
    {
      name: localization.expenses.categoryLabels.entertainment,
      value: "entertainment",
      color: "bg-pink-500",
    },
    {
      name: localization.expenses.categoryLabels.health,
      value: "health",
      color: "bg-red-500",
    },
    {
      name: localization.expenses.categoryLabels.bills,
      value: "bills",
      color: "bg-yellow-500",
    },
    {
      name: localization.expenses.categoryLabels.groceries,
      value: "groceries",
      color: "bg-cyan-500",
    },
    {
      name: localization.expenses.categoryLabels.other,
      value: "other",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
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
            onValueChange={(value) => setTimePeriod(value as TimePeriod)}
          >
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">
                {localization.expenses.periods.today}
              </SelectItem>
              <SelectItem value="yesterday">
                {localization.expenses.periods.yesterday}
              </SelectItem>
              <SelectItem value="thisWeek">
                {localization.expenses.periods.thisWeek}
              </SelectItem>
              <SelectItem value="thisMonth">
                {localization.expenses.periods.thisMonth}
              </SelectItem>
              <SelectItem value="lastMonth">
                {localization.expenses.periods.lastMonth}
              </SelectItem>
              <SelectItem value="last3Months">
                {localization.expenses.periods.last3Months}
              </SelectItem>
              <SelectItem value="thisYear">
                {localization.expenses.periods.thisYear}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {localization.expenses.addExpense}
          </Button>
        </div>
      </div>

      <AddExpenseDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              {localization.expenses.totalSpent}
              <TrendingDown className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              For {localization.expenses.periods[timePeriod].toLowerCase()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.expenses.averageDaily}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Daily average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.expenses.budgetRemaining}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
            <p className="mt-1 text-xs text-muted-foreground">No budget set</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Total transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
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
          <Card>
            <CardHeader>
              <CardTitle>{localization.expenses.allExpenses}</CardTitle>
              <CardDescription>
                {`${localization.expenses.showingExpensesFor} ${localization.expenses.periods[timePeriod].toLowerCase()}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Empty>
                <EmptyTitle>{localization.expenses.noExpenses}</EmptyTitle>
                <EmptyDescription>
                  {`${localization.expenses.addFirstExpense} ${localization.expenses.periods[timePeriod].toLowerCase()}`}
                </EmptyDescription>
              </Empty>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="byCategory" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{localization.expenses.byCategory}</CardTitle>
              <CardDescription>
                {`${localization.expenses.breakdownFor} ${localization.expenses.periods[timePeriod].toLowerCase()}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {categories.map((category) => (
                  <Card key={category.value}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <div
                          className={`h-3 w-3 rounded-full ${category.color}`}
                        />
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {localization.common.currency}0.00
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${category.color}`}
                          style={{ width: "0%" }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {`0${localization.common.ofTotal}`}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
