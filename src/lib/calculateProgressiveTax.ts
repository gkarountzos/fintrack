import { TTaxBracket } from "@/src/types/Tax";

export const calculateProgressiveTax = (
  salary: number,
  brackets: TTaxBracket[],
): number => {
  if (salary <= 0 || brackets.length === 0) return 0;

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

  if (remainingSalary > 0 && sortedBrackets.length > 0) {
    const highestRate = sortedBrackets[sortedBrackets.length - 1].taxRate;
    totalTax += (remainingSalary * highestRate) / 100;
  }

  return totalTax;
};

export const formatCurrency = (val: number) =>
  val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
