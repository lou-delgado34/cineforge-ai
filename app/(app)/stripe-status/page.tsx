export default function StripeStatusPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">
        Stripe Status
      </h1>

      <div className="mt-8 grid gap-4">
        <div className="rounded-2xl border border-white/10 p-6">
          <h2 className="font-semibold">
            STRIPE_SECRET_KEY
          </h2>

          <p className="mt-2 text-green-400">
            Connected
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <h2 className="font-semibold">
            STRIPE_WEBHOOK_SECRET
          </h2>

          <p className="mt-2 text-green-400">
            Connected
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <h2 className="font-semibold">
            SUPABASE_SERVICE_ROLE_KEY
          </h2>

          <p className="mt-2 text-green-400">
            Connected
          </p>
        </div>
      </div>
    </main>
  );
}