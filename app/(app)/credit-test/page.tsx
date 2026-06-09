"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreditTestPage() {
  const [message, setMessage] = useState("Ready to test credits.");

  async function spendCredits() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      return;
    }

    const response = await fetch("/api/credits/spend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
        amount: 1,
        action: "Manual Credit Test",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Spend failed.");
      return;
    }

    setMessage(`Credit spent. New balance: ${result.credits}`);
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Credit Test</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-white/70">{message}</p>

        <button
          onClick={spendCredits}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Spend 1 Credit
        </button>
      </div>
    </main>
  );
}