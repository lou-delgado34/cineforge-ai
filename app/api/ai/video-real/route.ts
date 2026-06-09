import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

function getOutputUrl(output: unknown) {
  if (!output) return null;

  if (typeof output === "string") return output;

  if (Array.isArray(output)) {
    const first = output[0];

    if (typeof first === "string") return first;

    if (first && typeof first === "object" && "url" in first) {
      return String((first as { url: string }).url);
    }
  }

  return null;
}

async function saveVideoToStorage(userId: string, videoUrl: string) {
  try {
    const videoResponse = await fetch(videoUrl);

    if (!videoResponse.ok) {
      return videoUrl;
    }

    const videoBuffer = await videoResponse.arrayBuffer();

    const filePath = `${userId}/videos/${Date.now()}-cinforge-video.mp4`;

    const { error } = await supabaseAdmin.storage
      .from("media")
      .upload(filePath, videoBuffer, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (error) {
      return videoUrl;
    }

    const { data } = supabaseAdmin.storage.from("media").getPublicUrl(filePath);

    return data.publicUrl;
  } catch {
    return videoUrl;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing REPLICATE_API_TOKEN in .env.local" },
        { status: 500 }
      );
    }

    if (!body.userId || !body.prompt) {
      return NextResponse.json(
        { error: "Missing userId or prompt" },
        { status: 400 }
      );
    }

    const model = body.model || "bytedance/seedance-1-lite";

    const response = await fetch(
      `https://api.replicate.com/v1/models/${model}/predictions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          Prefer: "wait=60",
        },
        body: JSON.stringify({
          input: {
            prompt: body.prompt,
            duration: 5,
            aspect_ratio: "16:9",
            resolution: "720p",
          },
        }),
      }
    );

    const prediction = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            prediction.detail ||
            prediction.error ||
            "Replicate video generation failed.",
        },
        { status: 500 }
      );
    }

    const replicateOutputUrl = getOutputUrl(prediction.output);

    const finalOutputUrl = replicateOutputUrl
      ? await saveVideoToStorage(body.userId, replicateOutputUrl)
      : null;

    const { data: job, error } = await supabaseAdmin
      .from("render_jobs")
      .insert({
        user_id: body.userId,
        title: body.title || "AI Video",
        prompt: body.prompt,
        status: prediction.status || "processing",
        progress: finalOutputUrl ? 100 : 25,
        output_url: finalOutputUrl,
        prediction_id: prediction.id || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      prediction,
      job,
      outputUrl: finalOutputUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Real video generation failed." },
      { status: 500 }
    );
  }
}