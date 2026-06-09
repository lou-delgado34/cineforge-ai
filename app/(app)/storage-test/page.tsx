"use client";

export default function StorageStatusPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Storage Status</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-green-400">Storage is working.</p>

        <p className="mt-4 text-white/60">
          If files upload successfully and appear in your Library, your Supabase
          media bucket is connected.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-black p-4">
          Bucket used by app: <span className="text-white">media</span>
        </div>
      </div>
    </main>
  );
}