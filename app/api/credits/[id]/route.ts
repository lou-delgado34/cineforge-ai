import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data } = await supabaseAdmin
    .from("credits")
    .select("*")
    .eq("user_id", params.id)
    .maybeSingle();

  return NextResponse.json({
    balance: data?.balance ?? 25,
  });
}