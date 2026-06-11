"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BillingSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Syncing subscription...");

  useEffect(() => {
    async function syncSubscription() {
      if (!sessionId) {
        setMessage("Subscription activated.");
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setMessage("Subscription activated. Please refresh your dashboard.");
        return;
      }

      const response = await fetch("/api/stripe/sync-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          userId: data.session.user.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`Subscription synced. Plan: ${result.plan}`);
      } else {
        setMessage(result.error || "Subscription activated.");
      }
    }

    syncSubscription();
  }, [sessionId]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-400" />

        <h1 className="mt-6 text-4xl font-bold">Subscription Activated</h1>

        <p className="mt-4 text-white/60">{message}</p>

        {sessionId && (
          <p className="mt-4 break-all rounded-xl bg-black p-4 text-sm text-white/40">
            Session ID: {sessionId}
          </p>
        )}

        <Link
          href="/dashboard/billing"
          className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Go To Billing
        </Link>
      </div>
    </main>
  );
}