"use client";

import { useState } from "react";
import { createScript } from "@/lib/supabase/scripts";

export default function ScriptGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Creators");
  const [tone, setTone] = useState("Cinematic");
  const [script, setScript] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateScript() {
    if (!topic.trim()) {
      alert("Enter a video topic first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/ai/script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          audience,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "AI generation failed.");
        return;
      }

      setScript(data.script);
      setMessage("AI script generated.");
    } catch (error) {
      console.error(error);
      setMessage("AI generation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function saveScript() {
    if (!script.trim()) {
      alert("Generate a script first.");
      return;
    }

    try {
      await createScript({
        title: topic,
        topic,
        audience,
        tone,
        script,
      });

      setMessage("Script saved to Supabase.");
    } catch (error) {
      console.error(error);
      setMessage("Save failed.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">AI Script Generator</h1>
      <p className="mt-2 text-white/60">
        Generate a real AI script with OpenAI and save it to Supabase.
      </p>

      <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="text-sm text-white/60">Video Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Launching a skincare brand"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Audience</label>
        <input
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Tone</label>
        <input
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <div className="mt-6 flex gap-3">
          <button
            onClick={generateScript}
            disabled={loading}
            className="rounded-xl bg-white px-5 py-3 font-medium text-black"
          >
            {loading ? "Generating..." : "Generate AI Script"}
          </button>

          <button
            onClick={saveScript}
            className="rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-white/10"
          >
            Save Script
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}

        {script && (
          <pre className="mt-6 whitespace-pre-wrap rounded-xl bg-black p-4 text-sm text-white/70">
            {script}
          </pre>
        )}
      </div>
    </main>
  );
}