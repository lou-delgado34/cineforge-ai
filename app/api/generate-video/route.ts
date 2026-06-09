import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    type: body.type || "Text to Video",
    prompt: body.prompt || "",
    status: "completed_demo",
    videoUrl: "/demo-video.mp4",
  });
}