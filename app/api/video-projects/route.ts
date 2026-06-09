import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  const { data } = await supabaseAdmin
    .from("video_projects")
    .select("*")
    .eq("user_id", body.userId)
    .order("created_at", { ascending: false });

  return NextResponse.json({ projects: data || [] });
}