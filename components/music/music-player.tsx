import { MusicTrack } from "@/lib/music/music-types";

export function MusicPlayer({ track }: { track: MusicTrack }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white">
      <h2 className="text-xl font-bold">{track.title}</h2>

      <p className="mt-2 text-sm text-white/50">
        {track.duration} • {track.createdAt}
      </p>

      <audio src={track.url} controls className="mt-4 w-full" />

      <div className="mt-4 flex gap-3">
        <a
          href={track.url}
          download
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
        >
          Download
        </a>

        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white">
          Delete
        </button>
      </div>
    </div>
  );
}