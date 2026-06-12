import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const pipeline = {
      prompt,
      script: `A short cinematic video about: ${prompt}`,
      scenes: [
        {
          sceneNumber: 1,
          title: "Opening Scene",
          description: `Introduce the story visually: ${prompt}`,
          imagePrompt: `Cinematic opening shot, ${prompt}, dramatic lighting, high detail`,
        },
        {
          sceneNumber: 2,
          title: "Main Scene",
          description: `Show the main idea in action.`,
          imagePrompt: `Epic cinematic scene, ${prompt}, professional film still, realistic`,
        },
        {
          sceneNumber: 3,
          title: "Ending Scene",
          description: `End with a strong final visual.`,
          imagePrompt: `Beautiful final cinematic shot, ${prompt}, emotional, polished`,
        },
      ],
      status: "ready",
    };

    return NextResponse.json({
      success: true,
      pipeline,
    });
  } catch {
    return NextResponse.json(
      { error: "Pipeline generation failed" },
      { status: 500 }
    );
  }
}