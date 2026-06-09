import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId || !body.title) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("render_jobs")
    .insert({
      user_id: body.userId,
      project_id: body.projectId || null,
      title: body.title,
      prompt: body.prompt || "",
      status: "pending",
      progress: 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ job: data });
}