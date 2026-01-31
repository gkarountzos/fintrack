import { calculateProgressiveTax } from "@/src/lib/calculateProgressiveTax";
import { TTaxBracket, TTaxCalculationResult } from "@/src/types/Tax";
import { DEFAULT_BRACKETS } from "@/src/ui/TaxPlanner/constants/taxPlannerConstants";
import { useState, useMemo, useCallback } from "react";

export function useTaxCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(12);
  const [taxBrackets, setTaxBrackets] =
    useState<TTaxBracket[]>(DEFAULT_BRACKETS);

  const results: TTaxCalculationResult = useMemo(() => {
    const totalTax = calculateProgressiveTax(grossSalary, taxBrackets);
    const netAnnual = grossSalary - totalTax;

    return {
      totalTax,
      netAnnual,
      netPerInstallment: installments > 0 ? netAnnual / installments : 0,
      monthlyTakeHome: netAnnual / 12,
    };
  }, [grossSalary, taxBrackets, installments]);

  const addBracket = useCallback(() => {
    const newBracket: TTaxBracket = {
      id: crypto.randomUUID(),
      incomeUpTo: 0,
      taxRate: 0,
    };
    setTaxBrackets((prev) => [...prev, newBracket]);
  }, []);

  const removeBracket = useCallback((id: string) => {
    setTaxBrackets((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const updateBracket = useCallback(
    (id: string, field: keyof TTaxBracket, value: number) => {
      setTaxBrackets((prev) =>
        prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
      );
    },
    [],
  );

  return {
    grossSalary,
    setGrossSalary,
    installments,
    setInstallments,
    taxBrackets,
    addBracket,
    removeBracket,
    updateBracket,
    results,
  };
}
