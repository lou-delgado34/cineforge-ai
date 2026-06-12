"use client";

import { useState } from "react";

type Scene = {
  sceneNumber: number;
  title: string;
  description: string;
  imagePrompt: string;
};

export default function AiPipelinePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [pipeline, setPipeline] = useState<{
    script: string;
    scenes: Scene[];
  } | null>(null);

  async function generatePipeline() {
    setLoading(true);

    const response = await fetch("/api/ai/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    setPipeline(result.pipeline || null);
    setLoading(false);
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">AI Generation Pipeline</h1>
      <p className="mt-2 text-white/60">
        Turn one idea into a script, scenes, and image prompts.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: A futuristic sports car driving through a neon city at night"
          className="min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={generatePipeline}
          disabled={loading || !prompt}
          className="mt-4 rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Pipeline"}
        </button>
      </div>

      {pipeline && (
        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Script</h2>
            <p className="mt-3 text-white/70">{pipeline.script}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {pipeline.scenes.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm text-white/40">
                  Scene {scene.sceneNumber}
                </p>
                <h3 className="mt-2 text-xl font-bold">{scene.title}</h3>
                <p className="mt-3 text-white/60">{scene.description}</p>
                <p className="mt-4 rounded-xl bg-black p-3 text-sm text-white/50">
                  {scene.imagePrompt}
                </p>
              </div>
            ))}
          </section>
        </div>
      )}
    </main>
  );
}