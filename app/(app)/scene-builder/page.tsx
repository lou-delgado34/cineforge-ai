"use client";

import { useState } from "react";
import { createScene } from "@/lib/supabase/scenes";

export default function SceneBuilderPage() {
  const [title, setTitle] = useState("Opening Scene");
  const [description, setDescription] = useState("");
  const [cameraMove, setCameraMove] = useState("Slow push in");
  const [duration, setDuration] = useState("5 seconds");
  const [message, setMessage] = useState("");

  async function createNewScene() {
    if (!description.trim()) {
      alert("Enter a scene description first.");
      return;
    }

    try {
      await createScene({
        title,
        description,
        camera_move: cameraMove,
        duration,
      });

      setMessage("Scene saved to Supabase.");
      setDescription("");
    } catch (error) {
      console.error(error);
      setMessage("Supabase save failed.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Scene Builder</h1>
      <p className="mt-2 text-white/60">
        Plan scenes and save them to Supabase.
      </p>

      <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="text-sm text-white/60">Scene Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">
          Scene Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A cinematic founder walking through a bright studio..."
          className="mt-2 min-h-36 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Camera Move</label>
        <input
          value={cameraMove}
          onChange={(e) => setCameraMove(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">Duration</label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <button
          onClick={createNewScene}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Save Scene To Supabase
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}