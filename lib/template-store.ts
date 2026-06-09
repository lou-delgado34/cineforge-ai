export type VideoTemplate = {
  id: string;
  title: string;
  category: string;
  prompt: string;
  cost: number;
};

export const videoTemplates: VideoTemplate[] = [
  {
    id: "template_1",
    title: "Luxury Product Ad",
    category: "Marketing",
    prompt:
      "A cinematic luxury product ad with dramatic lighting, slow camera movement, and premium reflections.",
    cost: 10,
  },
  {
    id: "template_2",
    title: "Talking Founder Intro",
    category: "Avatar",
    prompt:
      "A friendly founder introduces a new product in a clean studio with soft lighting.",
    cost: 20,
  },
  {
    id: "template_3",
    title: "Viral Social Hook",
    category: "Social Media",
    prompt:
      "A fast-paced short video with bold opening text, quick cuts, and energetic motion.",
    cost: 10,
  },
  {
    id: "template_4",
    title: "App Demo Promo",
    category: "SaaS",
    prompt:
      "A modern SaaS app promo showing smooth dashboard animations, clean UI, and a strong call to action.",
    cost: 15,
  },
];