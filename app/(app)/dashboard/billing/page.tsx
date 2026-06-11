"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Subscription = {
  plan: string;
  status: string;
  stripe_customer_id: string | null;
  current_period_end: string | null;
};

export default function DashboardBillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [message, setMessage] = useState("");

  async function loadBilling() {
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

    setSubscription(result.subscription || null);
  }

  async function openPortal() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      alert("Login required.");
      return;
    }

    const response = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();

    if (result.url) {
      window.location.href = result.url;
      return;
    }

    alert(result.error || "Could not open billing portal.");
  }

  useEffect(() => {
    loadBilling();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Billing</h1>
      <p className="mt-2 text-white/60">Manage your subscription.</p>

      {message && <p className="mt-4 text-red-400">{message}</p>}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card title="Current Plan" value={subscription?.plan || "Free"} />
        <Card title="Stripe Status" value={subscription?.status || "Inactive"} />
        <Card
          title="Renewal Date"
          value={
            subscription?.current_period_end
              ? new Date(subscription.current_period_end).toLocaleDateString()
              : "Not active"
          }
        />
      </div>

      <button
        onClick={openPortal}
        className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black"
      >
        Manage Subscription
      </button>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-white/60">{title}</p>
      <h2 className="mt-3 text-3xl font-bold capitalize">{value}</h2>
    </div>
  );
}