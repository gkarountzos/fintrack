"use server";

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface IncomeData {
  category: string;
  amount: string;
  date: string;
  description: string;
}

export async function addIncomeAction(data: IncomeData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add income." };
  }

  const { error } = await supabase.from("incomes").insert({
    user_id: user.id,
    category: data.category,
    amount: parseFloat(data.amount),
    date: data.date,
    description: data.description,
  });

  if (error) {
    console.error("Supabase Error:", error);
    return { error: "Failed to add income. Please try again." };
  }

  revalidatePath("/income");

  return { success: true };
}

export async function getUserIncomes() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("incomes")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching incomes:", error);
    return [];
  }

  return data;
}
