"use client";

import { useState } from "react";
import { createModel } from "@/lib/supabase/models";

export default function ModelManagerPage() {
  const [name, setName] = useState("CineForge Motion V1");
  const [provider, setProvider] = useState("OpenAI");
  const [category, setCategory] = useState("Text To Video");
  const [message, setMessage] = useState("");

  async function saveModel() {
    try {
      await createModel({
        name,
        provider,
        category,
      });

      setMessage("Model saved to Supabase.");
    } catch (error) {
      console.error(error);
      setMessage("Supabase save failed.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Model Manager</h1>
      <p className="mt-2 text-white/60">Save AI model records to Supabase.</p>

      <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="text-sm text-white/60">Model Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Provider</label>
        <input
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={saveModel}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Save Model To Supabase
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}