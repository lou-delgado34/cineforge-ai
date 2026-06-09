import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("usage_logs")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ logs: data || [] });
}