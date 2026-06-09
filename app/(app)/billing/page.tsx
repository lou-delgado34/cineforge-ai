export default function BillingPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">
        Billing
      </h1>

      <div className="mt-8 rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-semibold">
          Billing History
        </h2>

        <div className="mt-4 text-white/60">
          No invoices found.
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-semibold">
          Payment Method
        </h2>

        <div className="mt-4 text-white/60">
          No payment method attached.
        </div>
      </div>
    </main>
  );
}