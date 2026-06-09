"use client";

import { useEffect, useState } from "react";
import { getCredits } from "@/lib/credit-store";
import { getGeneratedVideos } from "@/lib/generation-store";
import { getRenderJobs } from "@/lib/render-store";
import { getScripts } from "@/lib/script-store";
import { getVoiceJobs } from "@/lib/voice-store";
import { getAvatars } from "@/lib/avatar-store";
import { getScenes } from "@/lib/scene-store";

export default function PlatformPage() {
  const [stats, setStats] = useState({
    credits: 0,
    projects: 0,
    renders: 0,
    scripts: 0,
    voices: 0,
    avatars: 0,
    scenes: 0,
  });

  useEffect(() => {
    setStats({
      credits: getCredits(),
      projects: getGeneratedVideos().length,
      renders: getRenderJobs().length,
      scripts: getScripts().length,
      voices: getVoiceJobs().length,
      avatars: getAvatars().length,
      scenes: getScenes().length,
    });
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">CineForge Platform Center</h1>
      <p className="mt-2 text-white/60">
        Your full AI video platform overview.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Stat title="Credits" value={stats.credits} />
        <Stat title="Projects" value={stats.projects} />
        <Stat title="Render Jobs" value={stats.renders} />
        <Stat title="Scripts" value={stats.scripts} />
        <Stat title="Voices" value={stats.voices} />
        <Stat title="Avatars" value={stats.avatars} />
        <Stat title="Scenes" value={stats.scenes} />
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-white/50">{title}</p>
      <h2 className="mt-3 text-3xl font-bold">{value}</h2>
    </div>
  );
}