import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const plans = {
  creator: {
    name: "Creator Plan",
    amount: 2900,
    credits: "1,000 credits/month",
  },
  studio: {
    name: "Studio Plan",
    amount: 9900,
    credits: "5,000 credits/month",
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const planKey = body.plan as "creator" | "studio";
    const plan = plans[planKey];

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY in .env.local" },
        { status: 500 }
      );
    }

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3002";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: {
              interval: "month",
            },
            product_data: {
              name: plan.name,
              description: plan.credits,
            },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Stripe checkout failed." },
      { status: 500 }
    );
  }
}