export default function VideoStorageStatusPage() {
  const hasReplicate = Boolean(process.env.REPLICATE_API_TOKEN);
  const hasSupabase = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Video Storage Status</h1>

      <div className="mt-8 grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">REPLICATE_API_TOKEN</h2>
          <p className={hasReplicate ? "mt-2 text-green-400" : "mt-2 text-red-400"}>
            {hasReplicate ? "Connected" : "Missing"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">SUPABASE_SERVICE_ROLE_KEY</h2>
          <p className={hasSupabase ? "mt-2 text-green-400" : "mt-2 text-red-400"}>
            {hasSupabase ? "Connected" : "Missing"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Video Export System</h2>
          <p className="mt-2 text-white/60">
            Render output URLs can now be displayed and downloaded from the Exports page.
          </p>
        </div>
      </div>
    </main>
  );
}