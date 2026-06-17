import { NextResponse } from "next/server";
import { renderMovie } from "@/lib/ffmpeg/render-movie";
import { uploadFinalVideo } from "@/lib/storage/upload-final-video";

type AssembleVideoRequest = {
  userId?: string;
  sceneVideoUrls?: string[];
  narrationAudioUrl?: string;
  musicAudioUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssembleVideoRequest;

    if (!body.userId) {
      return NextResponse.json(
        { error: "Missing userId." },
        { status: 400 }
      );
    }

    if (!body.sceneVideoUrls || body.sceneVideoUrls.length === 0) {
      return NextResponse.json(
        { error: "Missing scene video URLs." },
        { status: 400 }
      );
    }

    const rendered = await renderMovie({
      sceneVideoUrls: body.sceneVideoUrls,
      narrationAudioUrl: body.narrationAudioUrl,
      musicAudioUrl: body.musicAudioUrl,
    });

    const uploaded = await uploadFinalVideo({
      userId: body.userId,
      filePath: rendered.outputPath,
      filename: rendered.filename,
    });

    return NextResponse.json({
      success: true,
      videoUrl: uploaded.videoUrl,
      storagePath: uploaded.storagePath,
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