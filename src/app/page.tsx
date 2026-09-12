import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import StudioHero from "@/components/studio-hero";
import AuditForm from "@/components/audit-form";
import FounderTrust from "@/components/founder-trust";
import PromptBossPromo from "@/components/prompt-boss-promo";
import DesignCarousel from "@/components/design-carousel";
import SelectedFilms from "@/components/selected-films";

export const metadata: Metadata = {
  title: "Website Design & AI Video | Cozy Digital",
  description:
    "Website design, development, and AI video production by Quincy and Kayson. View our work and talk directly with the founders of Cozy Digital.",
  alternates: { canonical: "https://cozydigital.org/" },
};
const projects = [
  {
    name: "Dr. Alicia Watkins",
    type: "Therapy & wellness",
    image: "/images/client-proof/dr-alicia-site.png",
    copy: "Therapy, coaching, courses, and retreats brought together with direct booking and product pages.",
    href: "https://draliciawatkins.com/",
    status: "Visit website",
  },
  {
    name: "Dear Pastor’s Wife",
    type: "Ministry & community",
    image: "/images/client-proof/dear-pastors-wife-site.png",
    copy: "A home for resources, events, speaking, and giving, organized around the people the ministry serves.",
    href: "https://dearpastorswife.org/",
    status: "Visit website",
  },
  {
    name: "Lavar Scott",
    type: "Motorsport",
    image: "/images/client-proof/lavar-scott-site.png",
    copy: "A partnership website with the driver’s story, audience, and sponsorship opportunities.",
    href: null,
    status: "In development",
  },
  {
    name: "Essential Massage by Mesha",
    type: "Massage therapy",
    image: "/images/client-proof/mesha-massage-site.jpg",
    copy: "A dedicated website for the practice’s services, studio, and booking experience.",
    href: null,
    status: "Booking setup in progress",
  },
];
const services = [
  [
    "01",
    "Website design",
    "New websites, landing pages, booking, and checkout. We handle the design, build, and launch.",
  ],
  [
    "02",
    "AI video production",
    "Concepts, scripts, generated scenes, editing, and versions for your chosen placements.",
  ],
  [
    "03",
    "Content & campaigns",
    "Ad creative, social posts, and email content made around what you sell.",
  ],
  [
    "04",
    "Ongoing support",
    "Site updates, booking workflows, follow-up, and search information kept current.",
  ],
];
const faqs = [
  [
    "Can I book just a website or a video?",
    "Yes. Each is available separately. We agree the scope, price, and delivery schedule with you before work starts.",
  ],
  [
    "Who will I work with?",
    "You work directly with Quincy and Kayson. We handle the project details, review your feedback, and check the work before delivery.",
  ],
  [
    "What should I send you?",
    "Your business name, existing site or social profile, and what you need made. References you like are useful too.",
  ],
  [
    "What happens after launch?",
    "We can handle ongoing updates, content, and support. Clients use the hub to send requests, review work, and keep files together.",
  ],
];
export default function HomePage() {
  return (
    <main className="cozy-home future-home">
      <StudioHero />
      <section
        className="future-section future-work"
        aria-labelledby="selected-heading"
      >
        <div className="future-section-head">
          <p className="future-label">SELECTED WORK</p>
          <h2 id="selected-heading">
            A few recent
            <br />
            projects.
          </h2>
          <p>
            Client websites and films produced by our studio. Take a look, then
            tell us what you have in mind.
          </p>
        </div>
        <div className="future-leads">
          <a className="future-lead" href="#client-work">
            <div className="future-lead-media">
              <Image
                src="/images/client-proof/dr-alicia-site.png"
                alt="Dr. Alicia Watkins website by Cozy Digital"
                width={1200}
                height={900}
                sizes="(min-width: 800px) 50vw, 100vw"
              />
            </div>
            <div className="future-lead-caption">
              <span>
                <small>DESIGN / DEVELOPMENT</small>
                <strong>Websites</strong>
              </span>
              <span className="future-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </a>
          <a className="future-lead" href="#ai-video">
            <div className="future-lead-media">
              <Image
                src="/videos/selected-work/boardroom-drama.jpg"
                alt="A woman in green at a bar in The Deal, a Cozy Digital film"
                width={1920}
                height={1080}
                sizes="(min-width: 800px) 50vw, 100vw"
              />
              <span className="future-play" aria-hidden="true">
                ▶
              </span>
            </div>
            <div className="future-lead-caption">
              <span>
                <small>DIRECTION / PRODUCTION</small>
                <strong>AI video</strong>
              </span>
              <span className="future-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </a>
        </div>
      </section>
      <div className="future-people">
        <FounderTrust />
      </div>
      <section
        id="ai-video"
        className="future-section"
        aria-labelledby="video-heading"
      >
        <div className="future-section-head">
          <p className="future-label">01 / MOTION</p>
          <h2 id="video-heading">Videos we’ve made.</h2>
          <p>
            Narrative shorts, social comedy, and episodic stories. Watch four
            films from our portfolio, then talk to us about your own project.
          </p>
        </div>
        <SelectedFilms />
        <div className="future-film-process">
          <div className="future-film-notes">
            <p className="future-label">FROM BRIEF TO FINAL CUT</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Agree the idea.</h3>
                  <p>
                    Audience, message, references, and where the video will run.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Make the film.</h3>
                  <p>
                    Script, visual direction, generated scenes, and the edit.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Review it together.</h3>
                  <p>Your feedback, the agreed revisions, and final exports.</p>
                </div>
              </li>
            </ol>
            <p className="future-fine">
              Length, formats, and revision rounds are agreed for each project.
            </p>
            <Link href="/cozy-booking/" className="future-button">
              Discuss a video <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="future-text-link"
              href="https://cozy-client-hub-production.up.railway.app/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a request in the hub ↗
            </a>
          </div>
        </div>
      </section>
      <section
        id="client-work"
        className="future-section"
        aria-labelledby="web-heading"
      >
        <div className="future-section-head">
          <p className="future-label">02 / WEB</p>
          <h2 id="web-heading">Websites we’ve built.</h2>
          <p>
            Every project starts with the business: what you offer, who it is
            for, and what visitors need to do.
          </p>
        </div>
        <div className="future-project-grid">
          {projects.map((project) => (
            <article key={project.name} className="future-project">
              <div className="future-project-image">
                <Image
                  src={project.image}
                  alt={`${project.name} website built by Cozy Digital`}
                  width={1200}
                  height={900}
                  sizes="(min-width: 800px) 50vw, 100vw"
                />
              </div>
              <div className="future-project-meta">
                <span className="future-label">{project.type}</span>
                <span className="future-fine">
                  {project.href ? "Live" : "In progress"}
                </span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.copy}</p>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="future-text-link"
                >
                  {project.status} ↗
                </a>
              ) : (
                <span className="future-fine">{project.status}</span>
              )}
            </article>
          ))}
        </div>
        <div className="future-design-lab">
          <div>
            <p className="future-label">DESIGN STUDIES</p>
            <h3>Design concepts.</h3>
            <p>
              Original concepts alongside client work. A few directions a new
              site can take.
            </p>
            <Link href="/cozy-booking/" className="future-button">
              Discuss a website <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <DesignCarousel />
        </div>
      </section>
      <section
        id="capabilities"
        className="future-section"
        aria-labelledby="service-heading"
      >
        <div className="future-section-head">
          <p className="future-label">THE STUDIO</p>
          <h2 id="service-heading">What we take on.</h2>
          <Link href="/services/" className="future-text-link">
            All services ↗
          </Link>
        </div>
        <div className="future-service-list">
          {services.map(([n, title, body]) => (
            <article key={n}>
              <span className="future-label">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="future-course">
        <PromptBossPromo />
      </div>
      <section
        id="audit-form"
        className="future-section future-audit"
        aria-labelledby="audit-heading"
      >
        <div>
          <p className="future-label">FREE WEBSITE REVIEW</p>
          <h2 id="audit-heading">
            Show us
            <br />
            what you have.
          </h2>
          <p>
            Send your website or social profile. We will review it and share
            three changes we would make first.
          </p>
          <p className="future-fine">The audit is free. A call is optional.</p>
        </div>
        <AuditForm />
      </section>
      <section
        className="future-section future-faq"
        aria-labelledby="faq-heading"
      >
        <div>
          <p className="future-label">BEFORE WE START</p>
          <h2 id="faq-heading">A few details.</h2>
          <Link href="/faq/" className="future-text-link">
            More questions ↗
          </Link>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="future-close">
        <p className="future-label">QUINCY &amp; KAYSON / COZY DIGITAL</p>
        <h2>
          What are
          <br />
          we making?
        </h2>
        <Link href="/cozy-booking/" className="future-button">
          Talk to us <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
