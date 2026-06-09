export default function ProvidersPage() {
  const providers = [
    {
      name: "OpenAI",
      connected: !!process.env.OPENAI_API_KEY,
    },
    {
      name: "ElevenLabs",
      connected: !!process.env.ELEVENLABS_API_KEY,
    },
  ];

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">
        AI Providers
      </h1>

      <div className="mt-8 grid gap-4">
        {providers.map((provider) => (
          <div
            key={provider.name}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h2 className="text-xl font-semibold">
              {provider.name}
            </h2>

            <p
              className={
                provider.connected
                  ? "mt-2 text-green-400"
                  : "mt-2 text-red-400"
              }
            >
              {provider.connected
                ? "Connected"
                : "Not Connected"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}