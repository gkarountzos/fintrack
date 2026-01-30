import {
  getMonthlyContribution,
  getSavingsGoals,
} from "@/src/actions/savings/savingsActions";
import { SavingsPageContent } from "@/src/ui/Savings/components/SavingsPageContent";

export default async function SavingsPage() {
  const [goals, monthlyContribution] = await Promise.all([
    getSavingsGoals(),
    getMonthlyContribution(),
  ]);
  return (
    <SavingsPageContent
      initialGoals={goals}
      monthlyContribution={monthlyContribution}
    />
  );
}
