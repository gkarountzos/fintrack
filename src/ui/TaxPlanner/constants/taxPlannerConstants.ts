import { TTaxBracket } from "@/src/types/Tax";

export const DEFAULT_BRACKETS: TTaxBracket[] = [
  { id: "1", incomeUpTo: 10000, taxRate: 10 },
  { id: "2", incomeUpTo: 30000, taxRate: 20 },
  { id: "3", incomeUpTo: 100000, taxRate: 30 },
];
