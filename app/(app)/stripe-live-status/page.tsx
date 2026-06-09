export default function StripeLiveStatusPage() {
  const hasSecret = Boolean(process.env.STRIPE_SECRET_KEY);
  const hasWebhook = Boolean(process.env.STRIPE_WEBHOOK_SECRET);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Stripe Live Status</h1>

      <div className="mt-8 grid gap-4">
        <Card title="STRIPE_SECRET_KEY" connected={hasSecret} />
        <Card title="STRIPE_WEBHOOK_SECRET" connected={hasWebhook} />
        <Card title="Live Mode" connected={true} note="Use live keys only when deploying." />
      </div>
    </main>
  );
}

function Card({
  title,
  connected,
  note,
}: {
  title: string;
  connected: boolean;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className={connected ? "mt-2 text-green-400" : "mt-2 text-red-400"}>
        {connected ? "Connected" : "Missing"}
      </p>
      {note && <p className="mt-2 text-white/60">{note}</p>}
    </div>
  );
}