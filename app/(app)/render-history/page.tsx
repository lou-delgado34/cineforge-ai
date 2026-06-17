export default function RenderHistoryPage() {
  return (
    <main className="mx-auto max-w-6xl p-8 text-white">
      <h1 className="text-4xl font-bold">
        Render History
      </h1>

      <p className="mt-2 text-white/60">
        Every completed movie render will appear here.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
        <h2 className="text-2xl font-semibold">
          No renders yet
        </h2>

        <p className="mt-4 text-white/50">
          Finished movies will automatically be listed here.
        </p>
      </div>
    </main>
  );
}