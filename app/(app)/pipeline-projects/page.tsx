"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type PipelineProject = {
  id: string;
  prompt: string;
  status: string;
  created_at: string;
};

export default function PipelineProjectsPage() {
  const [projects, setProjects] = useState<PipelineProject[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) return;

      const response = await fetch("/api/ai/pipeline/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.session.user.id,
        }),
      });

      const result = await response.json();
      setProjects(result.projects || []);
    }

    loadProjects();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Pipeline Projects</h1>
      <p className="mt-2 text-white/60">
        Saved AI video pipeline drafts.
      </p>

      <div className="mt-8 grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-sm text-white/40">{project.status}</p>
            <h2 className="mt-2 text-xl font-bold">{project.prompt}</h2>
            <p className="mt-2 text-sm text-white/40">
              {new Date(project.created_at).toLocaleString()}
            </p>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
            No pipeline projects yet.
          </div>
        )}
      </div>

      <Link
        href="/ai-pipeline"
        className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
      >
        Create Pipeline
      </Link>
    </main>
  );
}