"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getCredits } from "@/lib/credit-store";

export default function DashboardPage() {
  const [email, setEmail] = useState("Checking login...");
  const [credits, setCredits] = useState(100);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email || "User");
      setCredits(getCredits());
    }

    checkUser();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-white/60">Logged in as {email}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard title="Credits" value={credits.toString()} />
        <StatCard title="Plan" value="Free" />
        <StatCard title="Database" value="Supabase" />
      </div>

      <h2 className="mt-10 text-2xl font-bold">Quick Start</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <DashboardCard title="Text to Video" href="/create/text-to-video" />
        <DashboardCard title="Script Generator" href="/script-generator" />
        <DashboardCard title="Voice Generator" href="/voice-generator" />
        <DashboardCard title="Scene Builder" href="/scene-builder" />
      </div>

      <h2 className="mt-10 text-2xl font-bold">Media Tools</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <DashboardCard title="Upload Media" href="/upload" />
        <DashboardCard title="Asset Browser" href="/asset-browser" />
        <DashboardCard title="Images" href="/image-gallery" />
        <DashboardCard title="Videos" href="/video-gallery" />
        <DashboardCard title="Audio" href="/audio-gallery" />
        <DashboardCard title="Library" href="/library" />
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-white/50">{title}</p>
      <h2 className="mt-3 truncate text-3xl font-bold">{value}</h2>
    </div>
  );
}

function DashboardCard({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06]"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-white/50">Open this workflow.</p>
    </Link>
  );
}