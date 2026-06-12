import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function getImageUrl(output: unknown) {
  if (Array.isArray(output)) return String(output[0] || "");
  if (typeof output === "string") return output;
  return "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing REPLICATE_API_TOKEN" },
        { status: 500 }
      );
    }

    if (!body.imagePrompt) {
      return NextResponse.json(
        { error: "Missing imagePrompt" },
        { status: 400 }
      );
    }

    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: body.imagePrompt,
        num_outputs: 1,
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 90,
      },
    });

    return NextResponse.json({
      success: true,
      imageUrl: getImageUrl(output),
      output,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Scene image failed",
      },
      { status: 500 }
    );
  }
}