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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing REPLICATE_API_TOKEN in .env.local" },
        { status: 500 }
      );
    }

    if (!body.userId || !body.prompt || !body.model) {
      return NextResponse.json(
        { error: "Missing userId, prompt, or model" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.replicate.com/v1/models/${body.model}/predictions`,
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

    const predictionId = prediction.id;
    const outputUrl = getOutputUrl(prediction.output);

    const { data: job, error } = await supabaseAdmin
      .from("render_jobs")
      .insert({
        user_id: body.userId,
        title: body.title || "Balanced AI Video",
        prompt: body.prompt,
        status: prediction.status || "processing",
        progress: outputUrl ? 100 : 20,
        output_url: outputUrl,
        prediction_id: predictionId,
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
      prediction,
      predictionId,
      job,
      outputUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Balanced video generation failed." },
      { status: 500 }
    );
  }
}