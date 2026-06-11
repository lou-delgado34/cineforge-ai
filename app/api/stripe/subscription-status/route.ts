import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    return NextResponse.json({
      subscription: subscription || {
        plan: "free",
        status: "inactive",
        stripe_customer_id: null,
        stripe_subscription_id: null,
        current_period_end: null,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Subscription status failed." },
      { status: 500 }
    );
  }
}