import { MusicTrack } from "@/lib/music/music-types";
import { MusicPlayer } from "./music-player";

export function MusicLibrary({ tracks }: { tracks: MusicTrack[] }) {
  if (tracks.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white">
        <h2 className="text-2xl font-bold">No music yet</h2>
        <p className="mt-3 text-white/50">
          Generated background music will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {tracks.map((track) => (
        <MusicPlayer key={track.id} track={track} />
      ))}
    </div>
  );
}