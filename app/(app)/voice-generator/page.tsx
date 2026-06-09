"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VideoGeneratorPage() {
  const [title, setTitle] = useState("Balanced AI Video");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("bytedance/seedance-1-lite");
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function spendCredits(userId: string) {
    const response = await fetch("/api/credits/spend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        amount: 20,
        action: "Balanced Video Generation",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Not enough credits.");
    }
  }

  async function generateVideo() {
    if (!prompt.trim()) {
      setMessage("Enter a video prompt first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setVideoUrl("");

      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setMessage("Login required.");
        return;
      }

      const userId = data.session.user.id;

      await spendCredits(userId);

      const response = await fetch("/api/ai/video-balanced", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title,
          prompt,
          model,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Video generation failed.");
        return;
      }

      if (result.outputUrl) {
        setVideoUrl(result.outputUrl);
      }

      setMessage("Video render created. Check Render Queue and Exports.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Video generation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Balanced Video Generator</h1>

      <p className="mt-2 text-white/60">
        Cost: 20 credits. Best route for MVP testing.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <label className="text-sm text-white/60">Title</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white"
        />

        <label className="mt-6 block text-sm text-white/60">
          Model Route
        </label>

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white"
        >
          <option value="bytedance/seedance-1-lite">
            Balanced: Seedance 1 Lite
          </option>
          <option value="alibaba/happyhorse-1.0">
            Balanced: HappyHorse 1.0
          </option>
        </select>

        <label className="mt-6 block text-sm text-white/60">
          Prompt
        </label>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cinematic product video, slow camera push, soft studio lighting..."
          className="mt-2 min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white"
        />

        <button
          onClick={generateVideo}
          disabled={loading}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Balanced Video"}
        </button>

        {message && <p className="mt-4 text-green-400">{message}</p>}

        {videoUrl && (
          <video
            src={videoUrl}
            controls
            className="mt-6 max-w-3xl rounded-2xl border border-white/10"
          />
        )}
      </div>
    </main>
  );
}