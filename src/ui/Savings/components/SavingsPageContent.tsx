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
import { Plus, Target, Wallet } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { AddSavingsGoalDialog } from "@/src/ui/Savings/components/addSavingsGoalDialog";
import { UpdateGoalDialog } from "@/src/ui/Savings/components/updateGoalDialog";

type SavingsGoal = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  description: string;
};

interface SavingsPageContentProps {
  initialGoals: SavingsGoal[];
  monthlyContribution: number;
}

export function SavingsPageContent({
  initialGoals,
  monthlyContribution,
}: SavingsPageContentProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);

  const totalSavings = initialGoals.reduce(
    (sum, goal) => sum + goal.current_amount,
    0,
  );
  const totalTarget = initialGoals.reduce(
    (sum, goal) => sum + goal.target_amount,
    0,
  );

  const handleDepositClick = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setUpdateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.savings.title}
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {localization.savings.addGoal}
          </Button>
        </div>
      </div>

      <AddSavingsGoalDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
      />

      <UpdateGoalDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        goal={selectedGoal}
      />

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
              {localization.common.currency}
              {totalSavings.toFixed(2)}
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
              {localization.common.currency}
              {totalTarget.toFixed(2)}
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
              {localization.common.currency}
              {monthlyContribution.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Added this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Savings Goals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {localization.savings.savingsGoalsTitle}
          </h2>
        </div>

        {initialGoals.length === 0 ? (
          <Card>
            <CardHeader>
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
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {initialGoals.map((goal) => {
              const progress = (goal.current_amount / goal.target_amount) * 100;
              const formattedProgress = Math.min(progress, 100);

              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base truncate">
                          {goal.name}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-primary"
                        onClick={() => handleDepositClick(goal)}
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        Add Money
                      </Button>
                    </div>
                    <CardDescription>
                      {localization.savings.progress}:{" "}
                      {formattedProgress.toFixed(0)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={formattedProgress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        {localization.common.currency}
                        {goal.current_amount.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">
                        / {localization.common.currency}
                        {goal.target_amount.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
