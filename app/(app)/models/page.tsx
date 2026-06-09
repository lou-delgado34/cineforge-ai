"use client";

import { useEffect, useState } from "react";
import { getModels } from "@/lib/supabase/models";

type ModelRow = {
  id: string;
  name: string | null;
  provider: string | null;
  category: string | null;
  created_at: string;
};

export default function ModelsPage() {
  const [models, setModels] = useState<ModelRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModels() {
      const data = await getModels();
      setModels(data);
      setLoading(false);
    }

    loadModels();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Models</h1>
      <p className="mt-2 text-white/60">Models saved in Supabase.</p>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <p className="text-white/60">Loading models...</p>
        ) : models.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold">No models yet</h2>
            <p className="mt-2 text-white/50">
              Add a model to save it to Supabase.
            </p>
          </div>
        ) : (
          models.map((model) => (
            <div
              key={model.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{model.name}</h2>
              <p className="mt-2 text-white/50">{model.provider}</p>
              <p className="mt-2 text-sm text-white/40">{model.category}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}