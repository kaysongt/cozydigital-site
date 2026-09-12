"use client";

import { useCallback, useRef, useState } from "react";
import {
  SELECTED_FILMS,
  filmSources,
  formatFilmLength,
  type SelectedFilm,
} from "@/data/selected-films";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export default function SelectedFilms() {
  const [selectedSlug, setSelectedSlug] = useState(SELECTED_FILMS[0].slug);
  const [hasStarted, setHasStarted] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const attachVideo = useCallback((video: HTMLVideoElement | null) => {
    videoRef.current = video;
    if (video) {
      // A player only mounts after a visitor chooses a film.
      void video.play().catch(() => {
        // Native controls remain available if playback needs another gesture.
      });
    }
  }, []);
  const selected =
    SELECTED_FILMS.find((film) => film.slug === selectedSlug) ??
    SELECTED_FILMS[0];
  const { src, poster } = filmSources(selected);
  const portrait = selected.height > selected.width;

  function play(film: SelectedFilm, showPlayer = false) {
    if (showPlayer) {
      stageRef.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
    if (film.slug === selectedSlug && hasStarted) {
      void videoRef.current?.play().catch(() => {
        // Native controls remain available if the browser blocks playback.
      });
      return;
    }
    setSelectedSlug(film.slug);
    setHasStarted(true);
  }

  return (
    <div className="selected-films">
      <figure className="selected-film-feature">
        <div
          ref={stageRef}
          className={`selected-film-stage${portrait ? " selected-film-stage-portrait" : ""}`}
        >
          {hasStarted ? (
            <video
              key={selected.slug}
              ref={attachVideo}
              src={src}
              poster={poster}
              width={selected.width}
              height={selected.height}
              controls
              playsInline
              preload="metadata"
              aria-label={`${selected.title}, ${selected.category}`}
            />
          ) : (
            <button
              type="button"
              className="selected-film-start"
              onClick={() => play(selected)}
              aria-label={`Play ${selected.title}`}
            >
              {/* Posters are pre-sized local files in this static export. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster}
                alt={selected.posterAlt}
                width={selected.width}
                height={selected.height}
                loading="lazy"
                decoding="async"
              />
              <span className="selected-film-play">
                <PlayIcon />
                <span>Watch the film</span>
              </span>
            </button>
          )}
        </div>
        <figcaption className="selected-film-caption" aria-live="polite">
          <div>
            <p className="selected-film-category">
              {selected.category}
              <span aria-hidden="true"> / </span>
              <span>{formatFilmLength(selected.seconds)}</span>
            </p>
            <h3>{selected.title}</h3>
          </div>
          <p>{selected.description}</p>
        </figcaption>
      </figure>
      <ul className="selected-film-list" aria-label="Choose a film">
        {SELECTED_FILMS.map((film, index) => (
          <li key={film.slug}>
            <button
              type="button"
              className="selected-film-choice"
              aria-label={`Play ${film.title}`}
              aria-pressed={selectedSlug === film.slug}
              onClick={() => play(film, true)}
            >
              <span className="selected-film-thumbnail">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filmSources(film).poster}
                  alt=""
                  width={film.width}
                  height={film.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="selected-film-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="selected-film-duration">
                  {formatFilmLength(film.seconds)}
                </span>
              </span>
              <span className="selected-film-choice-copy">
                <span className="selected-film-category">{film.category}</span>
                <strong>{film.title}</strong>
                <span className="selected-film-watch" aria-hidden="true">
                  <PlayIcon /> Watch film
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
