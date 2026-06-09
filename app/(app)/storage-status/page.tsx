"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StorageStatusPage() {
  const [message, setMessage] = useState("Checking storage...");
  const [buckets, setBuckets] = useState<string[]>([]);

  useEffect(() => {
    async function checkStorage() {
      const { data, error } = await supabase.storage.listBuckets();

      if (error) {
        setMessage(`Storage error: ${error.message}`);
        return;
      }

      setBuckets(data.map((bucket) => bucket.name));

      const hasMedia = data.some((bucket) => bucket.name === "media");

      setMessage(
        hasMedia
          ? "Media bucket exists and storage is connected."
          : "Media bucket missing. Create a bucket named media."
      );
    }

    checkStorage();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Storage Status</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-white/70">{message}</p>

        <h2 className="mt-6 text-xl font-semibold">Buckets</h2>

        <div className="mt-4 grid gap-3">
          {buckets.length === 0 ? (
            <p className="text-white/50">No buckets found.</p>
          ) : (
            buckets.map((bucket) => (
              <div
                key={bucket}
                className="rounded-xl border border-white/10 bg-black p-4"
              >
                {bucket}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}