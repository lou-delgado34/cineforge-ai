export type RenderJob = {
  id: string;
  title: string;
  type: string;
  status: "Queued" | "Rendering" | "Completed" | "Failed";
  createdAt: string;
};

const RENDER_KEY = "cineforge_render_jobs";

export function getRenderJobs(): RenderJob[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(RENDER_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveRenderJob(job: RenderJob) {
  const current = getRenderJobs();
  localStorage.setItem(RENDER_KEY, JSON.stringify([job, ...current]));
}

export function clearRenderJobs() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RENDER_KEY);
}