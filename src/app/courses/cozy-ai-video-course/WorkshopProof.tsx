"use client";

import { useState } from "react";
import { SELECTED_FILMS, filmSources, formatFilmLength } from "@/data/selected-films";
import { trackWebinarEvent } from "@/lib/webinar-analytics";
import styles from "./webinar.module.css";

const featured = SELECTED_FILMS.filter(film =>
  ["subscription-car", "black-wall-street", "ninja-fighting"].includes(film.slug)
);

/** Reuse already-public client films and attribution. Load media only on request. */
export default function WorkshopProof() {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <section id="workshop-proof" className={styles.proof} aria-labelledby="workshop-proof-title">
      <h2 id="workshop-proof-title">Learn from the creators behind the work.</h2>
      <p className={styles.proofIntro}>Your hosts, Quincy + Kayson, created these AI films for Dr. Boyce Watkins. See the characters, the storytelling, and the finished edits.</p>
      <ul className={styles.proofGrid} aria-label="AI films created by your workshop hosts">
        {featured.map(film => {
          const media = filmSources(film);
          return <li key={film.slug}>
            <figure>
              <div className={styles.proofStage}>
                {playing === film.slug ? <video
                  key={film.slug}
                  src={media.src}
                  poster={media.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  width={film.width}
                  height={film.height}
                  aria-label={`${film.title}, ${film.category}`}
                  onPlay={() => trackWebinarEvent("webinar_proof_play", { film_slug: film.slug })}
                >Your browser cannot play this film. <a href={media.src}>Open {film.title}</a>.</video> : <button
                  type="button"
                  onClick={() => setPlaying(film.slug)}
                  aria-label={`Watch ${film.title}`}
                >
                  <img src={media.poster} alt={film.posterAlt} width={film.width} height={film.height} loading="lazy" decoding="async" />
                  <span className={styles.proofPlay}><span aria-hidden="true">▶</span> Watch {formatFilmLength(film.seconds)}</span>
                </button>}
              </div>
              <figcaption><h3>{film.title}</h3><p>{film.category}</p><noscript><a href={media.src}>Watch {film.title}</a></noscript></figcaption>
            </figure>
          </li>;
        })}
      </ul>
      <a className={styles.proofMore} href="/#ai-video" target="_blank" rel="noopener noreferrer">Watch all {SELECTED_FILMS.length} client films <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
    </section>
  );
}
