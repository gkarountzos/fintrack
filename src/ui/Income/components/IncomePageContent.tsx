"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import { Button } from "@/src/ui/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/ui/ui/tabs";
import { Plus } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { AddIncomeDialog } from "@/src/ui/Income/components/addIncomeDialog";
import { TIncome } from "@/src/types/Income";
import { IncomeList } from "@/src/ui/Income/components/IncomeList";
import { CategoryGrid } from "@/src/ui/Income/components/CategoryGrid";
import {
  incomeTimePeriodMap,
  incomeTimePeriods,
} from "@/src/ui/Income/constants/incomeConstants";

interface IIncomePageContentProps {
  initialIncomes: TIncome[];
}

export function IncomePageContent({ initialIncomes }: IIncomePageContentProps) {
  const [activeTab, setActiveTab] = useState(incomeTimePeriods.THIS_MONTH);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return initialIncomes.filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getMonth();
      const itemYear = itemDate.getFullYear();

      if (activeTab === incomeTimePeriods.THIS_MONTH) {
        return itemMonth === currentMonth && itemYear === currentYear;
      }
      if (activeTab === incomeTimePeriods.LAST_MONTH) {
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear =
          currentMonth === 0 ? currentYear - 1 : currentYear;
        return itemMonth === lastMonth && itemYear === lastMonthYear;
      }
      if (activeTab === incomeTimePeriods.THIS_YEAR) {
        return itemYear === currentYear;
      }
      return true;
    });
  }, [activeTab, initialIncomes]);

  const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {localization.income.title}
          </h1>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {localization.income.addIncome}
        </Button>
      </div>

      <AddIncomeDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Total Income Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total (
            {activeTab === incomeTimePeriods.THIS_MONTH
              ? incomeTimePeriodMap[incomeTimePeriods.THIS_MONTH]
              : activeTab === incomeTimePeriods.LAST_MONTH
                ? incomeTimePeriodMap[incomeTimePeriods.LAST_MONTH]
                : incomeTimePeriodMap[incomeTimePeriods.THIS_YEAR]}
            )
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {localization.common.currency}
            {totalAmount.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value={incomeTimePeriods.THIS_MONTH}>
            {localization.income.thisMonth}
          </TabsTrigger>
          <TabsTrigger value={incomeTimePeriods.LAST_MONTH}>
            {localization.income.lastMonth}
          </TabsTrigger>
          <TabsTrigger value={incomeTimePeriods.THIS_YEAR}>
            {localization.income.thisYear}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={incomeTimePeriods.THIS_MONTH} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.byCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryGrid filteredData={filteredData} />
            </CardContent>
          </Card>
          <IncomeList filteredData={filteredData} activeTab={activeTab} />
        </TabsContent>

        <TabsContent value={incomeTimePeriods.LAST_MONTH} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.byCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryGrid filteredData={filteredData} />
            </CardContent>
          </Card>
          <IncomeList filteredData={filteredData} activeTab={activeTab} />
        </TabsContent>

        <TabsContent value={incomeTimePeriods.THIS_YEAR} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.byCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryGrid filteredData={filteredData} />
            </CardContent>
          </Card>
          <IncomeList filteredData={filteredData} activeTab={activeTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
