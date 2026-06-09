import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId || !body.videoUrl) {
      return NextResponse.json(
        { error: "Missing userId or videoUrl" },
        { status: 400 }
      );
    }

    const videoResponse = await fetch(body.videoUrl);
    const videoBuffer = await videoResponse.arrayBuffer();

    const filePath = `${body.userId}/videos/${Date.now()}-export.mp4`;

    const { error } = await supabaseAdmin.storage
      .from("media")
      .upload(filePath, videoBuffer, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage
      .from("media")
      .getPublicUrl(filePath);

    return NextResponse.json({
      videoUrl: data.publicUrl,
      filePath,
    });
  } catch {
    return NextResponse.json(
      { error: "Video upload failed." },
      { status: 500 }
    );
  }
}