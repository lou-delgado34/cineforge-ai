import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.script) {
      return NextResponse.json({ error: "Missing script" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Split scripts into 5 cinematic scenes. Return only valid JSON. No markdown.",
        },
        {
          role: "user",
          content: `
Create 5 scenes from this script.

Each scene must have:
sceneNumber
title
description
imagePrompt
cameraMotion

Script:
${body.script}
          `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content || "{}";

    return NextResponse.json({
      success: true,
      result: JSON.parse(text),
    });
  } catch {
    return NextResponse.json(
      { error: "Scene generation failed" },
      { status: 500 }
    );
  }
}