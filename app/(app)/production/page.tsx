export default function ProductionPage() {
  const items = [
    "Supabase production project ready",
    "Supabase media bucket public",
    "OpenAI key added",
    "ElevenLabs key added",
    "Replicate token added",
    "Stripe live keys added",
    "Stripe live webhook added",
    "Vercel environment variables added",
    "Custom domain connected",
    "Final checkout test complete",
  ];

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Production Launch</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-bold">Launch Checklist</h2>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item} className="rounded-xl bg-black p-4 text-white/70">
              ☐ {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}