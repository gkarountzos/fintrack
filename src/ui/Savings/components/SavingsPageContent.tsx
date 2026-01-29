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
import { Progress } from "@/src/ui/ui/progress";
import { Plus, Target } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { AddSavingsGoalDialog } from "@/src/ui/Savings/components/addSavingsGoalDialog";

export function SavingsPageContent() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.savings.title}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            <Target className="mr-2 h-4 w-4" />
            {localization.savings.setGoal}
          </Button>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {localization.savings.addGoal}
          </Button>
        </div>
      </div>

      <AddSavingsGoalDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.savings.totalSavings}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.savings.savingsGoal}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {localization.savings.monthlyContribution}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {localization.common.currency}0.00
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Goals */}
      <Card>
        <CardHeader>
          <CardTitle>{localization.savings.savingsGoalsTitle}</CardTitle>
          <CardDescription>
            {localization.savings.savingsGoalsDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyTitle>{localization.savings.noGoals}</EmptyTitle>
            <EmptyDescription>
              {localization.savings.noGoalsDescription}
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>

      {/* Example Goal Cards (hidden by default) */}
      <div className="hidden grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">
                  {localization.savings.goalName}
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                {localization.common.edit}
              </Button>
            </div>
            <CardDescription>
              {localization.savings.progress}: 0%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {localization.savings.currentAmount}:{" "}
                {localization.common.currency}0.00
              </span>
              <span className="text-muted-foreground">
                {localization.savings.targetAmount}:{" "}
                {localization.common.currency}0.00
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
