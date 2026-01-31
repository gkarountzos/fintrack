"use client";

import { TaxBracketManager } from "./TaxBracketManager";
import { TaxBreakdownChart } from "./TaxBreakdownChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import { Input } from "@/src/ui/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/ui/select";
import localization from "@/src/lib/localization.json";
import { useTaxCalculator } from "@/src/ui/TaxPlanner/hooks/useTaxCalculator";
import { SummaryRow } from "@/src/ui/TaxPlanner/components/SummaryRow";
import { formatCurrency } from "@/src/lib/calculateProgressiveTax";

export default function TaxPlannerPageContent() {
  const {
    grossSalary,
    setGrossSalary,
    installments,
    setInstallments,
    taxBrackets,
    addBracket,
    removeBracket,
    updateBracket,
    results,
  } = useTaxCalculator();

  return (
    <div className="space-y-6">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
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
                  {[12, 13, 14].map((m) => (
                    <SelectItem key={m} value={m.toString()}>
                      {
                        localization.taxPlanner.months[
                          m.toString() as keyof typeof localization.taxPlanner.months
                        ]
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <TaxBracketManager
            brackets={taxBrackets}
            onAdd={addBracket}
            onRemove={removeBracket}
            onUpdate={updateBracket}
          />
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {localization.taxPlanner.estimatedNetPerInstallment}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold tracking-tight">
                {localization.common.currency}{" "}
                {formatCurrency(results.netPerInstallment)}
              </div>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Based on {installments} installments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{localization.taxPlanner.summary}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SummaryRow
                  label={localization.taxPlanner.totalAnnualGross}
                  value={formatCurrency(grossSalary)}
                />
                <SummaryRow
                  label={localization.taxPlanner.totalTaxPaid}
                  value={`-${localization.common.currency}${formatCurrency(results.totalTax)}`}
                  valueClass="text-destructive"
                />
                <SummaryRow
                  label={localization.taxPlanner.totalNetAnnual}
                  value={formatCurrency(results.netAnnual)}
                  valueClass="text-foreground"
                />
                <SummaryRow
                  label={localization.taxPlanner.monthlyTakeHome}
                  value={formatCurrency(results.monthlyTakeHome)}
                  isLast
                />
              </div>
            </CardContent>
          </Card>

          <TaxBreakdownChart grossSalary={grossSalary} results={results} />
        </div>
      </div>
    </div>
  );
}
