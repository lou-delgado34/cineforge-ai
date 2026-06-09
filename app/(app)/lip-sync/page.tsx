"use client";

import { useState } from "react";
import { spendCredits, getCredits } from "@/lib/credit-store";
import { createLipSyncJob } from "@/lib/supabase/lip-sync";

export default function LipSyncPage() {
  const [avatarName, setAvatarName] = useState("Demo Avatar");
  const [voiceStyle, setVoiceStyle] = useState("Warm narrator");
  const [script, setScript] = useState("");
  const [credits, setCredits] = useState(100);
  const [message, setMessage] = useState("");

  async function generateLipSync() {
    if (!script.trim()) {
      alert("Enter a script first.");
      return;
    }

    const paid = spendCredits(25);

    if (!paid) {
      setMessage("Not enough credits. Lip sync costs 25 credits.");
      setCredits(getCredits());
      return;
    }

    try {
      await createLipSyncJob({
        title: "Lip Sync Video",
        avatar_name: avatarName,
        script,
        voice_style: voiceStyle,
        status: "Generated Supabase Lip Sync",
      });

      setCredits(getCredits());
      setMessage("Lip sync saved to Supabase. 25 credits used.");
      setScript("");
    } catch (error) {
      console.error(error);
      setMessage("Supabase save failed.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Lip Sync</h1>
      <p className="mt-2 text-white/60">
        Match avatar mouth movement to a voice script.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        Current Credits: {credits}
      </div>

      <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="text-sm text-white/60">Avatar Name</label>
        <input
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Voice Style</label>
        <input
          value={voiceStyle}
          onChange={(e) => setVoiceStyle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Script</label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Type what the avatar should say..."
          className="mt-2 min-h-40 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={generateLipSync}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Generate Supabase Lip Sync
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}