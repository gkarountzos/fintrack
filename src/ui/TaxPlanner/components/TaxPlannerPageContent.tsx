"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Button } from "@/src/ui/ui/button";
import { Input } from "@/src/ui/ui/input";
import { Label } from "@/src/ui/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/ui/ui/chart";
import localization from "@/src/lib/localization.json";

interface TaxBracket {
  id: string;
  incomeUpTo: number;
  taxRate: number;
}

export default function TaxPlannerPageContent() {
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(12);
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([
    { id: "1", incomeUpTo: 10000, taxRate: 10 },
    { id: "2", incomeUpTo: 30000, taxRate: 20 },
    { id: "3", incomeUpTo: 100000, taxRate: 30 },
  ]);

  const [results, setResults] = useState({
    totalTax: 0,
    netAnnual: 0,
    netPerInstallment: 0,
    monthlyTakeHome: 0,
  });

  // Progressive tax calculation
  const calculateTax = (salary: number, brackets: TaxBracket[]) => {
    if (salary <= 0 || brackets.length === 0) return 0;

    // Sort brackets by income threshold
    const sortedBrackets = [...brackets].sort(
      (a, b) => a.incomeUpTo - b.incomeUpTo,
    );

    let totalTax = 0;
    let remainingSalary = salary;
    let previousThreshold = 0;

    for (const bracket of sortedBrackets) {
      if (remainingSalary <= 0) break;

      const taxableInThisBracket = Math.min(
        remainingSalary,
        bracket.incomeUpTo - previousThreshold,
      );

      if (taxableInThisBracket > 0) {
        totalTax += (taxableInThisBracket * bracket.taxRate) / 100;
        remainingSalary -= taxableInThisBracket;
      }

      previousThreshold = bracket.incomeUpTo;
    }

    // Tax any remaining income at the highest bracket rate
    if (remainingSalary > 0 && sortedBrackets.length > 0) {
      const highestRate = sortedBrackets[sortedBrackets.length - 1].taxRate;
      totalTax += (remainingSalary * highestRate) / 100;
    }

    return totalTax;
  };

  // Update results whenever inputs change
  useEffect(() => {
    const totalTax = calculateTax(grossSalary, taxBrackets);
    const netAnnual = grossSalary - totalTax;
    const netPerInstallment = installments > 0 ? netAnnual / installments : 0;
    const monthlyTakeHome = netAnnual / 12;

    setResults({
      totalTax,
      netAnnual,
      netPerInstallment,
      monthlyTakeHome,
    });
  }, [grossSalary, installments, taxBrackets]);

  const addTaxBracket = () => {
    const newBracket: TaxBracket = {
      id: Date.now().toString(),
      incomeUpTo: 0,
      taxRate: 0,
    };
    setTaxBrackets([...taxBrackets, newBracket]);
  };

  const removeTaxBracket = (id: string) => {
    setTaxBrackets(taxBrackets.filter((bracket) => bracket.id !== id));
  };

  const updateBracket = (
    id: string,
    field: "incomeUpTo" | "taxRate",
    value: number,
  ) => {
    setTaxBrackets(
      taxBrackets.map((bracket) =>
        bracket.id === id ? { ...bracket, [field]: value } : bracket,
      ),
    );
  };

  // Chart data
  const chartData = [
    {
      name: localization.taxPlanner.taxBite,
      value: results.totalTax,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: localization.taxPlanner.takeHomePay,
      value: results.netAnnual,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const chartConfig = {
    value: {
      label: localization.common.currency,
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {localization.taxPlanner.title}
          </h1>
          <p className="text-balance text-muted-foreground">
            Calculate your net salary with progressive tax brackets
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          {/* Gross Annual Salary */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.taxPlanner.grossAnnualSalary}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">
                  {localization.common.currency}
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  value={grossSalary || ""}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="pl-8 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pay Installments */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.taxPlanner.payInstallments}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={installments.toString()}
                onValueChange={(value) => setInstallments(Number(value))}
              >
                <SelectTrigger className="text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">
                    {localization.taxPlanner.months["12"]}
                  </SelectItem>
                  <SelectItem value="13">
                    {localization.taxPlanner.months["13"]}
                  </SelectItem>
                  <SelectItem value="14">
                    {localization.taxPlanner.months["14"]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tax Bracket Manager */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.taxPlanner.taxBracketManager}</CardTitle>
              <CardDescription>
                Define progressive tax brackets for calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {taxBrackets.map((bracket, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">
                      {localization.taxPlanner.incomeUpTo}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-sm text-muted-foreground">
                        {localization.common.currency}
                      </span>
                      <Input
                        type="number"
                        placeholder="0"
                        value={bracket.incomeUpTo || ""}
                        onChange={(e) =>
                          updateBracket(
                            bracket.id,
                            "incomeUpTo",
                            Number(e.target.value),
                          )
                        }
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">
                      {localization.taxPlanner.taxRate}
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0"
                        value={bracket.taxRate || ""}
                        onChange={(e) =>
                          updateBracket(
                            bracket.id,
                            "taxRate",
                            Number(e.target.value),
                          )
                        }
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeTaxBracket(bracket.id)}
                      disabled={taxBrackets.length === 1}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addTaxBracket}
                className="w-full bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                {localization.taxPlanner.addBracket}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Estimated Net per Installment */}
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {localization.taxPlanner.estimatedNetPerInstallment}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold tracking-tight">
                {localization.common.currency}
                {results.netPerInstallment.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Based on {installments} installments
              </p>
            </CardContent>
          </Card>

          {/* Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.taxPlanner.summary}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">
                    {localization.taxPlanner.totalAnnualGross}
                  </span>
                  <span className="font-semibold">
                    {localization.common.currency}
                    {grossSalary.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">
                    {localization.taxPlanner.totalTaxPaid}
                  </span>
                  <span className="font-semibold text-destructive">
                    -{localization.common.currency}
                    {results.totalTax.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">
                    {localization.taxPlanner.totalNetAnnual}
                  </span>
                  <span className="font-semibold text-foreground">
                    {localization.common.currency}
                    {results.netAnnual.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {localization.taxPlanner.monthlyTakeHome}
                  </span>
                  <span className="font-semibold">
                    {localization.common.currency}
                    {results.monthlyTakeHome.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{localization.taxPlanner.taxBreakdown}</CardTitle>
            </CardHeader>
            <CardContent>
              {grossSalary > 0 ? (
                <div className="space-y-6">
                  <ChartContainer config={chartConfig} className="mx-auto h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-1))" }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {localization.taxPlanner.taxBite}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {grossSalary > 0
                          ? ((results.totalTax / grossSalary) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-2))" }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {localization.taxPlanner.takeHomePay}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {grossSalary > 0
                          ? ((results.netAnnual / grossSalary) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                  Enter a gross salary to see the breakdown
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
