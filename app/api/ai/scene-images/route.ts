import { NextResponse } from "next/server";
import Replicate from "replicate";

type SceneInput = {
  sceneNumber: number;
  title: string;
  description: string;
  imagePrompt: string;
};

function getImageUrl(output: unknown) {
  if (Array.isArray(output)) {
    const first = output[0];

    if (typeof first === "string") return first;

    if (first && typeof first === "object" && "url" in first) {
      const urlValue = (first as { url?: unknown }).url;
      if (typeof urlValue === "string") return urlValue;
    }

    return String(first || "");
  }

  if (typeof output === "string") return output;

  return "";
}

export async function POST(request: Request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing REPLICATE_API_TOKEN in Vercel environment variables." },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const body = await request.json();
    const scenes = body.scenes as SceneInput[];

    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json({ error: "Missing scenes array." }, { status: 400 });
    }

    const generated = [];

    for (const scene of scenes) {
      if (!scene.imagePrompt) {
        generated.push({
          ...scene,
          imageUrl: "",
          error: "Missing image prompt for this scene.",
        });
        continue;
      }

      const output = await replicate.run("black-forest-labs/flux-schnell", {
        input: {
          prompt: scene.imagePrompt,
          num_outputs: 1,
          aspect_ratio: "16:9",
          output_format: "webp",
          output_quality: 90,
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
        error: error instanceof Error ? error.message : "Scene images failed.",
      },
      { status: 500 }
    );
  }
}