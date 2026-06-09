"use client";

import { useState } from "react";
import { spendCredits, getCredits } from "@/lib/credit-store";
import { createProject } from "@/lib/supabase/projects";
import { createAsset } from "@/lib/supabase/assets";
import { createRenderJob } from "@/lib/supabase/render-jobs";

export default function TextToVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [credits, setCredits] = useState(100);
  const [message, setMessage] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) {
      alert("Enter a video prompt first.");
      return;
    }

    const paid = spendCredits(10);

    if (!paid) {
      setMessage("Not enough credits. Text to video costs 10 credits.");
      setCredits(getCredits());
      return;
    }

    try {
      await createProject({
        title: "Text to Video",
        type: "Text to Video",
        prompt,
      });

      await createAsset({
        title: "Text to Video Demo",
        type: "Video",
        url: "/demo-video.mp4",
      });

      await createRenderJob({
        title: "Text to Video Render",
        type: "Text to Video",
      });

      setCredits(getCredits());
      setMessage("Saved to Supabase. 10 credits used.");
      setPrompt("");
    } catch (error) {
      console.error(error);
      setMessage("Supabase save failed. Check terminal.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Text to Video</h1>
      <p className="mt-2 text-white/60">Cost: 10 credits</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        Current Credits: {credits}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cinematic product video of glowing sneakers on a rainy city street..."
          className="min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={generateVideo}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Generate Supabase Demo Video
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}