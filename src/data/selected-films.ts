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
    slug: "subscription-car",
    title: "The Subscription",
    category: "Cinematic skit",
    seconds: 20.05,
    width: 1080,
    height: 1920,
    description: "A roadside conversation with Dr. Boyce turns a red sports car into a story about spending.",
    posterAlt: "Dr. Boyce beside a red sports car at golden hour",
  },
  {
    slug: "black-wall-street",
    title: "Black Wall Street",
    category: "Historical dramatization",
    seconds: 36.0,
    width: 1080,
    height: 1920,
    description: "A first-person dramatization of Greenwood, from a thriving community through destruction and rebuilding.",
    posterAlt: "A dramatized street scene in historic Greenwood",
  },
  {
    slug: "sports-betting",
    title: "Parlays Before Portfolios",
    category: "Financial storytelling",
    seconds: 46.556009,
    width: 1080,
    height: 1920,
    description: "A cinematic look at sports betting, money, and the choices we teach the next generation.",
    posterAlt: "Burning money beneath the title Parlays Before Portfolios in a dramatized scene",
  },
  {
    slug: "financed-shoes",
    title: "The Financed Flex",
    category: "Social comedy",
    seconds: 12.224,
    width: 1080,
    height: 1920,
    description: "A pair of gold shoes starts a barbershop conversation about payment plans and priorities.",
    posterAlt: "A young man wearing oversized gold shoes in a barbershop",
  },
  {
    slug: "cookout",
    title: "The Algorithm at the Cookout",
    category: "Social comedy",
    seconds: 11.52,
    width: 1080,
    height: 1920,
    description: "The algorithm shows up at the cookout, and Dr. Boyce wants his Saturday back.",
    posterAlt: "Dr. Boyce at a cookout beside a character dressed as a phone",
  },
  {
    slug: "ninja-fighting",
    title: "Fighting Poor Choices",
    category: "Action concept",
    seconds: 10.042,
    width: 1280,
    height: 720,
    description: "A dojo face-off makes poor financial choices a literal opponent.",
    posterAlt: "Dr. Boyce facing a masked opponent in a warmly lit dojo",
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
