export default function ReplicateStatusPage() {
  const token = Boolean(process.env.REPLICATE_API_TOKEN);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Replicate Status</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-bold">REPLICATE_API_TOKEN</h2>

        <p className="mt-2 text-green-400">
          {token ? "Connected" : "Missing"}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-bold">Available Models</h2>

        <ul className="mt-4 space-y-2 text-white/70">
          <li>Flux Schnell (Images)</li>
          <li>Flux Dev (Images)</li>
          <li>Kling (Video)</li>
          <li>MiniMax Video</li>
          <li>Luma Ray</li>
        </ul>
      </div>
    </main>
  );
}