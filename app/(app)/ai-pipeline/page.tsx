"use client";

import { useState } from "react";

type Scene = {
  sceneNumber: number;
  title: string;
  description: string;
  imagePrompt: string;
  cameraMotion?: string;
  imageUrl?: string;
  error?: string;
};

export default function AiPipelinePage() {
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  async function generateScript() {
    setError("");
    setLoading("Generating script...");

    const response = await fetch("/api/ai/script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Script generation failed.");
      setLoading("");
      return;
    }

    setScript(result.script || "");
    setLoading("");
  }

  async function generateScenes() {
    setError("");
    setLoading("Generating scenes...");

    const response = await fetch("/api/ai/scenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ script }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Scene generation failed.");
      setLoading("");
      return;
    }

    const sceneList = result.result?.scenes || result.result?.data || [];

    setScenes(sceneList);
    setLoading("");
  }

  async function generateImages() {
    setError("");
    setLoading("Generating scene images...");

    const response = await fetch("/api/ai/scene-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scenes }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Image generation failed.");
      setLoading("");
      return;
    }

    setScenes(result.scenes || scenes);
    setLoading("");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">AI Generation Pipeline</h1>
      <p className="mt-2 text-white/60">
        Build a video from prompt to script, scenes, and images.
      </p>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: A cyberpunk motorcycle race through neon Tokyo"
          className="min-h-36 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={generateScript}
            disabled={!prompt || !!loading}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            Generate Script
          </button>

          <button
            onClick={generateScenes}
            disabled={!script || !!loading}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            Generate Scenes
          </button>

          <button
            onClick={generateImages}
            disabled={scenes.length === 0 || !!loading}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            Generate Images
          </button>
        </div>

        {loading && <p className="mt-4 text-green-400">{loading}</p>}

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
      </section>

      {script && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold">Script</h2>
          <p className="mt-4 whitespace-pre-wrap text-white/70">{script}</p>
        </section>
      )}

      {scenes.length > 0 && (
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {scenes.map((scene) => (
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

              {scene.error && (
                <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
                  {scene.error}
                </p>
              )}

              {scene.imageUrl && (
                <img
                  src={scene.imageUrl}
                  alt={scene.title}
                  className="mt-4 rounded-xl border border-white/10"
                />
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}