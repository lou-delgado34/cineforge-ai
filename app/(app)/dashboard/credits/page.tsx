export default function DashboardCreditsPage() {
  const currentCredits = 100;
  const creditsUsed = 0;
  const totalCredits = currentCredits + creditsUsed;
  const percentUsed = totalCredits > 0 ? (creditsUsed / totalCredits) * 100 : 0;

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Credits</h1>
      <p className="mt-2 text-white/60">Track your CineForge AI credits.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card title="Current Credits" value={currentCredits.toString()} />
        <Card title="Credits Used" value={creditsUsed.toString()} />
        <Card title="Credits Remaining" value={currentCredits.toString()} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-bold">Monthly Credit Usage</h2>

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-white"
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <p className="mt-4 text-white/60">
          {creditsUsed} of {totalCredits} credits used this month.
        </p>
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-white/60">{title}</p>
      <h2 className="mt-3 text-4xl font-bold">{value}</h2>
    </div>
  );
}