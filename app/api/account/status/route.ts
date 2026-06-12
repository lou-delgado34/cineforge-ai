import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data: credits } = await supabaseAdmin
      .from("credits")
      .select("balance")
      .eq("user_id", body.userId)
      .maybeSingle();

    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("plan,status")
      .eq("user_id", body.userId)
      .maybeSingle();

    return NextResponse.json({
      credits: credits?.balance ?? 0,
      plan: subscription?.plan ?? "free",
      status: subscription?.status ?? "inactive",
    });
  } catch {
    return NextResponse.json({
      credits: 0,
      plan: "free",
      status: "inactive",
    });
  }
}