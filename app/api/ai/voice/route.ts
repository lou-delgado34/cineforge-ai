import { NextResponse } from "next/server";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export async function POST(request: Request) {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "Missing ELEVENLABS_API_KEY in Vercel." },
        { status: 500 }
      );
    }

    const body = await request.json();

    if (!body.text) {
      return NextResponse.json(
        { error: "Missing narration text." },
        { status: 400 }
      );
    }

    const voiceId = body.voiceId || DEFAULT_VOICE_ID;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: body.text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        { error: errorText || "ElevenLabs voice generation failed." },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");

    return NextResponse.json({
      success: true,
      audioUrl: `data:audio/mpeg;base64,${audioBase64}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Voice generation failed.",
      },
      { status: 500 }
    );
  }
}