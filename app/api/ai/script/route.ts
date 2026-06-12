import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    if (!body.prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You write short cinematic video scripts for AI video generation. Use clear visual language. Keep it under 45 seconds.",
        },
        {
          role: "user",
          content: `Create a cinematic video script for: ${body.prompt}`,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      script: response.choices[0]?.message?.content || "",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Script generation failed",
      },
      { status: 500 }
    );
  }
}