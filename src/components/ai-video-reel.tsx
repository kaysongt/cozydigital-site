"use client";

import { useRef, useState } from "react";
import {
  formatShotLength,
  reelSources,
  type ReelShot,
} from "@/data/ai-video-reel";

/**
 * The AI video showreel.
 *
 * Fourteen short shots is far too much video to load on sight, so a tile is a
 * poster image until someone picks it. Only the chosen shot mounts a <video>
 * at all, which also means picking a second one stops the first rather than
 * leaving two soundtracks running over each other.
 */
export function AiVideoReel({ shots }: { shots: readonly ReelShot[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const play = (shot: ReelShot) => {
    setActiveSlug(shot.slug);
    // The element does not exist until this state change renders. A frame's
    // wait still sits inside the click's user activation, which is what lets
    // a shot start with its sound on.
    requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {
        /* Blocked playback leaves the native controls ready; nothing to undo. */
      });
    });
  };

  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {shots.map((shot) => {
        const { src, poster } = reelSources(shot);
        const frame = shot.portrait ? "aspect-[854/960]" : "aspect-video";
        return (
          <li key={shot.slug} className={shot.portrait ? "sm:row-span-2" : undefined}>
            <div
              className={`relative overflow-hidden rounded-xl border border-white/10 bg-black ${frame}`}
            >
              {activeSlug === shot.slug ? (
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  controls
                  playsInline
                  preload="auto"
                  aria-label={shot.alt}
                  onEnded={() => setActiveSlug(null)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => play(shot)}
                  className="group block h-full w-full cursor-pointer border-0 p-0"
                >
                  {/* Static export runs with images.unoptimized, and these are
                      already sized for the tile, so a plain img is honest here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:border-cyan-300 group-hover:bg-cyan-400 group-hover:text-black">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  </span>
                  <span className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-white/15 bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-zinc-300">
                    {formatShotLength(shot.seconds)}
                  </span>
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
