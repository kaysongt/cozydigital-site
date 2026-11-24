import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import StrategyCallLink from "@/components/strategy-call-link";
import styles from "./home.module.css";

const title = "Web Design & Development Studio | Cozy Digital";
const description = "Cozy Digital designs and builds websites that make it easy for customers to book, buy, or get in touch. Book a free 30-minute strategy call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://cozydigital.org/" },
  openGraph: { title, description, url: "https://cozydigital.org/" },
  twitter: { title, description },
};

export default function HomePage() {
  return (
    <main className={styles.home} data-minimal-home>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Independent web design &amp; development studio</p>
          <h1 id="home-heading">Websites that make<br />the next step clear.</h1>
          <p className={styles.lede}>
            We design and build websites that make it easy for your customers to book, buy, or get in touch.
          </p>
          <StrategyCallLink className={styles.cta} />
          <p className={styles.note}>30 minutes. No obligation.</p>
        </div>
        <figure className={styles.featured}>
          <div className={styles.window}>
            <div className={styles.windowBar} aria-hidden="true">
              <span className={styles.dots}><i /><i /><i /></span>
              <span>zoelifehub.com</span>
              <span className={styles.barSpacer} />
            </div>
            <div className={styles.capture}>
              <Image
                src="/images/client-proof/zoe-life-homepage-2026-11-13.jpg"
                alt="Zoe Life homepage redesigned by Cozy Digital, with an introduction and a portrait of the founders."
                width={1440}
                height={1080}
                sizes="(max-width: 600px) 92vw, (max-width: 1040px) 90vw, 920px"
                priority
              />
            </div>
          </div>
          <figcaption><strong>Zoe Life</strong><span>Featured website</span></figcaption>
        </figure>
      </section>

      <section id="client-work" className={styles.proof} aria-labelledby="work-heading">
        <div id="zoe-life" className={styles.proofInner}>
          <p id="work-heading" className={styles.eyebrow}>A word from our client</p>
          <blockquote id="zoe-life-testimonial">
            <p>“They did an excellent job bringing our vision to life.”</p>
            <cite>Pastor Kemi Akinyemi, Zoe Life</cite>
          </blockquote>
          <Link className={styles.textLink} href="/work/#zoe-life-testimonial">Read the full testimonial <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <nav className={styles.more} aria-label="More from Cozy Digital">
        <Link href="/work/#client-work">See more websites <span aria-hidden="true">↗</span></Link>
        <Link id="ai-video" href="/work/#ai-video">Watch our client films <span aria-hidden="true">↗</span></Link>
        <Link id="audit-form" href="/free-audit/#audit-form">Free website audit <span aria-hidden="true">↗</span></Link>
      </nav>
    </main>
  );
}
