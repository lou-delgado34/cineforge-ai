import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: body.prompt,
      size: "1024x1024",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageBase64,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}