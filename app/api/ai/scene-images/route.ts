import { NextResponse } from "next/server";
import Replicate from "replicate";

type SceneInput = {
  sceneNumber: number;
  title: string;
  description: string;
  imagePrompt: string;
  cameraMotion?: string;
};

function getImageUrl(output: unknown) {
  if (Array.isArray(output)) {
    const first = output[0];

    if (typeof first === "string") return first;

    if (first && typeof first === "object" && "url" in first) {
      const value = (first as { url?: unknown }).url;
      if (typeof value === "string") return value;
    }
  }

  if (typeof output === "string") return output;

  return "";
}

export async function POST(request: Request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing REPLICATE_API_TOKEN in Vercel." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const scenes = body.scenes as SceneInput[];

    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json(
        { error: "No scenes were sent to the image generator." },
        { status: 400 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const generated = [];

    for (const scene of scenes) {
      const output = await replicate.run("black-forest-labs/flux-schnell", {
        input: {
          prompt: scene.imagePrompt,
          go_fast: true,
          megapixels: "1",
          num_outputs: 1,
          aspect_ratio: "16:9",
          output_format: "webp",
          output_quality: 80,
        },
      });

      generated.push({
        ...scene,
        imageUrl: getImageUrl(output),
      });
    }

    return NextResponse.json({
      success: true,
      scenes: generated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Image generation failed.",
      },
      { status: 500 }
    );
  }
}