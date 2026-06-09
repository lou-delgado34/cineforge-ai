"use client";

import { useEffect, useState } from "react";
import { getScenes } from "@/lib/supabase/scenes";

type SceneRow = {
  id: string;
  title: string | null;
  description: string | null;
  camera_move: string | null;
  duration: string | null;
  created_at: string;
};

export default function ScenesPage() {
  const [scenes, setScenes] = useState<SceneRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScenes() {
      const data = await getScenes();
      setScenes(data);
      setLoading(false);
    }

    loadScenes();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Scenes</h1>
      <p className="mt-2 text-white/60">Scenes saved in Supabase.</p>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <p className="text-white/60">Loading scenes...</p>
        ) : scenes.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold">No scenes yet</h2>
            <p className="mt-2 text-white/50">
              Build a scene to save it to Supabase.
            </p>
          </div>
        ) : (
          scenes.map((scene) => (
            <div
              key={scene.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{scene.title}</h2>
              <p className="mt-2 text-sm text-white/50">
                {scene.camera_move} • {scene.duration}
              </p>
              <p className="mt-4 text-sm text-white/60">
                {scene.description}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}