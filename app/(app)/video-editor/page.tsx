"use client";

import { useEffect, useState } from "react";
import { getScenes } from "@/lib/scene-store";
import { saveVideoProject } from "@/lib/video-project-store";
import { saveRenderJob } from "@/lib/render-store";

export default function VideoEditorPage() {
  const [title, setTitle] = useState("My Multi-Scene Video");
  const [sceneCount, setSceneCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSceneCount(getScenes().length);
  }, []);

  function buildVideo() {
    if (sceneCount === 0) {
      alert("Create at least one scene first.");
      return;
    }

    const id = crypto.randomUUID();

    saveVideoProject({
      id,
      title,
      scenes: sceneCount,
      status: "Demo Multi-Scene Video Built",
      createdAt: new Date().toLocaleString(),
    });

    saveRenderJob({
      id,
      title: `${title} Render`,
      type: "Multi-Scene Video",
      status: "Completed",
      createdAt: new Date().toLocaleString(),
    });

    setMessage("Multi-scene demo video created and sent to render queue.");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Video Editor</h1>
      <p className="mt-2 text-white/60">
        Combine saved scenes into one video project.
      </p>

      <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="text-sm text-white/60">Video Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <div className="mt-6 rounded-xl border border-white/10 bg-black p-4">
          Saved Scenes: {sceneCount}
        </div>

        <button
          onClick={buildVideo}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Build Demo Video
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}