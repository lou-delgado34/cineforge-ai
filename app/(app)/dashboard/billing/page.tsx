"use client";

export default function DashboardBillingPage() {
  async function openPortal() {
    alert("Stripe customer portal will be connected in the next billing batch.");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Billing</h1>
      <p className="mt-2 text-white/60">Manage your subscription.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card title="Current Plan" value="Free" />
        <Card title="Stripe Status" value="Connected" />
        <Card title="Renewal Date" value="Not active" />
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
      <h2 className="mt-3 text-3xl font-bold">{value}</h2>
    </div>
  );
}