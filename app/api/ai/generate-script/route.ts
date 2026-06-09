import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert cinematic video script writer.",
      },
      {
        role: "user",
        content: body.prompt,
      },
    ],
  });

  return NextResponse.json({
    script:
      completion.choices[0].message.content || "",
  });
}