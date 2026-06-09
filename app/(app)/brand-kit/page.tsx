"use client";

import { useState } from "react";
import { createBrandKit } from "@/lib/supabase/brand-kits";

export default function BrandKitPage() {
  const [name, setName] = useState("My Brand");
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [audience, setAudience] = useState("Creators");
  const [tone, setTone] = useState("Modern and cinematic");
  const [message, setMessage] = useState("");

  async function save() {
    try {
      await createBrandKit({
        name,
        primary_color: primaryColor,
        audience,
        tone,
      });

      setMessage("Brand kit saved to Supabase.");
    } catch (error) {
      console.error(error);
      setMessage("Supabase save failed.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Brand Kit</h1>
      <p className="mt-2 text-white/60">
        Save your brand style to Supabase.
      </p>

      <div className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <label className="text-sm text-white/60">Brand Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">
          Primary Color
        </label>
        <input
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">
          Target Audience
        </label>
        <input
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Brand Tone</label>
        <textarea
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={save}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Save Brand Kit To Supabase
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}