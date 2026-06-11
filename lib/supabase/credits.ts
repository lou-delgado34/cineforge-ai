import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getCredits(userId: string) {
  const { data } = await supabaseAdmin
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.balance ?? 0;
}

export async function addCredits(userId: string, amount: number) {
  const currentBalance = await getCredits(userId);
  const newBalance = currentBalance + amount;

  const { data, error } = await supabaseAdmin
    .from("credits")
    .upsert(
      {
        user_id: userId,
        balance: newBalance,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deductCredits(userId: string, amount: number) {
  const currentBalance = await getCredits(userId);

  if (currentBalance < amount) {
    return {
      error: "Insufficient credits",
      balance: currentBalance,
    };
  }

  const newBalance = currentBalance - amount;

  const { data, error } = await supabaseAdmin
    .from("credits")
    .upsert(
      {
        user_id: userId,
        balance: newBalance,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    data,
    balance: newBalance,
  };
}