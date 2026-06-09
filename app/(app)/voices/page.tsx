"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Voice = {
  id: string;
  text: string;
  audio_url: string;
  created_at: string;
};

export default function VoicesPage() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [message, setMessage] = useState("");

  async function loadVoices() {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) return;

    const response = await fetch("/api/voices/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();

    setVoices(result.voices || []);
  }

  async function deleteVoice(voiceId: string) {
    const confirmed = confirm("Delete this voice?");

    if (!confirmed) return;

    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      setMessage("Login required.");
      return;
    }

    const response = await fetch("/api/voices/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voiceId,
        userId: data.session.user.id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Delete failed.");
      return;
    }

    setMessage("Voice deleted.");
    loadVoices();
  }

  useEffect(() => {
    loadVoices();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-4xl font-bold">Voice Library</h1>

      <p className="mt-2 text-green-400">
        Voice files are saved permanently in Supabase Storage.
      </p>

      {message && <p className="mt-4 text-sm text-green-400">{message}</p>}

      <div className="mt-8 space-y-4">
        {voices.length === 0 ? (
          <p className="text-white/60">No saved voices yet.</p>
        ) : (
          voices.map((voice) => (
            <div
              key={voice.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-white/70">{voice.text}</p>

              <audio controls src={voice.audio_url} className="mt-4 w-full" />

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={voice.audio_url}
                  target="_blank"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-blue-400 hover:bg-white/10"
                >
                  Open Audio
                </a>

                <button
                  onClick={() => deleteVoice(voice.id)}
                  className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>

              <p className="mt-3 text-sm text-white/40">
                {new Date(voice.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}