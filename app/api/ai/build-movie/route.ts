import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    projectId: crypto.randomUUID(),
    prompt: body.prompt,
    status: "queued",
    message:
      "Movie build pipeline started. Script → Scenes → Images → Video → Voice → Final Render",
  });
}