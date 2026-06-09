import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${body.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    );

    const result = await response.json();

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        error: "Status lookup failed",
      },
      {
        status: 500,
      }
    );
  }
}