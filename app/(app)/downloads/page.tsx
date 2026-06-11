"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DownloadItem = {
  id: string;
  title: string;
  output_url: string | null;
  created_at: string;
};

export default function DownloadsPage() {
  const [items, setItems] = useState<DownloadItem[]>([]);

  async function loadDownloads() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) return;

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

    const downloads = (result.jobs || []).filter(
      (item: DownloadItem) => item.output_url
    );

    setItems(downloads);
  }

  useEffect(() => {
    loadDownloads();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Downloads</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.length === 0 ? (
          <p className="text-white/60">No downloads yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-bold">{item.title}</h2>

              <p className="mt-2 text-sm text-white/50">
                {new Date(item.created_at).toLocaleString()}
              </p>

              {item.output_url && (
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={item.output_url}
                    target="_blank"
                    className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-black"
                  >
                    Open
                  </a>

                  <a
                    href={item.output_url}
                    download
                    className="rounded-xl border border-white/10 px-5 py-3 text-center font-semibold text-white hover:bg-white/10"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}