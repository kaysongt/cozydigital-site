export type SelectedFilm = {
  slug: string;
  title: string;
  category: string;
  seconds: number;
  width: number;
  height: number;
  description: string;
  posterAlt: string;
};

export const SELECTED_FILMS: readonly SelectedFilm[] = [
  {
    slug: "boardroom-drama",
    title: "The Deal",
    category: "Narrative short",
    seconds: 76.556,
    width: 1920,
    height: 1080,
    description:
      "A conversation at a bar leads to a late-night car ride and a boardroom meeting.",
    posterAlt: "A woman in green at a bar in The Deal",
  },
  {
    slug: "free-trial",
    title: "Your Free Trial Moved In",
    category: "Social comedy",
    seconds: 40,
    width: 1080,
    height: 1920,
    description:
      "A kitchen-table conversation turns forgotten subscriptions into a short comedy.",
    posterAlt: "A woman on her phone in a kitchen in Your Free Trial Moved In",
  },
  {
    slug: "the-ransom",
    title: "The Ransom",
    category: "Series episode",
    seconds: 68,
    width: 1080,
    height: 1920,
    description:
      "A tense family phone call opens the first episode of If You Love Me.",
    posterAlt: "A couple at a kitchen island in The Ransom",
  },
  {
    slug: "cash-tonight",
    title: "Cash Tonight",
    category: "Horror short",
    seconds: 50.317,
    width: 1920,
    height: 1080,
    description:
      "A late-night loan office becomes the setting for a creature transformation and a chase.",
    posterAlt: "A woman outside a loan office in Cash Tonight",
  },
];

export function filmSources(film: SelectedFilm) {
  const base = `/videos/selected-work/${film.slug}`;
  return { src: `${base}.mp4`, poster: `${base}.jpg` };
}

export function formatFilmLength(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}
