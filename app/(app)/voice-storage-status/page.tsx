export default function VoiceStorageStatusPage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Voice Storage Status</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-green-400">ElevenLabs voice generation is connected.</p>

        <p className="mt-4 text-white/60">
          The next production step is saving generated audio files into Supabase
          Storage instead of temporary browser object URLs.
        </p>

        <div className="mt-6 rounded-xl bg-black p-4 text-white/70">
          Current: voice record saved to database.
          <br />
          Next: audio file saved permanently to media bucket.
        </div>
      </div>
    </main>
  );
}