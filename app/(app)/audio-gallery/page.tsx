"use client";

import { useEffect, useState } from "react";
import { getAssets } from "@/lib/supabase/assets";

type Asset = {
  id: string;
  title: string | null;
  type: string | null;
  url: string | null;
};

export default function AudioGalleryPage() {
  const [audio, setAudio] = useState<Asset[]>([]);

  useEffect(() => {
    async function loadAudio() {
      const data = await getAssets();
      setAudio(data.filter((item) => item.type?.startsWith("audio")));
    }

    loadAudio();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Audio Gallery</h1>
      <p className="mt-2 text-white/60">Uploaded audio files only.</p>

      <div className="mt-8 grid gap-4">
        {audio.length === 0 ? (
          <p className="text-white/50">No audio uploaded yet.</p>
        ) : (
          audio.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-semibold">{item.title}</h2>
              {item.url && <audio src={item.url} controls className="mt-4 w-full" />}
            </div>
          ))
        )}
      </div>
    </main>
  );
}