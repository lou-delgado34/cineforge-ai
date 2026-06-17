import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "building",
    currentStep: "Generating Scene Images",
    progress: 48,
  });
}