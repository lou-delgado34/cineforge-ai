export default function SecurityCheckPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Security Check</h1>

      <div className="mt-8 grid gap-4">
        <Card title="Service Role Key" text="Only used inside server API routes." />
        <Card title="Public Keys" text="Only NEXT_PUBLIC keys are exposed to browser." />
        <Card title="Supabase RLS" text="Tables have RLS enabled. Policies should be reviewed before launch." />
        <Card title="Stripe Webhooks" text="Webhook signature verification is enabled." />
        <Card title="Uploads" text="Files are saved inside the media bucket." />
      </div>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-white/60">{text}</p>
    </div>
  );
}