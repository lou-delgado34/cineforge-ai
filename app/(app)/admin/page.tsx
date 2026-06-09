"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <Link
          href="/admin-usage"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h2 className="text-xl font-semibold">Usage Logs</h2>
          <p className="mt-2 text-white/60">
            View all credit activity
          </p>
        </Link>

        <Link
          href="/credits"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h2 className="text-xl font-semibold">Credits</h2>
          <p className="mt-2 text-white/60">
            View user balances
          </p>
        </Link>

        <Link
          href="/subscription"
          className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6"
        >
          <h2 className="text-xl font-semibold">Subscriptions</h2>
          <p className="mt-2 text-white/60">
            Subscription monitoring
          </p>
        </Link>

      </div>
    </main>
  );
}