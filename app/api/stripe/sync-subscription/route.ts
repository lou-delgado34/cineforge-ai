import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const subscriptionId = "sub_1ThFe4Rz3k0MIvT5OzKjGKYq";

    const subscription =
      await stripe.subscriptions.retrieve(subscriptionId);

    const customerId = String(subscription.customer);

    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        plan: "creator",
      })
      .select();

    return NextResponse.json({
      success: true,
      stripe: subscription,
      saved: data,
      error,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
}