import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId) {
    return NextResponse.json({ voices: [] });
  }

  const { data } = await supabaseAdmin
    .from("voice_generations")
    .select("*")
    .eq("user_id", body.userId)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    voices: data || [],
  });
}