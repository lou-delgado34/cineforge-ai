"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RenderJob = {
  id: string;
  title: string;
  prompt: string;
  status: string;
  progress: number;
  output_url: string | null;
  prediction_id: string | null;
  created_at: string;
};

export default function RenderQueuePage() {
  const [jobs, setJobs] = useState<RenderJob[]>([]);
  const [message, setMessage] = useState("");

  async function loadJobs() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      return;
    }

    const response = await fetch("/api/render-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();
    setJobs(result.jobs || []);
  }

  async function refreshActiveJobs() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      return;
    }

    setMessage("Refreshing active render jobs...");

    const response = await fetch("/api/render-jobs/refresh-active", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();

    await loadJobs();

    setMessage(`Render refresh complete. Updated ${result.updated || 0} jobs.`);
  }

  useEffect(() => {
    loadJobs();

    const interval = setInterval(() => {
      refreshActiveJobs();
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Render Queue</h1>
          <p className="mt-2 text-white/60">
            Active render jobs refresh every 12 seconds.
          </p>
        </div>

        <button
          onClick={refreshActiveJobs}
          className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Refresh Jobs
        </button>
      </div>

      {message && <p className="mt-4 text-green-400">{message}</p>}

      <div className="mt-8 grid gap-4">
        {jobs.length === 0 ? (
          <p className="text-white/60">No render jobs yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="mt-2 text-white/60">{job.prompt}</p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-white"
                  style={{ width: `${job.progress || 0}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-green-400">
                {job.status} — {job.progress || 0}%
              </p>

              {job.prediction_id && (
                <p className="mt-2 text-xs text-white/40">
                  Prediction: {job.prediction_id}
                </p>
              )}

              {job.output_url && (
                <a
                  href={job.output_url}
                  target="_blank"
                  className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  Open Output
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}