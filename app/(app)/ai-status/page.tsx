export default function AIStatusPage() {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">AI Status</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-xl font-semibold">OpenAI</h2>

        <p className={hasOpenAI ? "mt-2 text-green-400" : "mt-2 text-red-400"}>
          {hasOpenAI
            ? "OPENAI_API_KEY is installed."
            : "OPENAI_API_KEY is missing from .env.local."}
        </p>
      </div>
    </main>
  );
}