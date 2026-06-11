import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    if (!body.userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", body.userId)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No Stripe customer found" },
        { status: 404 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      request.headers.get("origin") ||
      "http://localhost:3002";

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${origin}/dashboard/billing`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch {
    return NextResponse.json(
      { error: "Stripe portal failed." },
      { status: 500 }
    );
  }
}