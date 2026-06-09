"use client";

import { videoTemplates } from "@/lib/template-store";
import { saveGeneratedVideo } from "@/lib/generation-store";
import { saveRenderJob } from "@/lib/render-store";
import { spendCredits, getCredits } from "@/lib/credit-store";
import { useState } from "react";

export default function TemplatesPage() {
  const [message, setMessage] = useState("");

  function useTemplate(templateId: string) {
    const template = videoTemplates.find((item) => item.id === templateId);

    if (!template) return;

    const paid = spendCredits(template.cost);

    if (!paid) {
      setMessage(`Not enough credits. This template costs ${template.cost} credits.`);
      return;
    }

    const id = crypto.randomUUID();

    saveGeneratedVideo({
      id,
      title: template.title,
      type: template.category,
      prompt: template.prompt,
      status: "Generated From Template",
      createdAt: new Date().toLocaleString(),
    });

    saveRenderJob({
      id,
      title: `${template.title} Render`,
      type: template.category,
      status: "Completed",
      createdAt: new Date().toLocaleString(),
    });

    setMessage(`${template.title} created. ${template.cost} credits used.`);
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Templates</h1>
      <p className="mt-2 text-white/60">
        Start fast with ready-made AI video prompts.
      </p>

      {message && <p className="mt-6 text-sm text-green-400">{message}</p>}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {videoTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-sm text-white/40">{template.category}</p>
            <h2 className="mt-2 text-xl font-semibold">{template.title}</h2>
            <p className="mt-3 text-sm text-white/50">{template.prompt}</p>
            <p className="mt-4 text-sm text-white/60">
              Cost: {template.cost} credits
            </p>

            <button
              onClick={() => useTemplate(template.id)}
              className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}