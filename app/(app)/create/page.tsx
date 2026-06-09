import Link from "next/link";

const tools = [
  {
    title: "Text to Video",
    href: "/create/text-to-video",
    description: "Turn a prompt into a short AI video.",
  },
  {
    title: "Image to Video",
    href: "/create/image-to-video",
    description: "Upload an image and animate it.",
  },
  {
    title: "Avatar Video",
    href: "/create/avatar-video",
    description: "Generate a talking avatar from a script.",
  },
];

export default function CreatePage() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Create</h1>
      <p className="mt-2 text-white/60">
        Choose your AI video workflow.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06]"
          >
            <h2 className="text-xl font-semibold">{tool.title}</h2>
            <p className="mt-2 text-sm text-white/50">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}