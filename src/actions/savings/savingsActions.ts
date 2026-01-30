"use server";

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface SavingsGoalData {
  name: string;
  targetAmount: string;
  currentAmount: string;
  description: string;
}

export async function addSavingsGoalAction(data: SavingsGoalData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase.from("savings_goals").insert({
    user_id: user.id,
    name: data.name,
    target_amount: parseFloat(data.targetAmount),
    current_amount: parseFloat(data.currentAmount) || 0,
    description: data.description,
  });

  if (error) {
    console.error("Error creating savings goal:", error);
    return { error: "Failed to create goal" };
  }

  revalidatePath("/savings");
  return { success: true };
}

export async function getSavingsGoals() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("savings_goals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];

  return data;
}

export async function updateGoalAmountAction(
  goalId: string,
  amountToAdd: number,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const { data: goal, error: fetchError } = await supabase
    .from("savings_goals")
    .select("current_amount")
    .eq("id", goalId)
    .single();

  if (fetchError || !goal) return { error: "Goal not found" };

  const newTotal = goal.current_amount + amountToAdd;

  const { error: updateError } = await supabase
    .from("savings_goals")
    .update({ current_amount: newTotal })
    .eq("id", goalId);

  if (updateError) return { error: "Failed to update balance" };

  const { error: historyError } = await supabase
    .from("savings_transactions")
    .insert({
      user_id: user.id,
      goal_id: goalId,
      amount: amountToAdd,
      date: new Date().toISOString().split("T")[0],
    });

  if (historyError) {
    console.error("Failed to log transaction", historyError);
  }

  revalidatePath("/savings");
  return { success: true };
}

export async function getMonthlyContribution() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();

  const { data, error } = await supabase
    .from("savings_transactions")
    .select("amount")
    .gte("date", startOfMonth);

  if (error || !data) return 0;

  const total = data.reduce((sum, record) => sum + record.amount, 0);

  return total;
}
