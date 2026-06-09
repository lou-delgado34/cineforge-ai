export default function DatabaseStatusPage() {
  const tables = [
    "profiles",
    "projects",
    "render_jobs",
    "assets",
    "subscriptions",
  ];

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Database Status</h1>
      <p className="mt-2 text-white/60">
        Your Supabase production database foundation is ready.
      </p>

      <div className="mt-8 grid gap-4">
        {tables.map((table) => (
          <div
            key={table}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h2 className="text-xl font-semibold">{table}</h2>
            <p className="mt-2 text-green-400">Table created</p>
          </div>
        ))}
      </div>
    </main>
  );
}