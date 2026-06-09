"use client";

import { useEffect, useState } from "react";
import { getAvatars } from "@/lib/supabase/avatars";

type AvatarRow = {
  id: string;
  name: string | null;
  style: string | null;
  language: string | null;
  status: string | null;
  created_at: string;
};

export default function AvatarsPage() {
  const [avatars, setAvatars] = useState<AvatarRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAvatars() {
      const data = await getAvatars();
      setAvatars(data);
      setLoading(false);
    }

    loadAvatars();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Avatars</h1>
      <p className="mt-2 text-white/60">Avatars saved in Supabase.</p>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <p className="text-white/60">Loading avatars...</p>
        ) : avatars.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold">No avatars yet</h2>
            <p className="mt-2 text-white/50">
              Train an avatar to save it to Supabase.
            </p>
          </div>
        ) : (
          avatars.map((avatar) => (
            <div
              key={avatar.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{avatar.name}</h2>
              <p className="mt-2 text-sm text-white/50">
                {avatar.style} • {avatar.language}
              </p>
              <p className="mt-4 text-sm text-green-400">{avatar.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}