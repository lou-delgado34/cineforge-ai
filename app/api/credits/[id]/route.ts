import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data } = await supabaseAdmin
    .from("credits")
    .select("*")
    .eq("user_id", id)
    .maybeSingle();

  return NextResponse.json({
    balance: data?.balance ?? 25,
  });
}