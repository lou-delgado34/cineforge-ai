import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.voiceId || !body.userId) {
      return NextResponse.json(
        { error: "Missing voiceId or userId" },
        { status: 400 }
      );
    }

    const { data: voice } = await supabaseAdmin
      .from("voice_generations")
      .select("*")
      .eq("id", body.voiceId)
      .eq("user_id", body.userId)
      .maybeSingle();

    if (!voice) {
      return NextResponse.json(
        { error: "Voice not found" },
        { status: 404 }
      );
    }

    await supabaseAdmin
      .from("voice_generations")
      .delete()
      .eq("id", body.voiceId)
      .eq("user_id", body.userId);

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Voice delete failed" },
      { status: 500 }
    );
  }
}