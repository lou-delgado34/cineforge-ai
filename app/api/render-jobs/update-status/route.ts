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

    if (!body.jobId || !body.predictionId) {
      return NextResponse.json(
        { error: "Missing jobId or predictionId" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${body.predictionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    );

    const prediction = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: prediction.detail || "Replicate status failed." },
        { status: 500 }
      );
    }

    const outputUrl = getOutputUrl(prediction.output);

    const progress =
      prediction.status === "succeeded"
        ? 100
        : prediction.status === "failed"
          ? 0
          : 50;

    const { data, error } = await supabaseAdmin
      .from("render_jobs")
      .update({
        status: prediction.status,
        progress,
        output_url: outputUrl,
      })
      .eq("id", body.jobId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      job: data,
      prediction,
    });
  } catch {
    return NextResponse.json(
      { error: "Render update failed." },
      { status: 500 }
    );
  }
}