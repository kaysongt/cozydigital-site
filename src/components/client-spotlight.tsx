import Image from "next/image";
import styles from "./client-spotlight.module.css";

const episodeUrl =
  "https://tv.apple.com/us/episode/natalie-nunn--dr-watkins-are-you-too-broke-to-date/umc.cmc.7hiwc52dpk0z7ofab9h33p3ne?showId=umc.cmc.7ilp9ckg7lyshld9lo1oxaxlq";

export default function ClientSpotlight() {
  return (
    <aside id="client-spotlight" className={styles.spotlight} aria-labelledby="client-spotlight-heading">
      <p className={styles.label}>Cozy Digital client placement</p>
      <div className={styles.logos}>
        <Image src="/images/client-proof/bet-logo.svg" alt="BET" width={320} height={320} priority />
        <span className={styles.showLogo}>
          <Image className={styles.showArtwork} src="/images/client-proof/nick-cannon-night-key-art.jpg" alt="Nick Cannon @ Night" width={1600} height={900} priority />
        </span>
      </div>
      <h2 id="client-spotlight-heading">Dr. Alicia Watkins, on BET.</h2>
      <p className={styles.copy}>We helped our client land a guest appearance on <cite>Nick Cannon @ Night</cite>.</p>
      <a href={episodeUrl} className={styles.episode} target="_blank" rel="noopener noreferrer">
        See the episode <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p className={styles.note}>Client appearance. No BET endorsement of Cozy Digital.</p>
    </aside>
  );
}
