"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<any[]>([]);

  async function loadScripts() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) return;

    const response = await fetch("/api/scripts/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();

    setScripts(result.scripts || []);
  }

  useEffect(() => {
    loadScripts();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">
        Saved Scripts
      </h1>

      <div className="mt-8 space-y-4">
        {scripts.map((script) => (
          <div
            key={script.id}
            className="rounded-2xl border border-white/10 p-6"
          >
            <pre className="whitespace-pre-wrap">
              {script.content}
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
}