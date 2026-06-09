import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerId = body.customerId;

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3002";

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/subscription`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Customer portal failed." },
      { status: 500 }
    );
  }
}