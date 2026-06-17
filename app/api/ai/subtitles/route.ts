import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.prompt) {
      return NextResponse.json(
        { error: "Missing prompt." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      musicUrl:
        "https://example.com/generated-background-music.mp3",
    });
  } catch {
    return NextResponse.json(
      { error: "Music generation failed." },
      { status: 500 }
    );
  }
}