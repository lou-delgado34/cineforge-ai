"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function AccountTopbarStatus() {
  const [credits, setCredits] = useState(0);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    async function loadAccount() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) return;

      const response = await fetch("/api/account/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.session.user.id,
        }),
      });

      const result = await response.json();

      setCredits(result.credits ?? 0);
      setPlan(result.plan ?? "free");
    }

    loadAccount();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
        {credits} Credits
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-white capitalize">{plan}</p>
        <p className="text-xs text-white/50 capitalize">{plan} Plan</p>
      </div>
    </div>
  );
}