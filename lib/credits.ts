import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getCredits(userId: string) {
  const { data } = await supabaseAdmin
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.balance ?? 25;
}

export async function addCredits(userId: string, amount: number) {
  const currentCredits = await getCredits(userId);
  const newBalance = currentCredits + amount;

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
  const currentCredits = await getCredits(userId);

  if (currentCredits < amount) {
    return {
      error: "Insufficient credits",
      balance: currentCredits,
    };
  }

  const newBalance = currentCredits - amount;

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