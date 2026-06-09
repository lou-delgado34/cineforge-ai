"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/supabase/projects";

type Project = {
  id: string;
  title: string;
  type: string | null;
  status: string | null;
  prompt: string | null;
  created_at: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }

    loadProjects();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-white/60">Projects saved in Supabase.</p>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <p className="text-white/60">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold">No projects yet</h2>
            <p className="mt-2 text-white/50">
              Supabase is connected, but no projects are saved yet.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-white/50">{project.type}</p>
              <p className="mt-2 text-sm text-white/40">{project.prompt}</p>
              <p className="mt-4 text-sm text-green-400">{project.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}