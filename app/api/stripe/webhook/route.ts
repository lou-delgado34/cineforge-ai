import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { addCredits } from "@/lib/credits";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

function getPlanFromAmount(amount?: number | null) {
  if (amount === 2900) {
    return {
      plan: "creator",
      credits: 500,
    };
  }

  if (amount === 9900) {
    return {
      plan: "studio",
      credits: 3000,
    };
  }

  return {
    plan: "free",
    credits: 25,
  };
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing Stripe signature or webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const customerId = String(session.customer || "");
    const subscriptionId = String(session.subscription || "");

    if (userId && subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const firstItem = subscription.items.data[0];
      const amount = firstItem?.price?.unit_amount;
      const { plan, credits } = getPlanFromAmount(amount);

      await supabaseAdmin.from("subscriptions").upsert(
        {
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: subscription.status,
          plan,
          credits,
          current_period_end: new Date(
            subscription.current_period_end * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

      await addCredits(userId, credits);
    }
  }

  return NextResponse.json({
    received: true,
  });
}