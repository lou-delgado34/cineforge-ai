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

    if (!body.script) {
      return NextResponse.json({ error: "Missing script" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Return only valid JSON with this exact shape: { \"scenes\": [ { \"sceneNumber\": 1, \"title\": \"\", \"description\": \"\", \"imagePrompt\": \"\", \"cameraMotion\": \"\" } ] }",
        },
        {
          role: "user",
          content: `Split this script into 5 cinematic video scenes:\n\n${body.script}`,
        },
      ],
    });

    const text = response.choices[0]?.message?.content || "{\"scenes\":[]}";

    return NextResponse.json({
      success: true,
      result: JSON.parse(text),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Scene generation failed",
      },
      { status: 500 }
    );
  }
}