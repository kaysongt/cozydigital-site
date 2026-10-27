"use client";

import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import Countdown from "./Countdown";
import LumaRegistration from "./LumaRegistration";
import WorkshopProof from "./WorkshopProof";
import { trackWebinarEvent } from "@/lib/webinar-analytics";
import IntroFilm from "./IntroFilm";
import styles from "./webinar.module.css";

export default function WebinarLanding() {
  return (
    <section className={styles.webinar} aria-labelledby="webinar-title">
      <nav className={styles.nav} aria-label="Webinar navigation">
        <p><strong>Free live workshop</strong><time dateTime={webinar.startsAt}>{webinar.shortDate} at {webinar.shortTime}</time></p>
        <a href="#webinar-program">The session <span aria-hidden="true">↓</span></a>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{webinar.title}</p>
          <h1 id="webinar-title" className={styles.headline}>Become the AI creator<br /><span>people stop to watch.</span></h1>
          <p className={styles.lead}>Tired of clips that look nothing like your idea? Learn to make AI videos you’re proud to post.</p>
          <a className={styles.heroCta} href="#webinar-register" onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "hero" })}>Save my seat <span aria-hidden="true">↗</span></a>
        </div>
        <IntroFilm compact />
      </div>

      <Countdown />

      <div className={styles.registration}>
        <div className={styles.registrationCopy}>
          <h2>Make the video<br />you pictured.</h2>
          <p>A face changes. Two shots don’t match. More credits disappear. Learn the planning and review decisions behind videos you feel confident sharing.</p>
          <ul className={styles.takeaways}>
            <li>Know what to prompt before spending credits on another guess.</li>
            <li>Keep the same face, outfit, and lighting from shot to shot.</li>
            <li>Spot what makes a video feel unfinished, and know what to fix.</li>
          </ul>
          <div className={styles.hosts}>
            <div className={styles.portraits}><img src="/brand/team/quincy.png" width="56" height="56" alt="Quincy" loading="lazy" /><img src="/brand/team/kayson.png" width="56" height="56" alt="Kayson" loading="lazy" /></div>
            <p><strong>Quincy + Kayson, Cozy Digital founders</strong><span>The studio behind AI films for Dr. Boyce Watkins</span></p>
          </div>
          <p className={styles.sessionDate}><time dateTime={webinar.startsAt}>{webinar.date}<br /><strong>{webinar.time}</strong></time></p>
          <p className={styles.sessionNote}>Join online. Beginner friendly. No paid tools needed to attend.</p>
        </div>

        <LumaRegistration />
      </div>

      <WorkshopProof />

      <section id="webinar-program" className={styles.program} aria-labelledby="program-title">
        <div className={styles.programIntro}><h2 id="program-title">Build the confidence<br />to hit publish.</h2><p>Watch us break down real projects, from the first idea to the details that make the finished video work.</p><a href="#webinar-register" onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "program" })}>Save my seat <span aria-hidden="true">↗</span></a></div>
        <div className={styles.programRows}>
          <article><div><h3>Plan before you spend credits.</h3><p>Decide what the viewer should see, choose useful references, and give each shot one job.</p><span className={styles.topic}>IDEA → REFERENCES → SHOT PLAN</span></div></article>
          <article><div><h3>Give people a reason to keep watching.</h3><p>Explore try-on content, short drama, and a racing sequence. See why character, wardrobe, camera, and setting choices matter.</p><span className={styles.topic}>REAL PRODUCTION EXAMPLES</span></div></article>
          <article><div><h3>Catch the details that break a scene.</h3><p>Look for continuity problems, awkward pacing, and distracting sound before calling a video finished.</p><span className={styles.topic}>REVIEW → REFINE → DELIVER</span></div></article>
        </div>
      </section>

      <section className={styles.hostSection} aria-labelledby="workshop-hosts-title">
        <h2 id="workshop-hosts-title">Learn from the people making the films.</h2>
        <p>We’re Quincy and Kayson, the founders of Cozy Digital. Our studio creates AI films for Dr. Boyce Watkins and websites for small businesses.</p>
        <div className={styles.hostGrid}>
          <article><img src="/brand/team/quincy.png" width="112" height="112" alt="Quincy, Cozy Digital founder" loading="lazy" /><div><h3>Quincy</h3><strong>Founder &amp; Lead Developer</strong><p>Builds client websites, directs video campaigns, and develops the tools our studio uses.</p></div></article>
          <article><img src="/brand/team/kayson.png" width="112" height="112" alt="Kayson, Cozy Digital founder" loading="lazy" /><div><h3>Kayson</h3><strong>Founder &amp; Analytics Consultant</strong><p>Connects creative projects to practical workflows and tests the details before delivery.</p></div></article>
        </div>
        <a href="/#ai-video" target="_blank" rel="noopener noreferrer">Watch our client films <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
      </section>

      <section className={styles.faq} aria-labelledby="webinar-faq-title">
        <div><h2 id="webinar-faq-title">Before you join.</h2></div>
        <div>
          <details><summary>When is the webinar?</summary><p>{webinar.date} at {webinar.time}. It is a 90-minute live session on Google Meet. Register through Luma below for your confirmation and joining details.</p></details>
          <details><summary>Is the workshop really free?</summary><p>Yes. Register with your name and email. You do not need to buy a course or an AI subscription to attend.</p></details>
          <details><summary>How do I get the workbook?</summary><p>Join the live session and we’ll share the 13-page AI Shot Planning Workbook during the workshop. It includes exercises and reusable planning templates.</p></details>
          <details><summary>Are the examples prerecorded?</summary><p>Quincy and Kayson will host the webinar live. The video examples and narrated case studies are prerecorded; they show our planning and review decisions, rather than every generation step. The 40-second intro above is a preview, not the webinar.</p></details>
          <details><summary>Do I need an AI tool subscription?</summary><p>No subscription or credits are required to watch. Any tools or generation credits you choose to use afterward are separate. Creative and business results vary; no income or performance outcome is promised.</p></details>
        </div>
      </section>

    </section>
  );
}
