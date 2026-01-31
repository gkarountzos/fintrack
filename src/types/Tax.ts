export type TTaxBracket = {
  id: string;
  incomeUpTo: number;
  taxRate: number;
};

export type TTaxCalculationResult = {
  totalTax: number;
  netAnnual: number;
  netPerInstallment: number;
  monthlyTakeHome: number;
};
