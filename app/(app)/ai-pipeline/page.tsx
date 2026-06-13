"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Scene = {
  sceneNumber: number;
  title: string;
  description: string;
  imagePrompt: string;
  cameraMotion?: string;
  imageUrl?: string;
  videoUrl?: string;
  error?: string;
};

export default function AiPipelinePage() {
  const [userId, setUserId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [narration, setNarration] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  async function loadProject() {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) return;

    setUserId(user.id);
  }

  useEffect(() => {
    loadProject();
  }, []);

  function buildLockedImagePrompt(scene: Scene) {
    return `
Create one cinematic 16:9 image for this exact video project.

MAIN PROJECT PROMPT:
${prompt}

SCENE NUMBER:
${scene.sceneNumber}

SCENE TITLE:
${scene.title}

SCENE DESCRIPTION:
${scene.description}

SCENE IMAGE PROMPT:
${scene.imagePrompt}

STRICT RULES:
- Match this scene only.
- Do not add unrelated characters.
- Do not change the subject.
- Do not change the setting.
- Keep the same visual style across all scenes.
- Cinematic lighting.
- High detail.
- Wide 16:9 composition.
- No text, no logos, no watermark.
`.trim();
  }

  function buildLockedVideoPrompt(scene: Scene) {
    return `
Animate this exact image into a short cinematic video clip.

MAIN PROJECT PROMPT:
${prompt}

SCENE NUMBER:
${scene.sceneNumber}

SCENE TITLE:
${scene.title}

SCENE DESCRIPTION:
${scene.description}

MOTION:
${scene.cameraMotion || "smooth cinematic camera movement"}

STRICT RULES:
- Keep the same subject from the image.
- Keep the same setting from the image.
- Do not add unrelated characters.
- Do not change the character identity.
- Do not change the scene.
- Use subtle cinematic motion.
- 5 second video.
`.trim();
  }

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
    setNarration(result.script || "");
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

    setScenes(result.result?.scenes || result.result?.data || []);
    setLoading("");
  }

  async function generateSingleImage(sceneNumber: number) {
    setError("");
    setLoading(`Generating image for Scene ${sceneNumber}...`);

    const scene = scenes.find((item) => item.sceneNumber === sceneNumber);

    if (!scene) {
      setError("Scene not found.");
      setLoading("");
      return;
    }

    const response = await fetch("/api/ai/scene-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagePrompt: buildLockedImagePrompt(scene),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Image generation failed.");
      setLoading("");
      return;
    }

    setScenes((currentScenes) =>
      currentScenes.map((item) =>
        item.sceneNumber === sceneNumber
          ? { ...item, imageUrl: result.imageUrl, error: "" }
          : item
      )
    );

    setLoading("");
  }

  async function generateSingleVideo(sceneNumber: number) {
    setError("");
    setLoading(`Generating video for Scene ${sceneNumber}...`);

    const scene = scenes.find((item) => item.sceneNumber === sceneNumber);

    if (!scene) {
      setError("Scene not found.");
      setLoading("");
      return;
    }

    if (!scene.imageUrl) {
      setError("Generate an image first.");
      setLoading("");
      return;
    }

    const response = await fetch("/api/ai/scene-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: scene.imageUrl,
        prompt: buildLockedVideoPrompt(scene),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Video generation failed.");
      setLoading("");
      return;
    }

    setScenes((currentScenes) =>
      currentScenes.map((item) =>
        item.sceneNumber === sceneNumber
          ? { ...item, videoUrl: result.videoUrl, error: "" }
          : item
      )
    );

    setLoading("");
  }

  async function generateVoice() {
    setError("");
    setLoading("Generating voice...");

    const textToSpeak = narration || script;

    if (!textToSpeak) {
      setError("Add narration text first.");
      setLoading("");
      return;
    }

    const response = await fetch("/api/ai/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textToSpeak,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Voice generation failed.");
      setLoading("");
      return;
    }

    setAudioUrl(result.audioUrl || "");
    setLoading("");
  }

  function clearDraft() {
    setPrompt("");
    setScript("");
    setScenes([]);
    setNarration("");
    setAudioUrl("");
    setError("");
    setLoading("");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">AI Generation Pipeline</h1>
      <p className="mt-2 text-white/60">
        Build a video from prompt to script, scenes, images, video clips, and voice.
      </p>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: A futuristic drone flying over a glowing desert city at sunset"
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
            onClick={clearDraft}
            className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-white"
          >
            Clear Draft
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

      {(script || narration) && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold">Voice Generation</h2>
          <p className="mt-2 text-white/60">
            Edit the narration, then generate voice.
          </p>

          <textarea
            value={narration}
            onChange={(event) => setNarration(event.target.value)}
            placeholder="Paste or edit narration here..."
            className="mt-4 min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <button
            onClick={generateVoice}
            disabled={!(narration || script) || !!loading}
            className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {audioUrl ? "Regenerate Voice" : "Generate Voice"}
          </button>

          {audioUrl && (
            <audio
              src={audioUrl}
              controls
              className="mt-4 w-full"
            />
          )}
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

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => generateSingleImage(scene.sceneNumber)}
                  disabled={!!loading}
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
                >
                  {scene.imageUrl ? "Regenerate Image" : "Generate Image"}
                </button>

                <button
                  onClick={() => generateSingleVideo(scene.sceneNumber)}
                  disabled={!scene.imageUrl || !!loading}
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
                >
                  {scene.videoUrl ? "Regenerate Video" : "Generate Video"}
                </button>
              </div>

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

              {scene.videoUrl && (
                <video
                  src={scene.videoUrl}
                  controls
                  className="mt-4 w-full rounded-xl border border-white/10"
                />
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}