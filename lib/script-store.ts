export type ScriptDraft = {
  id: string;
  title: string;
  topic: string;
  audience: string;
  tone: string;
  script: string;
  createdAt: string;
};

const SCRIPT_KEY = "cineforge_scripts";

export function getScripts(): ScriptDraft[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(SCRIPT_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveScript(script: ScriptDraft) {
  const current = getScripts();
  localStorage.setItem(SCRIPT_KEY, JSON.stringify([script, ...current]));
}

export function clearScripts() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SCRIPT_KEY);
}