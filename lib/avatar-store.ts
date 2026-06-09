export type AvatarProfile = {
  id: string;
  name: string;
  style: string;
  language: string;
  status: string;
  createdAt: string;
};

const AVATAR_KEY = "cineforge_avatars";

export function getAvatars(): AvatarProfile[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(AVATAR_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveAvatar(avatar: AvatarProfile) {
  const current = getAvatars();
  localStorage.setItem(AVATAR_KEY, JSON.stringify([avatar, ...current]));
}

export function clearAvatars() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AVATAR_KEY);
}