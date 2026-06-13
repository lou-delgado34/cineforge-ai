import { NextResponse } from "next/server";
import Replicate from "replicate";

function getVideoUrl(output: unknown) {
  if (typeof output === "string") return output;

  if (output && typeof output === "object" && "url" in output) {
    const possibleFile = output as { url?: () => string };

    if (typeof possibleFile.url === "function") {
      return possibleFile.url();
    }
  }

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

    if (!body.imageUrl) {
      return NextResponse.json(
        { error: "Missing imageUrl." },
        { status: 400 }
      );
    }

    if (!body.prompt) {
      return NextResponse.json(
        { error: "Missing video prompt." },
        { status: 400 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run("minimax/video-01", {
      input: {
        prompt: body.prompt,
        first_frame_image: body.imageUrl,
        prompt_optimizer: true,
      },
    });

    return NextResponse.json({
      success: true,
      videoUrl: getVideoUrl(output),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Scene video failed.",
      },
      { status: 500 }
    );
  }
}