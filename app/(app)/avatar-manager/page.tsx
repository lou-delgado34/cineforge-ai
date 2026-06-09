"use client";

import { useState } from "react";
import { spendCredits, getCredits } from "@/lib/credit-store";
import { createAvatar } from "@/lib/supabase/avatars";

export default function AvatarManagerPage() {
  const [name, setName] = useState("Demo Avatar");
  const [style, setStyle] = useState("Studio presenter");
  const [language, setLanguage] = useState("English");
  const [credits, setCredits] = useState(100);
  const [message, setMessage] = useState("");

  async function createNewAvatar() {
    if (!name.trim()) {
      alert("Enter an avatar name first.");
      return;
    }

    const paid = spendCredits(30);

    if (!paid) {
      setMessage("Not enough credits. Avatar training costs 30 credits.");
      setCredits(getCredits());
      return;
    }

    try {
      await createAvatar({
        name,
        style,
        language,
        status: "Trained Supabase Avatar",
      });

      setCredits(getCredits());
      setMessage("Avatar saved to Supabase. 30 credits used.");
    } catch (error) {
      console.error(error);
      setMessage("Supabase save failed.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Avatar Manager</h1>
      <p className="mt-2 text-white/60">
        Create avatar profiles and save them to Supabase.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        Current Credits: {credits}
      </div>

      <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="text-sm text-white/60">Avatar Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Avatar Style</label>
        <input
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Language</label>
        <input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <button
          onClick={createNewAvatar}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Train Supabase Avatar
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}