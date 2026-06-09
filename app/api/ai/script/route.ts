import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const topic = body.topic || "AI video";
    const audience = body.audience || "creators";
    const tone = body.tone || "cinematic";

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Write a short video script.

Topic: ${topic}
Audience: ${audience}
Tone: ${tone}

Format:
Hook:
Problem:
Solution:
Call to Action:`,
    });

    return NextResponse.json({
      script: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Script generation failed." },
      { status: 500 }
    );
  }
}