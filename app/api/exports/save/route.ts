import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.jobId || !body.userId || !body.outputUrl) {
      return NextResponse.json(
        { error: "Missing jobId, userId, or outputUrl" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("render_jobs")
      .update({
        output_url: body.outputUrl,
        status: "exported",
        progress: 100,
      })
      .eq("id", body.jobId)
      .eq("user_id", body.userId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      export: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Export save failed." },
      { status: 500 }
    );
  }
}