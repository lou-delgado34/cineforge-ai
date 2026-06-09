"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type VideoProject = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

export default function VideoProjectsPage() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function loadProjects() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      return;
    }

    const response = await fetch("/api/video-projects", {
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

  async function createProject() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      return;
    }

    if (!title.trim()) {
      setMessage("Project title required.");
      return;
    }

    const response = await fetch("/api/video-projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
        title,
        description,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Project failed.");
      return;
    }

    setTitle("");
    setDescription("");
    setMessage("Project created.");
    loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Video Projects</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-bold">Create Project</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="mt-4 w-full rounded-xl border border-white/10 bg-black p-4 text-white"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          className="mt-4 min-h-28 w-full rounded-xl border border-white/10 bg-black p-4 text-white"
        />

        <button
          onClick={createProject}
          className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Create Project
        </button>

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-white/60">No video projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="mt-2 text-white/60">{project.description}</p>
              <p className="mt-4 text-sm text-green-400">{project.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}