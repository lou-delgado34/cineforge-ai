export type BrandKit = {
  name: string;
  primaryColor: string;
  audience: string;
  tone: string;
};

const BRAND_KEY = "cineforge_brand_kit";

export function getBrandKit(): BrandKit {
  if (typeof window === "undefined") {
    return {
      name: "My Brand",
      primaryColor: "#ffffff",
      audience: "Creators",
      tone: "Modern and cinematic",
    };
  }

  const saved = localStorage.getItem(BRAND_KEY);

  if (!saved) {
    return {
      name: "My Brand",
      primaryColor: "#ffffff",
      audience: "Creators",
      tone: "Modern and cinematic",
    };
  }

  try {
    return JSON.parse(saved);
  } catch {
    return {
      name: "My Brand",
      primaryColor: "#ffffff",
      audience: "Creators",
      tone: "Modern and cinematic",
    };
  }
}

export function saveBrandKit(brandKit: BrandKit) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BRAND_KEY, JSON.stringify(brandKit));
}