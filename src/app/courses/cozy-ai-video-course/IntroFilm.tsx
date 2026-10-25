"use client";

import { useEffect, useRef, useState } from "react";
import { trackWebinarEvent } from "@/lib/webinar-analytics";
import styles from "./course.module.css";

type IntroFilmProps = { mediaBase?: string; compact?: boolean };

/** Public 40-second trailer only; paid lesson delivery stays separate. */
export default function IntroFilm({ mediaBase = "/courses/cozy-ai-video-course", compact = false }: IntroFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const milestones = useRef(new Set<number>());
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => setReady(true), []);

  function recordProgress() {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const percent = (video.currentTime / video.duration) * 100;
    for (const milestone of [25, 50, 75]) {
      if (percent >= milestone && !milestones.current.has(milestone)) {
        milestones.current.add(milestone);
        trackWebinarEvent("webinar_intro_progress", { video_percent: milestone });
      }
    }
  }

  return (
    <section className={compact ? styles.heroFilm : `${styles.wrap} ${styles.introFilm}`} id="course-intro" aria-labelledby="course-intro-title">
      {!compact && <div className={styles.introFilmHeading}><h2 id="course-intro-title">See what you could create.</h2></div>}
      <div className={styles.videoFrame}>
        <video
          ref={videoRef}
          className={styles.introVideo}
          aria-label="AI Video Creator Lab introduction, 40 seconds"
          aria-describedby="course-intro-description"
          controls
          playsInline
          preload="none"
          crossOrigin="anonymous"
          poster={`${mediaBase}/intro-film-preview.jpg`}
          width={1920}
          height={1080}
          onPlay={() => {
            setStarted(true);
            if (!milestones.current.has(0)) {
              milestones.current.add(0);
              trackWebinarEvent("webinar_intro_start", { video_percent: 0 });
            }
          }}
          onTimeUpdate={recordProgress}
          onEnded={() => {
            if (!milestones.current.has(100)) {
              milestones.current.add(100);
              trackWebinarEvent("webinar_intro_complete", { video_percent: 100 });
            }
          }}
          onError={() => setFailed(true)}
        >
          <source src={`${mediaBase}/intro-v1.mp4`} type="video/mp4" />
          <track kind="captions" src={`${mediaBase}/intro-v1.en.vtt`} srcLang="en" label="English on-screen text" />
          Your browser cannot play this video. <a href={`${mediaBase}/intro-v1.mp4`}>Open the course intro</a>.
        </video>
        {ready && !started && !failed && <button type="button" className={styles.playIntro} aria-label="Play 40-second course intro" onClick={() => {
          const playback = videoRef.current?.play();
          playback?.catch(() => setFailed(true));
        }}><span aria-hidden="true">▶</span><span>Watch the intro <small>40 seconds</small></span></button>}
      </div>
      <div className={styles.heroFilmCaption}>
        {compact && <h2 id="course-intro-title">See what you could create.</h2>}
        <p id="course-intro-description">Real Cozy Digital projects. Music only; no spoken narration.</p>
        <a href={`${mediaBase}/intro-transcript-v1.txt`}>Read the text version</a>
        {failed && <p role="status">Having trouble playing? <a href={`${mediaBase}/intro-v1.mp4`}>Open the intro video</a>.</p>}
      </div>
    </section>
  );
}
