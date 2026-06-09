"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreditsPage() {
  const [credits, setCredits] = useState(25);
  const [message, setMessage] = useState("Loading credits...");

  useEffect(() => {
    async function loadCredits() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setMessage("Login required.");
        return;
      }

      const response = await fetch("/api/credits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.session.user.id,
        }),
      });

      const result = await response.json();

      setCredits(result.credits || 25);
      setMessage("");
    }

    loadCredits();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Credits</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        {message ? (
          <p className="text-white/60">{message}</p>
        ) : (
          <>
            <div className="text-6xl font-bold">{credits}</div>
            <p className="mt-3 text-white/60">Available Credits</p>
          </>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-xl font-semibold">Credit Costs</h2>

        <div className="mt-4 space-y-3 text-white/70">
          <p>Script Generation: 1 credit</p>
          <p>Voice Generation: 5 credits</p>
          <p>Image Prompt: 1 credit</p>
          <p>Video Render: 20 credits</p>
        </div>
      </div>
    </main>
  );
}