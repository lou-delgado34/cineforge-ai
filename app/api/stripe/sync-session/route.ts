import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { addCredits } from "@/lib/credits";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

function getPlanFromAmount(amount?: number | null) {
  if (amount === 2900) return { plan: "creator", credits: 500 };
  if (amount === 9900) return { plan: "studio", credits: 3000 };
  return { plan: "free", credits: 25 };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.sessionId || !body.userId) {
      return NextResponse.json(
        { error: "Missing sessionId or userId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(body.sessionId);

    const customerId = String(session.customer || "");
    const subscriptionId = String(session.subscription || "");

    if (!customerId || !subscriptionId) {
      return NextResponse.json(
        { error: "Missing Stripe customer or subscription" },
        { status: 400 }
      );
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const firstItem = subscription.items.data[0];
    const amount = firstItem?.price?.unit_amount;
    const { plan, credits } = getPlanFromAmount(amount);

    await supabaseAdmin.from("subscriptions").upsert(
      {
        user_id: body.userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        status: subscription.status,
        plan,
        credits,
        current_period_end: null,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

    await addCredits(body.userId, credits);

    return NextResponse.json({
      success: true,
      plan,
      credits,
      status: subscription.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Stripe session sync failed",
      },
      { status: 500 }
    );
  }
}