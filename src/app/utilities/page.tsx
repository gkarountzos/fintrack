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
import { Badge } from "@/src/ui/ui/badge";
import { Plus, Zap, Droplet, Flame, Wifi, Phone } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { AddUtilityDialog } from "@/src/ui/Utilities/components/addUtilityDialog";

export default function UtilitiesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const utilityCategories = [
    {
      name: localization.utilities.electricity,
      icon: Zap,
      amount: "",
      dueDate: "",
      status: "unpaid",
    },
    {
      name: localization.utilities.water,
      icon: Droplet,
      amount: "",
      dueDate: "",
      status: "unpaid",
    },
    {
      name: localization.utilities.gas,
      icon: Flame,
      amount: "",
      dueDate: "",
      status: "unpaid",
    },
    {
      name: localization.utilities.internet,
      icon: Wifi,
      amount: "",
      dueDate: "",
      status: "unpaid",
    },
    {
      name: localization.utilities.phone,
      icon: Phone,
      amount: "",
      dueDate: "",
      status: "unpaid",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {localization.utilities.title}
        </h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {localization.common.add}
        </Button>
      </div>

      <AddUtilityDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Total Utilities Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {localization.utilities.totalUtilities}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {localization.common.currency}0.00
          </div>
        </CardContent>
      </Card>

      {/* Utilities Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {utilityCategories.map((utility) => {
          const Icon = utility.icon;
          return (
            <Card key={utility.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {utility.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">
                    {localization.common.currency}0.00
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {localization.utilities.dueDate}: -
                    </span>
                    <Badge variant="secondary">
                      {localization.utilities.unpaid}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Bills */}
      <Card>
        <CardHeader>
          <CardTitle>{localization.utilities.recentBills}</CardTitle>
          <CardDescription>
            {localization.utilities.recentBillsDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyTitle>{localization.utilities.noUtilities}</EmptyTitle>
            <EmptyDescription>
              {localization.utilities.addUtilitiesMessage}
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </div>
  );
}
