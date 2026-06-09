"use client";

import { useState } from "react";
import { createProject } from "@/lib/supabase/projects";
import { createAsset } from "@/lib/supabase/assets";
import { createRenderJob } from "@/lib/supabase/render-jobs";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("");

  async function createTestData() {
    try {
      await createProject({
        title: "Supabase Test Project",
        type: "Text to Video",
        prompt: "A cinematic test video saved to Supabase.",
      });

      await createAsset({
        title: "Supabase Test Asset",
        type: "Video",
        url: "/demo-video.mp4",
      });

      await createRenderJob({
        title: "Supabase Test Render",
        type: "Text to Video",
      });

      setMessage("Test data saved to Supabase.");
    } catch (error) {
      console.error(error);
      setMessage("Something failed. Check terminal.");
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Supabase Test</h1>
      <p className="mt-2 text-white/60">
        Create real test rows in Supabase.
      </p>

      <button
        onClick={createTestData}
        className="mt-8 rounded-xl bg-white px-5 py-3 font-medium text-black"
      >
        Create Supabase Test Data
      </button>

      {message && <p className="mt-4 text-green-400">{message}</p>}
    </main>
  );
}