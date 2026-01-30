import { getUserExpenses } from "@/src/actions/expenses/expensesActions";
import { ExpensesPageContent } from "@/src/ui/Expenses/components/ExpensesPageContent";

export default async function ExpensesPage() {
  const expenses = await getUserExpenses();
  return <ExpensesPageContent initialExpenses={expenses} />;
}
