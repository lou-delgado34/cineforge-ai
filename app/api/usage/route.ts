import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data } = await supabaseAdmin
      .from("usage_logs")
      .select("*")
      .eq("user_id", body.userId)
      .order("created_at", { ascending: false });

    return NextResponse.json({ logs: data || [] });
  } catch {
    return NextResponse.json({ logs: [] });
  }
}