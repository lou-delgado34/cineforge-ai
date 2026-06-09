import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const userId = formData.get("userId") as string;
    const file = formData.get("file") as File;

    if (!userId || !file) {
      return NextResponse.json(
        { error: "Missing userId or file" },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();

    const filePath = `${userId}/voices/${Date.now()}-voice.mp3`;

    const { error } = await supabaseAdmin.storage
      .from("media")
      .upload(filePath, fileBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const { data } = supabaseAdmin.storage
      .from("media")
      .getPublicUrl(filePath);

    return NextResponse.json({
      audioUrl: data.publicUrl,
      filePath,
    });
  } catch {
    return NextResponse.json(
      { error: "Audio upload failed" },
      { status: 500 }
    );
  }
}