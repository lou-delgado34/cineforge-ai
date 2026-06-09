import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;
    const amount = Number(body.amount || 1);
    const action = body.action || "Credit Spend";

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data } = await supabaseAdmin
      .from("credits")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    const currentBalance = data?.balance ?? 25;

    if (currentBalance < amount) {
      return NextResponse.json(
        { error: "Not enough credits", credits: currentBalance },
        { status: 400 }
      );
    }

    const newBalance = currentBalance - amount;

    if (!data) {
      await supabaseAdmin.from("credits").insert({
        user_id: userId,
        balance: newBalance,
      });
    } else {
      await supabaseAdmin
        .from("credits")
        .update({ balance: newBalance })
        .eq("user_id", userId);
    }

    await supabaseAdmin.from("usage_logs").insert({
      user_id: userId,
      action,
      credits_used: amount,
    });

    return NextResponse.json({ credits: newBalance });
  } catch {
    return NextResponse.json(
      { error: "Credit spend failed" },
      { status: 500 }
    );
  }
}