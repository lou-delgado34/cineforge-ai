export type VoiceJob = {
  id: string;
  title: string;
  script: string;
  voiceStyle: string;
  status: string;
  createdAt: string;
};

const VOICE_KEY = "cineforge_voice_jobs";

export function getVoiceJobs(): VoiceJob[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(VOICE_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveVoiceJob(job: VoiceJob) {
  const current = getVoiceJobs();
  localStorage.setItem(VOICE_KEY, JSON.stringify([job, ...current]));
}

export function clearVoiceJobs() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(VOICE_KEY);
}