import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "CineForge AI",
    message: "API is running",
  });
}