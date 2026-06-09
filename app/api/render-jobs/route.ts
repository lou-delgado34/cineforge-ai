import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId) {
    return NextResponse.json({ jobs: [] });
  }

  const { data } = await supabaseAdmin
    .from("render_jobs")
    .select("*")
    .eq("user_id", body.userId)
    .order("created_at", { ascending: false });

  return NextResponse.json({ jobs: data || [] });
}