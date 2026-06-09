"use client";

import { useEffect, useState } from "react";
import { deleteAsset, getAssets } from "@/lib/supabase/assets";
import { deleteStorageFile } from "@/lib/supabase/storage";

type Asset = {
  id: string;
  title: string | null;
  type: string | null;
  url: string | null;
  file_path: string | null;
};

export default function LibraryPage() {
  const [assets, setAssets] = useState<Asset[]>([]);

  async function loadAssets() {
    const data = await getAssets();
    setAssets(data);
  }

  async function removeAsset(asset: Asset) {
    const confirmed = confirm("Delete this file forever?");

    if (!confirmed) return;

    if (asset.file_path) {
      await deleteStorageFile(asset.file_path);
    }

    await deleteAsset(asset.id);
    await loadAssets();
  }

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Media Library</h1>
      <p className="mt-2 text-white/60">Preview and manage uploaded files.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {assets.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold">No media yet</h2>
            <p className="mt-2 text-white/50">Upload a file first.</p>
          </div>
        ) : (
          assets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              {asset.url && asset.type?.startsWith("image") && (
                <img
                  src={asset.url}
                  alt={asset.title || "Uploaded file"}
                  className="h-48 w-full rounded-xl object-cover"
                />
              )}

              {asset.url && asset.type?.startsWith("video") && (
                <video
                  src={asset.url}
                  controls
                  className="h-48 w-full rounded-xl object-cover"
                />
              )}

              {asset.url && asset.type?.startsWith("audio") && (
                <audio src={asset.url} controls className="mt-4 w-full" />
              )}

              <h2 className="mt-4 font-semibold">{asset.title}</h2>
              <p className="mt-2 text-sm text-white/50">{asset.type}</p>

              <div className="mt-4 flex gap-3">
                {asset.url && (
                  <a
                    href={asset.url}
                    target="_blank"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
                  >
                    Open
                  </a>
                )}

                <button
                  onClick={() => removeAsset(asset)}
                  className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}