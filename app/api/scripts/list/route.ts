import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  const { data } = await supabaseAdmin
    .from("scripts")
    .select("*")
    .eq("user_id", body.userId)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    scripts: data || [],
  });
}