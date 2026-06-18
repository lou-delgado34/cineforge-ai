import { MusicLibrary } from "@/components/music/music-library";
import { MusicTrack } from "@/lib/music/music-types";

const tracks: MusicTrack[] = [];

export default function MusicPage() {
  return (
    <main className="mx-auto max-w-6xl p-8 text-white">
      <h1 className="text-4xl font-bold">Background Music</h1>

      <p className="mt-2 text-white/60">
        Generate, preview, download, and manage background music for your videos.
      </p>

      <div className="mt-8">
        <MusicLibrary tracks={tracks} />
      </div>
    </main>
  );
}