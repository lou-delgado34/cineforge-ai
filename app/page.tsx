import Link from "next/link";
import {
  Video,
  Sparkles,
  Wand2,
  Camera,
  Mic,
  CreditCard,
  LayoutTemplate,
  ListVideo,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Original AI video creation platform
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Create cinematic AI videos from prompts, images, scripts, and avatars.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60">
          CineForge AI helps creators generate short videos, talking avatars,
          ads, product clips, social content, and branded scenes in one simple
          workspace.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-xl bg-white px-6 py-3 font-medium text-black"
          >
            Enter App
          </Link>

          <Link
            href="/templates"
            className="rounded-xl border border-white/15 px-6 py-3 font-medium text-white"
          >
            Browse Templates
          </Link>
        </div>

        <div className="mt-20 grid w-full gap-4 md:grid-cols-4">
          <Feature icon={<Video />} title="Text to Video" />
          <Feature icon={<Wand2 />} title="Image to Video" />
          <Feature icon={<Camera />} title="Camera Motion" />
          <Feature icon={<Mic />} title="Voice + Lip Sync" />
          <Feature icon={<Sparkles />} title="Scene Generator" />
          <Feature icon={<CreditCard />} title="Credits + Billing" />
          <Feature icon={<LayoutTemplate />} title="Templates" />
          <Feature icon={<ListVideo />} title="Render Queue" />
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
      <div className="mb-4 text-white/80">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/50">
        Built for fast creative workflows and short-form video production.
      </p>
    </div>
  );
}