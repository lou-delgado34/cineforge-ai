"use client";

import { useState } from "react";

export default function ImagePromptPage() {
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePrompt() {
    setLoading(true);

    const response = await fetch("/api/ai/image-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();

    setPrompt(data.prompt || "");
    setLoading(false);
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">
        AI Image Prompt Generator
      </h1>

      <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Describe image idea..."
          className="w-full rounded-xl border border-white/10 bg-black p-4"
        />

        <button
          onClick={generatePrompt}
          className="mt-4 rounded-xl bg-white px-5 py-3 text-black"
        >
          {loading ? "Generating..." : "Generate Prompt"}
        </button>

        {prompt && (
          <pre className="mt-6 whitespace-pre-wrap rounded-xl bg-black p-4">
            {prompt}
          </pre>
        )}
      </div>
    </main>
  );
}