import styles from "./course.module.css";

type IntroFilmProps = { mediaBase?: string };

/** Public 40-second trailer only; paid lesson delivery stays separate. */
export default function IntroFilm({ mediaBase = "/courses/cozy-ai-video-course" }: IntroFilmProps) {
  return (
    <section className={`${styles.wrap} ${styles.introFilm}`} id="course-intro" aria-labelledby="course-intro-title">
      <div className={styles.introFilmHeading}>
        <div>
          <p className={styles.eyebrow}>Your course in 40 seconds</p>
          <h2 id="course-intro-title">See where your idea could go.</h2>
        </div>
        <p id="course-intro-description">A first look at the five film examples, the creative decisions behind them, and your next step. Music only; no spoken narration.</p>
      </div>
      <video
        className={styles.introVideo}
        aria-label="Cozy AI Video Course introduction, 40 seconds"
        aria-describedby="course-intro-description"
        controls
        playsInline
        preload="none"
        crossOrigin="anonymous"
        poster={`${mediaBase}/intro-poster-v1.jpg`}
        width={1920}
        height={1080}
      >
        <source src={`${mediaBase}/intro-v1.mp4`} type="video/mp4" />
        <track kind="captions" src={`${mediaBase}/intro-v1.en.vtt`} srcLang="en" label="English — on-screen text" />
        Your browser cannot play this video. <a href={`${mediaBase}/intro-v1.mp4`}>Open the course intro</a>.
      </video>
      <div className={styles.introFilmFoot}>
        <p>Film excerpts created with Higgsfield.</p>
        <div><a href={`${mediaBase}/intro-transcript-v1.txt`}>Read the text version</a><a href={`${mediaBase}/intro-v1.mp4`}>Open video <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}

