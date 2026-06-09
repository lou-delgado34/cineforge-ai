import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="p-6 text-white">
      <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl font-bold">Payment Successful</h1>

        <p className="mt-4 text-white/60">
          Your payment was accepted. Stripe will send a webhook to update your
          subscription in Supabase.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/subscription"
            className="rounded-xl bg-white px-5 py-3 font-medium text-black"
          >
            View Subscription
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}