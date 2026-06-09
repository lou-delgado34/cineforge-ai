"use client";

import { useEffect, useState } from "react";

type UsageLog = {
  id: string;
  user_id: string;
  action: string;
  credits_used: number;
  created_at: string;
};

export default function AdminUsagePage() {
  const [logs, setLogs] = useState<UsageLog[]>([]);

  useEffect(() => {
    async function loadLogs() {
      const response = await fetch("/api/admin/usage");
      const result = await response.json();
      setLogs(result.logs || []);
    }

    loadLogs();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Admin Usage</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        {logs.length === 0 ? (
          <p className="text-white/60">No usage logs yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="rounded-xl bg-black p-4">
                <p className="font-semibold">{log.action}</p>
                <p className="text-sm text-white/50">
                  User: {log.user_id}
                </p>
                <p className="text-sm text-white/50">
                  Credits used: {log.credits_used}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}