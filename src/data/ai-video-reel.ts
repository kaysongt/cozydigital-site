/**
 * The AI video shots Cozy Digital has produced, as shown on /courses/.
 *
 * Every entry is a real file in public/videos/reel. `alt` describes what is
 * visible in that shot and nothing more: there is no client name, campaign,
 * view count, or result attached to any of these, because none of that is
 * ours to claim here. Durations are read off the encoded files.
 *
 * `portrait` marks the one clip that is not 16:9, so the grid can give it a
 * frame that fits instead of cropping it into a landscape box.
 */

export type ReelShot = {
  slug: string;
  /** Seconds, rounded, for the badge on the tile. */
  seconds: number;
  /** Sentence used as the accessible name for the tile and the player. */
  alt: string;
  portrait?: boolean;
};

export const REEL_SHOTS: readonly ReelShot[] = [
  { slug: "shot-01", seconds: 7, alt: "Two men talking across a low table in a warmly lit lounge at night" },
  { slug: "shot-02", seconds: 6, alt: "A woman in a green dress at a bar, city lights behind her" },
  { slug: "shot-03", seconds: 8, alt: "A woman reading a document at a desk under a lamp at night" },
  { slug: "hf-split", seconds: 10, alt: "Vertical split screen: a martial arts kick above, a street move below", portrait: true },
  { slug: "shot-05", seconds: 9, alt: "A woman and a man mid-conversation at a bar" },
  { slug: "shot-06", seconds: 6, alt: "Close shot of a woman at a bar, turning toward camera" },
  { slug: "shot-07", seconds: 9, alt: "Two women in the back of a car at night, one reading paperwork" },
  { slug: "shot-08", seconds: 7, alt: "A man in a suit in the back of a car, city lights passing" },
  { slug: "shot-09", seconds: 8, alt: "Two people either side of a boardroom table with a skyline behind them" },
  { slug: "shot-10", seconds: 8, alt: "A woman in the back of a car at night, looking down" },
  { slug: "hf-a", seconds: 8, alt: "A figure crossing a wet forecourt outside a lit storefront at night" },
  { slug: "hf-b", seconds: 9, alt: "A woman beside a car outside a lit StapleMart storefront at night" },
  { slug: "hf-c", seconds: 9, alt: "A woman walking away from a car outside a StapleMart at night" },
  { slug: "hf-d", seconds: 6, alt: "Close shot of a woman speaking to camera, a storefront lit behind her" },
];

export const REEL_VIDEO_DIR = "/videos/reel";

export function reelSources(shot: ReelShot) {
  return {
    src: `${REEL_VIDEO_DIR}/${shot.slug}.mp4`,
    poster: `${REEL_VIDEO_DIR}/${shot.slug}.jpg`,
  };
}

export function formatShotLength(seconds: number) {
  return `0:${String(seconds).padStart(2, "0")}`;
}
