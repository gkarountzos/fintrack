import { getUserIncomes } from "@/src/actions/income/incomeActions";
import { IncomePageContent } from "@/src/ui/Income/components/IncomePageContent";

export default async function IncomePage() {
  const incomes = await getUserIncomes();
  return <IncomePageContent initialIncomes={incomes} />;
}
