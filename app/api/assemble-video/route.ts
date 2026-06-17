import { NextResponse } from "next/server";

type AssembleVideoRequest = {
  sceneVideoUrls?: string[];
  narrationAudioUrl?: string;
  musicAudioUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssembleVideoRequest;

    const sceneVideoUrls = body.sceneVideoUrls || [];
    const narrationAudioUrl = body.narrationAudioUrl || "";
    const musicAudioUrl = body.musicAudioUrl || "";

    if (!Array.isArray(sceneVideoUrls) || sceneVideoUrls.length === 0) {
      return NextResponse.json(
        { error: "Missing scene video URLs." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Assemble video endpoint is ready. FFmpeg render engine will be connected in the next batch.",
      received: {
        sceneVideoUrls,
        narrationAudioUrl,
        musicAudioUrl,
      },
      videoUrl: sceneVideoUrls[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Video assembly failed.",
      },
      { status: 500 }
    );
  }
}