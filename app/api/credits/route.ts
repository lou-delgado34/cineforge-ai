import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ credits: 25 });
    }

    const { data } = await supabaseAdmin
      .from("credits")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!data) {
      const { data: created } = await supabaseAdmin
        .from("credits")
        .insert({
          user_id: userId,
          balance: 25,
        })
        .select()
        .single();

      return NextResponse.json({ credits: created?.balance || 25 });
    }

    return NextResponse.json({ credits: data.balance });
  } catch {
    return NextResponse.json({ credits: 25 });
  }
}