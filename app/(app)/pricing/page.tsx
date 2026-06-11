"use client";

import { supabase } from "@/lib/supabase";

export default function PricingPage() {
  async function subscribe(priceId: string) {
    if (!priceId) {
      alert("Missing Stripe Price ID");
      return;
    }

    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();

    if (result.url) {
      window.location.href = result.url;
      return;
    }

    alert(result.error || "Checkout failed");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-5xl font-bold">Pricing</h1>

      <p className="mt-2 text-white/60">
        Choose your CineForge AI creator plan.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Plan
          name="Free"
          price="$0"
          credits="25 credits"
          features={["Basic tools", "Limited generation", "Community support"]}
        />

        <Plan
          name="Creator"
          price="$29/mo"
          credits="500 credits"
          features={["HD exports", "Voice generation", "Image generation", "Video queue"]}
          button="Subscribe Creator"
          onClick={() =>
            subscribe(process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID || "")
          }
        />

        <Plan
          name="Studio"
          price="$99/mo"
          credits="3000 credits"
          features={["More video renders", "Priority queue", "Team-ready workflow", "Premium exports"]}
          button="Subscribe Studio"
          onClick={() =>
            subscribe(process.env.NEXT_PUBLIC_STRIPE_STUDIO_PRICE_ID || "")
          }
        />
      </div>
    </main>
  );
}

function Plan({
  name,
  price,
  credits,
  features,
  button,
  onClick,
}: {
  name: string;
  price: string;
  credits: string;
  features: string[];
  button?: string;
  onClick?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="mt-4 text-4xl font-bold">{price}</p>
      <p className="mt-3 text-green-400">{credits}</p>

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <p key={feature} className="text-white/70">
            {feature}
          </p>
        ))}
      </div>

      {button && (
        <button
          onClick={onClick}
          className="mt-8 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          {button}
        </button>
      )}
    </div>
  );
}