"use client";

import { useEffect, useState } from "react";
import { getLipSyncJobs } from "@/lib/supabase/lip-sync";

type LipSyncRow = {
  id: string;
  title: string | null;
  avatar_name: string | null;
  script: string | null;
  voice_style: string | null;
  status: string | null;
  created_at: string;
};

export default function LipSyncJobsPage() {
  const [jobs, setJobs] = useState<LipSyncRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      const data = await getLipSyncJobs();
      setJobs(data);
      setLoading(false);
    }

    loadJobs();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Lip Sync Jobs</h1>
      <p className="mt-2 text-white/60">Lip sync jobs saved in Supabase.</p>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <p className="text-white/60">Loading lip sync jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold">No lip sync jobs yet</h2>
            <p className="mt-2 text-white/50">
              Generate a lip sync video to save it to Supabase.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="mt-2 text-sm text-white/50">
                Avatar: {job.avatar_name} • Voice: {job.voice_style}
              </p>
              <p className="mt-4 text-sm text-white/60">{job.script}</p>
              <p className="mt-4 text-sm text-green-400">{job.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}