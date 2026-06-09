"use client";

import { useState } from "react";

export default function SceneToPromptsPage() {
  const [scene, setScene] = useState("");
  const [prompts, setPrompts] = useState("");

  async function generate() {
    const response = await fetch("/api/ai/image-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: scene,
      }),
    });

    const data = await response.json();

    setPrompts(data.prompt);
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">
        Scene To Prompt Converter
      </h1>

      <textarea
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        className="mt-6 min-h-40 w-full rounded-xl border border-white/10 bg-black p-4"
      />

      <button
        onClick={generate}
        className="mt-4 rounded-xl bg-white px-5 py-3 text-black"
      >
        Generate
      </button>

      {prompts && (
        <pre className="mt-6 whitespace-pre-wrap rounded-xl bg-black p-4">
          {prompts}
        </pre>
      )}
    </main>
  );
}