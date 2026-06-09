export type AIModel = {
  id: string;
  name: string;
  provider: string;
  category: string;
  createdAt: string;
};

const MODEL_KEY = "cineforge_models";

export function getModels(): AIModel[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(MODEL_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveModel(model: AIModel) {
  const current = getModels();

  localStorage.setItem(
    MODEL_KEY,
    JSON.stringify([model, ...current])
  );
}

export function clearModels() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(MODEL_KEY);
}