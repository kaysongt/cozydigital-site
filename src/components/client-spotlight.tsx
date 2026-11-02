import Image from "next/image";
import Link from "next/link";
import styles from "./client-spotlight.module.css";

const episodeUrl =
  "https://tv.apple.com/us/episode/natalie-nunn--dr-watkins-are-you-too-broke-to-date/umc.cmc.7hiwc52dpk0z7ofab9h33p3ne?showId=umc.cmc.7ilp9ckg7lyshld9lo1oxaxlq";

export default function ClientSpotlight() {
  return (
    <section
      id="client-spotlight"
      className={`future-section ${styles.spotlight}`}
      aria-labelledby="client-spotlight-heading"
    >
      <div className={styles.portrait}>
        <Image
          src="/images/client-proof/dr-alicia-portrait.webp"
          alt="Dr. Alicia Watkins smiling in a yellow sweater"
          width={900}
          height={1255}
          sizes="(min-width: 900px) 38vw, 92vw"
        />
      </div>
      <div className={styles.story}>
        <p className="future-label">Client spotlight · Media placement</p>
        <h2 id="client-spotlight-heading">
          Dr. Alicia Watkins.<br />
          <span>On BET.</span>
        </h2>
        <p className={styles.intro}>
          We helped Dr. Alicia Watkins land a guest appearance on BET’s
          <cite> Nick Cannon @ Night</cite>.
        </p>
        <p className={styles.detail}>
          Our client joined Nick Cannon and Natalie Nunn for a conversation
          about dating, money, and relationships.
        </p>
        <dl className={styles.facts}>
          <div><dt>Series</dt><dd>Nick Cannon @ Night</dd></div>
          <div><dt>Episode</dt><dd>Season 1 · Episode 2</dd></div>
          <div><dt>Aired</dt><dd><time dateTime="2026-10-27">October 27, 2026</time></dd></div>
        </dl>
        <div className={styles.actions}>
          <Link href="/cozy-booking/" className="future-button">
            Talk about your brand <span aria-hidden="true">↗</span>
          </Link>
          <a href={episodeUrl} className="future-text-link" target="_blank" rel="noopener noreferrer">
            View the episode listing <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <p className={`future-fine ${styles.note}`}>
          A client guest appearance, not an endorsement of Cozy Digital by BET.
        </p>
      </div>
    </section>
  );
}
