import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId || !body.amount) {
      return NextResponse.json(
        { error: "Missing userId or amount" },
        { status: 400 }
      );
    }

    const result = await deductCredits(body.userId, Number(body.amount));

    if ("error" in result) {
      return NextResponse.json(result, { status: 402 });
    }

    await supabaseAdmin.from("usage_logs").insert({
      user_id: body.userId,
      action: body.action || "Credit Deduction",
      credits_used: Number(body.amount),
      metadata: body.metadata || {},
    });

    return NextResponse.json({
      success: true,
      balance: result.balance,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Credit deduction failed.",
      },
      { status: 500 }
    );
  }
}