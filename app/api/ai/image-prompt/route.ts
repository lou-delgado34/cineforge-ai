import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Create a cinematic image generation prompt.

Topic:
${body.topic}

Return only the prompt.
`,
    });

    return NextResponse.json({
      prompt: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed generating prompt" },
      { status: 500 }
    );
  }
}