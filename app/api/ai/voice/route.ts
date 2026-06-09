import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: body.text,
          model_id: "eleven_multilingual_v2",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("ElevenLabs request failed");
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Voice generation failed",
      },
      {
        status: 500,
      }
    );
  }
}