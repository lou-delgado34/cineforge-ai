import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      savedAt: new Date().toISOString(),
      project: body,
    });
  } catch {
    return NextResponse.json(
      { error: "Autosave failed." },
      { status: 500 }
    );
  }
}