"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthStatusPage() {
  const [message, setMessage] = useState("Checking auth...");

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getSession();

        if (!data.session?.user) {
          setMessage("No user is logged in.");
          return;
        }

        setMessage(`Logged in as ${data.session.user.email}`);
      } catch {
        setMessage("Auth check failed.");
      }
    }

    checkAuth();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Auth Status</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-white/70">{message}</p>
      </div>
    </main>
  );
}