"use client";

type Props = {
  progress: number;
  step: string;
};

export function BuildProgress({ progress, step }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-bold">AI Pipeline Progress</h2>

      <p className="mt-3 text-white/60">{step}</p>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-white/40">
        {progress}% Complete
      </p>
    </div>
  );
}