"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function spendCredits(userId: string) {
    const response = await fetch("/api/credits/spend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        amount: 3,
        action: "Image Generation",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Not enough credits.");
    }
  }

  async function generateImage() {
    if (!prompt.trim()) {
      setMessage("Enter an image prompt first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setMessage("Login required.");
        return;
      }

      await spendCredits(data.session.user.id);

      const response = await fetch("/api/ai/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Image generation failed.");
        return;
      }

      setImageBase64(result.imageBase64);
      setMessage("Image generated and 3 credits used.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Image generation failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Image Generator</h1>
      <p className="mt-2 text-white/60">Cost: 3 credits per image.</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="A cinematic image of a futuristic creator studio..."
        className="mt-6 min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white"
      />

      <button
        onClick={generateImage}
        disabled={loading}
        className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {message && <p className="mt-4 text-green-400">{message}</p>}

      {imageBase64 && (
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="Generated"
          className="mt-6 max-w-xl rounded-2xl border border-white/10"
        />
      )}
    </main>
  );
}