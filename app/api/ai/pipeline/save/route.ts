import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId || !body.prompt) {
      return NextResponse.json(
        { error: "Missing userId or prompt" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("pipeline_projects")
      .insert({
        user_id: body.userId,
        prompt: body.prompt,
        script: body.script || "",
        scenes: body.scenes || [],
        status: "draft",
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      project: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Save pipeline failed" },
      { status: 500 }
    );
  }
}