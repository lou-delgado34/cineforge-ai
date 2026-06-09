"use client";

import { useState } from "react";
import { saveGeneratedVideo } from "@/lib/generation-store";
import { spendCredits, getCredits } from "@/lib/credit-store";
import { saveRenderJob } from "@/lib/render-store";

export default function ImageToVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [credits, setCredits] = useState(100);
  const [message, setMessage] = useState("");

  function animateImage() {
    const paid = spendCredits(15);

    if (!paid) {
      setMessage("Not enough credits. Image to video costs 15 credits.");
      setCredits(getCredits());
      return;
    }

    const id = crypto.randomUUID();

    saveGeneratedVideo({
      id,
      title: "Image Animation",
      type: "Image to Video",
      prompt: prompt || "Demo image animation",
      status: "Generated Demo",
      createdAt: new Date().toLocaleString(),
    });

    saveRenderJob({
      id,
      title: "Image to Video Render",
      type: "Image to Video",
      status: "Completed",
      createdAt: new Date().toLocaleString(),
    });

    setCredits(getCredits());
    setMessage("Demo animation saved and render job completed. 15 credits used.");
    setPrompt("");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Image to Video</h1>
      <p className="mt-2 text-white/60">Cost: 15 credits</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        Current Credits: {credits}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-white/20 bg-black text-white/50">
          Image upload coming soon
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Slow camera push in, cinematic lighting, soft motion..."
          className="mt-4 min-h-32 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={animateImage}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Save Demo Animation
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}