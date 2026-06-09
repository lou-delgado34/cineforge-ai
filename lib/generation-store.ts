export type GeneratedVideo = {
  id: string;
  title: string;
  type: string;
  prompt: string;
  status: string;
  createdAt: string;
};

const STORAGE_KEY = "cineforge_generated_videos";

export function saveGeneratedVideo(video: GeneratedVideo) {
  const current = getGeneratedVideos();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([video, ...current]));
}

export function getGeneratedVideos(): GeneratedVideo[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function clearGeneratedVideos() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}