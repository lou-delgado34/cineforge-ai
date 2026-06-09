"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Subscription = {
  plan: string;
  status: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
};

export default function SubscriptionPage() {
  const [message, setMessage] = useState("Loading subscription...");
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    async function loadSubscription() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setMessage("Login required.");
        return;
      }

      const response = await fetch("/api/stripe/subscription-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.session.user.id,
        }),
      });

      const result = await response.json();

      if (!result.subscription) {
        setMessage("No active subscription found.");
        return;
      }

      setSubscription(result.subscription);
      setMessage("");
    }

    loadSubscription();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Subscription</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        {message && <p className="text-white/60">{message}</p>}

        {subscription && (
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {subscription.plan}
            </h2>

            <p className="mt-2 text-green-400 capitalize">
              {subscription.status}
            </p>

            <p className="mt-4 text-sm text-white/40">
              Stripe Subscription: {subscription.stripe_subscription_id}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}