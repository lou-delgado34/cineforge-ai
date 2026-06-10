import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BillingCancelPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <XCircle className="mx-auto h-20 w-20 text-red-400" />

        <h1 className="mt-6 text-4xl font-bold">Payment Canceled</h1>

        <p className="mt-4 text-white/60">
          No charge was made. You can return to pricing and choose a plan anytime.
        </p>

        <Link
          href="/pricing"
          className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Return To Pricing
        </Link>
      </div>
    </main>
  );
}