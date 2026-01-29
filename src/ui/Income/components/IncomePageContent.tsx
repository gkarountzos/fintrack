"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import { Button } from "@/src/ui/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/ui/ui/tabs";
import { Plus } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { AddIncomeDialog } from "@/src/ui/Income/components/addIncomeDialog";

export function IncomePageContent() {
  const [activeTab, setActiveTab] = useState("thisMonth");
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = [
    { name: localization.income.categories.salary, icon: "💼" },
    { name: localization.income.categories.freelance, icon: "💻" },
    { name: localization.income.categories.investment, icon: "📈" },
    { name: localization.income.categories.business, icon: "🏢" },
    { name: localization.income.categories.rental, icon: "🏠" },
    { name: localization.income.categories.gift, icon: "🎁" },
    { name: localization.income.categories.other, icon: "💰" },
  ];

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
            {localization.income.totalIncome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {localization.common.currency}0.00
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
          <TabsTrigger value="thisMonth">
            {localization.income.thisMonth}
          </TabsTrigger>
          <TabsTrigger value="lastMonth">
            {localization.income.lastMonth}
          </TabsTrigger>
          <TabsTrigger value="thisYear">
            {localization.income.thisYear}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="thisMonth" className="space-y-4">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.byCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.name} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <p className="text-sm font-medium">
                              {category.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              0 entries
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">
                            {localization.common.currency}0.00
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Income List */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.thisMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  {localization.income.noIncome}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {'Click "Add Income" to record your first entry'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lastMonth" className="space-y-4">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.byCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.name} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <p className="text-sm font-medium">
                              {category.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              0 entries
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">
                            {localization.common.currency}0.00
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Income List */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.lastMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  {localization.income.noIncome}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thisYear" className="space-y-4">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.byCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.name} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <p className="text-sm font-medium">
                              {category.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              0 entries
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">
                            {localization.common.currency}0.00
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Income List */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.income.thisYear}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  {localization.income.noIncome}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
