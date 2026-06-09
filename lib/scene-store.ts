export type SceneItem = {
  id: string;
  title: string;
  description: string;
  cameraMove: string;
  duration: string;
  createdAt: string;
};

const SCENE_KEY = "cineforge_scenes";

export function getScenes(): SceneItem[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(SCENE_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveScene(scene: SceneItem) {
  const current = getScenes();
  localStorage.setItem(SCENE_KEY, JSON.stringify([scene, ...current]));
}

export function clearScenes() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SCENE_KEY);
}