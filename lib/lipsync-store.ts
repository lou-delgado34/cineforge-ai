export type LipSyncJob = {
  id: string;
  title: string;
  avatarName: string;
  script: string;
  voiceStyle: string;
  status: string;
  createdAt: string;
};

const LIPSYNC_KEY = "cineforge_lipsync_jobs";

export function getLipSyncJobs(): LipSyncJob[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(LIPSYNC_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveLipSyncJob(job: LipSyncJob) {
  const current = getLipSyncJobs();

  localStorage.setItem(
    LIPSYNC_KEY,
    JSON.stringify([job, ...current])
  );
}

export function clearLipSyncJobs() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(LIPSYNC_KEY);
}