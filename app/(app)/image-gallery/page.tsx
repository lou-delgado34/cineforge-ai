"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ImageRecord = {
  id: string;
  prompt: string;
  image_url: string;
};

export default function ImageGalleryPage() {
  const [images, setImages] = useState<ImageRecord[]>([]);

  useEffect(() => {
    async function loadImages() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) return;

      const response = await fetch("/api/images/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.session.user.id,
        }),
      });

      const result = await response.json();

      setImages(result.images || []);
    }

    loadImages();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Image Library</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-2xl border border-white/10 p-4"
          >
            <img
              src={image.image_url}
              alt=""
              className="rounded-xl"
            />

            <p className="mt-3 text-sm text-white/60">
              {image.prompt}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}