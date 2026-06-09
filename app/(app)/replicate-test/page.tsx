"use client";

import { useState } from "react";

export default function ReplicateTestPage() {
  const [prompt, setPrompt] = useState(
    "A cinematic drone shot flying over snowy mountains at sunrise"
  );

  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function testModel() {
    setLoading(true);
    setResult("");
    setImageUrl("");

    const response = await fetch("/api/replicate/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();

    if (Array.isArray(data.output) && data.output.length > 0) {
      setImageUrl(data.output[0]);
    }

    setResult(JSON.stringify(data, null, 2));

    setLoading(false);
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Replicate Model Test</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mt-6 h-40 w-full rounded-xl bg-black p-4"
      />

      <button
        onClick={testModel}
        disabled={loading}
        className="mt-4 rounded-xl bg-white px-6 py-3 font-bold text-black"
      >
        {loading ? "Testing..." : "Test Replicate"}
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="AI Generated"
          className="mt-6 max-w-xl rounded-xl border border-white/10"
        />
      )}

      <pre className="mt-6 overflow-auto rounded-xl bg-black p-6">
        {result}
      </pre>
    </main>
  );
}