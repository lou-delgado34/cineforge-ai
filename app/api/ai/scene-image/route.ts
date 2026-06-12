import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.imagePrompt) {
      return NextResponse.json(
        { error: "Missing imagePrompt" },
        { status: 400 }
      );
    }

    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: body.imagePrompt,
      },
    });

    return NextResponse.json({
      success: true,
      output,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Scene image failed",
      },
      { status: 500 }
    );
  }
}