"use server";
import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ExpenseData {
  category: string;
  amount: string;
  date: string;
  description: string;
}

export async function addExpenseAction(data: ExpenseData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase.from("expenses").insert({
    user_id: user.id,
    category: data.category,
    amount: parseFloat(data.amount),
    date: data.date,
    description: data.description,
  });

  if (error) {
    console.error("Error adding expense:", error);
    return { error: "Failed to add expense" };
  }

  revalidatePath("/expenses");
  return { success: true };
}

export async function getUserExpenses() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) return [];

  return data;
}
