"use client";

import { useEffect, useState } from "react";
import { getAssets } from "@/lib/supabase/assets";

type Asset = {
  id: string;
  title: string | null;
  type: string | null;
  url: string | null;
};

export default function AssetBrowserPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadAssets() {
      const data = await getAssets();
      setAssets(data);
    }

    loadAssets();
  }, []);

  const filteredAssets = assets.filter((asset) => {
    if (filter === "all") return true;
    return asset.type?.startsWith(filter);
  });

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Asset Browser</h1>
      <p className="mt-2 text-white/60">Search your uploaded creative assets.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {["all", "image", "video", "audio"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-xl px-4 py-2 text-sm ${
              filter === item
                ? "bg-white text-black"
                : "border border-white/10 text-white/70"
            }`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {filteredAssets.length === 0 ? (
          <p className="text-white/50">No assets found.</p>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h2 className="font-semibold">{asset.title}</h2>
              <p className="mt-2 text-sm text-white/50">{asset.type}</p>

              {asset.url && (
                <a
                  href={asset.url}
                  target="_blank"
                  className="mt-4 inline-block text-sm text-blue-400"
                >
                  Open Asset
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}