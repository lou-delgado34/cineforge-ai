"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ExportItem = {
  id: string;
  title: string;
  prompt: string;
  status: string;
  progress: number;
  output_url: string | null;
  created_at: string;
};

export default function ExportsPage() {
  const [exports, setExports] = useState<ExportItem[]>([]);
  const [message, setMessage] = useState("");

  async function loadExports() {
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

    const completed = (result.jobs || []).filter(
      (job: ExportItem) => job.output_url
    );

    setExports(completed);
  }

  useEffect(() => {
    loadExports();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Exports</h1>

      <p className="mt-2 text-white/60">
        Download completed AI videos here.
      </p>

      {message && <p className="mt-4 text-green-400">{message}</p>}

      <div className="mt-8 grid gap-6">
        {exports.length === 0 ? (
          <p className="text-white/60">No exports yet.</p>
        ) : (
          exports.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-bold">{item.title}</h2>

              <p className="mt-2 text-white/60">{item.prompt}</p>

              <p className="mt-3 text-sm text-green-400">
                {item.status} — {item.progress || 100}%
              </p>

              {item.output_url && (
                <>
                  <video
                    src={item.output_url}
                    controls
                    className="mt-6 w-full max-w-3xl rounded-xl border border-white/10"
                  />

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={item.output_url}
                      target="_blank"
                      className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
                    >
                      Open Export
                    </a>

                    <a
                      href={item.output_url}
                      download
                      className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/10"
                    >
                      Download MP4
                    </a>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}