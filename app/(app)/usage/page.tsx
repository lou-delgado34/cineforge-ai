"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UsagePage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    async function loadLogs() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) return;

      const response = await fetch(
        `/api/usage/${data.session.user.id}`
      );

      const result = await response.json();

      setLogs(result.logs || []);
    }

    loadLogs();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">My Usage</h1>

      <div className="mt-8 space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div>{log.action}</div>

            <div className="mt-2 text-sm text-white/50">
              {log.credits_used} credits
            </div>

            <div className="text-sm text-white/50">
              {new Date(log.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}