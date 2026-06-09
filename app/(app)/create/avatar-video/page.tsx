"use client";

import { useState } from "react";
import { saveGeneratedVideo } from "@/lib/generation-store";
import { spendCredits, getCredits } from "@/lib/credit-store";
import { saveRenderJob } from "@/lib/render-store";

export default function AvatarVideoPage() {
  const [script, setScript] = useState("");
  const [credits, setCredits] = useState(100);
  const [message, setMessage] = useState("");

  function generateAvatarVideo() {
    if (!script.trim()) {
      alert("Enter an avatar script first.");
      return;
    }

    const paid = spendCredits(20);

    if (!paid) {
      setMessage("Not enough credits. Avatar video costs 20 credits.");
      setCredits(getCredits());
      return;
    }

    const id = crypto.randomUUID();

    saveGeneratedVideo({
      id,
      title: "Avatar Video",
      type: "Avatar Video",
      prompt: script,
      status: "Generated Demo",
      createdAt: new Date().toLocaleString(),
    });

    saveRenderJob({
      id,
      title: "Avatar Video Render",
      type: "Avatar Video",
      status: "Completed",
      createdAt: new Date().toLocaleString(),
    });

    setCredits(getCredits());
    setMessage("Demo avatar video saved and render job completed. 20 credits used.");
    setScript("");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Avatar Video</h1>
      <p className="mt-2 text-white/60">Cost: 20 credits</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        Current Credits: {credits}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Hi, welcome to our product demo..."
          className="min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={generateAvatarVideo}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Generate Demo Avatar Video
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}