"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RenderMoviePage() {
  const [sceneVideos, setSceneVideos] = useState("");
  const [voiceUrl, setVoiceUrl] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  async function renderMovie() {
    setLoading(true);
    setMessage("");
    setVideoUrl("");

    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      setLoading(false);
      return;
    }

    const videos = sceneVideos
      .split("\n")
      .map((video) => video.trim())
      .filter(Boolean);

    if (videos.length === 0) {
      setMessage("Add at least one scene video URL.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/ai/assemble-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
        sceneVideoUrls: videos,
        narrationAudioUrl: voiceUrl,
        musicAudioUrl: musicUrl,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Movie render failed.");
      setLoading(false);
      return;
    }

    setVideoUrl(result.videoUrl || "");
    setMessage("Movie rendered successfully.");
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-5xl p-8 text-white">
      <h1 className="text-4xl font-bold">Render Final Movie</h1>

      <p className="mt-2 text-white/60">
        Combine scene videos, narration, and music into one final MP4.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <label className="mb-2 block text-sm font-medium">
          Scene Video URLs
        </label>

        <textarea
          value={sceneVideos}
          onChange={(e) => setSceneVideos(e.target.value)}
          className="min-h-56 w-full rounded-xl border border-white/10 bg-black p-4"
          placeholder="Paste one video URL per line"
        />

        <label className="mt-6 mb-2 block text-sm font-medium">
          Narration Audio URL
        </label>

        <input
          value={voiceUrl}
          onChange={(e) => setVoiceUrl(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black p-4"
          placeholder="https://voice.mp3"
        />

        <label className="mt-6 mb-2 block text-sm font-medium">
          Background Music URL
        </label>

        <input
          value={musicUrl}
          onChange={(e) => setMusicUrl(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black p-4"
          placeholder="https://music.mp3"
        />

        <button
          onClick={renderMovie}
          disabled={loading}
          className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Rendering Movie..." : "Render Movie"}
        </button>

        {message && (
          <div className="mt-6 rounded-xl border border-white/10 bg-black p-4">
            {message}
          </div>
        )}

        {videoUrl && (
          <div className="mt-8">
            <video
              src={videoUrl}
              controls
              className="w-full rounded-2xl border border-white/10"
            />

            <a
              href={videoUrl}
              download
              className="mt-6 inline-block rounded-xl bg-green-500 px-6 py-3 font-semibold text-black"
            >
              Download Movie
            </a>
          </div>
        )}
      </div>
    </main>
  );
}