import { supabase } from "@/lib/supabase";

async function getSessionUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

export async function getSubscriptions() {
  const user = await getSessionUser();

  if (!user) return [];

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id);

  return data || [];
}

export async function createSubscription(subscription: {
  plan: string;
  status: string;
}) {
  const user = await getSessionUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      ...subscription,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}