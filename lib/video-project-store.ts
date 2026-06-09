export type VideoProject = {
  id: string;
  title: string;
  scenes: number;
  status: string;
  createdAt: string;
};

const VIDEO_PROJECT_KEY = "cineforge_video_projects";

export function getVideoProjects(): VideoProject[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(VIDEO_PROJECT_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveVideoProject(project: VideoProject) {
  const current = getVideoProjects();
  localStorage.setItem(VIDEO_PROJECT_KEY, JSON.stringify([project, ...current]));
}

export function clearVideoProjects() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(VIDEO_PROJECT_KEY);
}