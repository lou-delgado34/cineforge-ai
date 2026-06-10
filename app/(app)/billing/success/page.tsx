import Link from "next/link";
import { CheckCircle } from "lucide-react";

type BillingSuccessPageProps = {
  searchParams?: Promise<{
    session_id?: string;
  }>;
};

export default async function BillingSuccessPage({
  searchParams,
}: BillingSuccessPageProps) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-400" />

        <h1 className="mt-6 text-4xl font-bold">Subscription Activated</h1>

        <p className="mt-4 text-white/60">
          Your CineForge AI subscription is active. Your account is ready to use.
        </p>

        {sessionId && (
          <p className="mt-4 break-all rounded-xl bg-black p-4 text-sm text-white/40">
            Session ID: {sessionId}
          </p>
        )}

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Go To Dashboard
        </Link>
      </div>
    </main>
  );
}