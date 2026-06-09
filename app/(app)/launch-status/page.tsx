export default function LaunchStatusPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Launch Status</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Status title="Core App" value="Complete" />
        <Status title="Auth" value="Complete" />
        <Status title="Uploads" value="Complete" />
        <Status title="Credits" value="Complete" />
        <Status title="Billing" value="Test Mode Ready" />
        <Status title="Voice" value="Ready" />
        <Status title="Image" value="Ready" />
        <Status title="Video" value="Provider Test Needed" />
        <Status title="Exports" value="Ready" />
        <Status title="Deployment" value="Next" />
      </div>
    </main>
  );
}

function Status({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-green-400">{value}</p>
    </div>
  );
}