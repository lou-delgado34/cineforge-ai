import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data } = await supabaseAdmin
    .from("usage_logs")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    logs: data || [],
  });
}