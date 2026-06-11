"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type HistoryItem = {
  id: string;
  title: string;
  prompt: string;
  status: string;
  output_url: string | null;
  created_at: string;
};

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState("all");

  async function loadHistory() {
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
    setItems(result.jobs || []);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  const filtered = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "videos") return item.output_url;
    return true;
  });

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Generation History</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        {["all", "images", "videos", "voice"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-xl px-5 py-3 font-semibold ${
              filter === tab
                ? "bg-white text-black"
                : "border border-white/10 text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6">
        {filtered.length === 0 ? (
          <p className="text-white/60">No history yet.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-white/60">{item.prompt}</p>
              <p className="mt-3 text-sm text-green-400">{item.status}</p>

              {item.output_url && (
                <a
                  href={item.output_url}
                  target="_blank"
                  className="mt-4 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black"
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