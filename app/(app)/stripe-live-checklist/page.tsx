export default function StripeLiveChecklistPage() {
  const checklist = [
    "Create live Stripe product: Creator",
    "Create live Stripe product: Studio",
    "Copy live Creator price ID",
    "Copy live Studio price ID",
    "Replace test Stripe secret key with live secret key",
    "Replace test Stripe publishable key with live publishable key",
    "Create live webhook endpoint",
    "Add live webhook secret to Vercel",
    "Test real checkout with small plan",
  ];

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Stripe Live Checklist</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="space-y-4">
          {checklist.map((item) => (
            <div key={item} className="rounded-xl bg-black p-4 text-white/70">
              ☐ {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}