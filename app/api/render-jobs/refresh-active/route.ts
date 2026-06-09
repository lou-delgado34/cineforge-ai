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
  const body = await request.json();

  if (!body.userId) {
    return NextResponse.json({ updated: 0 });
  }

  const { data: jobs } = await supabaseAdmin
    .from("render_jobs")
    .select("*")
    .eq("user_id", body.userId)
    .not("prediction_id", "is", null)
    .in("status", ["starting", "processing"]);

  let updated = 0;

  for (const job of jobs || []) {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${job.prediction_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    );

    const prediction = await response.json();

    if (!response.ok) continue;

    const outputUrl = getOutputUrl(prediction.output);

    const progress =
      prediction.status === "succeeded"
        ? 100
        : prediction.status === "failed"
          ? 0
          : 50;

    await supabaseAdmin
      .from("render_jobs")
      .update({
        status: prediction.status,
        progress,
        output_url: outputUrl,
      })
      .eq("id", job.id);

    updated++;
  }

  return NextResponse.json({ updated });
}