import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getSubscription(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createSubscription({
  userId,
  stripeCustomerId,
  stripeSubscriptionId,
  status,
  plan,
  credits,
  currentPeriodEnd,
}: {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: string;
  plan: string;
  credits: number;
  currentPeriodEnd?: string | null;
}) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        status,
        plan,
        credits,
        current_period_end: currentPeriodEnd,
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

export async function updateSubscription({
  userId,
  status,
  plan,
  credits,
  currentPeriodEnd,
}: {
  userId: string;
  status: string;
  plan?: string;
  credits?: number;
  currentPeriodEnd?: string | null;
}) {
  const updateData: Record<string, string | number | null> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (plan) updateData.plan = plan;
  if (typeof credits === "number") updateData.credits = credits;
  if (currentPeriodEnd) updateData.current_period_end = currentPeriodEnd;

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .update(updateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}