import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("image_generations")
    .insert({
      user_id: body.userId,
      prompt: body.prompt,
      image_url: body.imageUrl,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    image: data,
  });
}