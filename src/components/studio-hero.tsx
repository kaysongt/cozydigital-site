import Image from "next/image";
import Link from "next/link";

export default function StudioHero() {
  return (
    <section className="future-hero" aria-labelledby="studio-heading">
      <Image
        className="future-hero-art"
        src="/images/studio/cozy-loops.png"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="future-hero-shade" aria-hidden="true" />
      <div className="future-hero-content">
        <p className="future-label">
          <span className="future-status" /> COZY DIGITAL / INDEPENDENT STUDIO
        </p>
        <h1 id="studio-heading">
          Websites.
          <br />
          <span>AI video.</span>
        </h1>
        <div className="future-hero-bottom">
          <div>
            <p className="future-intro">
              We build your site and make the films that bring people to it.
              Design, development, and production by Quincy and Kayson.
            </p>
            <div className="future-actions">
              <Link href="#client-work" className="future-button">
                Website work <span aria-hidden="true">↗</span>
              </Link>
              <Link href="#ai-video" className="future-button">
                Video work <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <Link href="/founders/" className="future-founder-link">
            <span className="future-faces">
              <Image
                src="/brand/team/quincy.png"
                width={48}
                height={48}
                alt="Quincy"
              />
              <Image
                src="/brand/team/kayson.png"
                width={48}
                height={48}
                alt="Kayson"
              />
            </span>
            <span>
              Work with the founders.<small>Meet Quincy &amp; Kayson ↗</small>
            </span>
          </Link>
        </div>
      </div>
      <div className="future-hero-index">
        <span>WEB DESIGN &amp; DEVELOPMENT</span>
        <span>AI VIDEO &amp; CAMPAIGNS</span>
        <a href="/cozy-booking/">Tell us about your project ↗</a>
      </div>
    </section>
  );
}
