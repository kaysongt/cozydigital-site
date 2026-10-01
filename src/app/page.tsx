import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import StudioHero from "@/components/studio-hero";
import AuditForm from "@/components/audit-form";
import FounderTrust from "@/components/founder-trust";
import PromptBossPromo from "@/components/prompt-boss-promo";
import DesignCarousel from "@/components/design-carousel";
import SelectedFilms from "@/components/selected-films";
import { SELECTED_FILMS } from "@/data/selected-films";
import {
  CLIENT_HUB_LABEL,
  CLIENT_HUB_NEW_TAB_HINT,
  CLIENT_HUB_REL,
  CLIENT_HUB_URL,
} from "@/lib/client-hub";

export const metadata: Metadata = {
  title: "Website Design & AI Video | Cozy Digital",
  description:
    "Website design, development, and AI video production by Quincy and Kayson. View our work and talk directly with the founders of Cozy Digital.",
  alternates: { canonical: "https://cozydigital.org/" },
};
const filmCount = SELECTED_FILMS.length;

// Proof lines only repeat work already published here or on the live project:
// the Boyce film list, Dr. Alicia's consultation path, and KingsWord's 32-course
// dashboard (about page, confirmed on thekti.org). No performance claims.
const projects: {
  id: string;
  name: string;
  type: string;
  proof: string;
  image: string;
  copy: string;
  href: string | null;
  status: string;
}[] = [
  {
    id: "dr-alicia-watkins",
    name: "Dr. Alicia Watkins",
    type: "Therapy & wellness",
    proof: "Booking path live",
    image: "/images/client-proof/dr-alicia-site.png",
    copy: "Therapy, coaching, courses, and retreats brought together with direct booking and product pages.",
    href: "https://draliciawatkins.com/",
    status: "Visit website",
  },
  {
    id: "dear-pastors-wife",
    name: "Dear Pastor’s Wife",
    type: "Ministry & community",
    proof: "Resources, events, speaking, and giving",
    image: "/images/client-proof/dear-pastors-wife-site.png",
    copy: "A home for resources, events, speaking, and giving, organized around the people the ministry serves.",
    href: "https://dearpastorswife.org/",
    status: "Visit website",
  },
  {
    id: "kingsword",
    name: "KingsWord Training Institute",
    type: "Christian education",
    proof: "32 courses · student dashboard",
    image: "/images/client-proof/kti-site.jpg",
    copy: "A biblical studies certificate with enrollment, payment, and a dashboard that opens each module on schedule.",
    href: "https://thekti.org/",
    status: "Visit website",
  },
  {
    id: "lavar-scott",
    name: "Lavar Scott",
    type: "Motorsport",
    proof: "Sponsorship site in development",
    image: "/images/client-proof/lavar-scott-site.png",
    copy: "A partnership website with the driver’s story, audience, and sponsorship opportunities.",
    href: null,
    status: "In development",
  },
  {
    id: "essential-massage",
    name: "Essential Massage by Mesha",
    type: "Massage therapy",
    proof: "Booking still being connected",
    image: "/images/client-proof/mesha-massage-site.jpg",
    copy: "A dedicated website for the practice’s services, studio, and booking experience.",
    href: null,
    status: "Booking setup in progress",
  },
];

const niches: {
  name: string;
  sentence: string;
  href: string;
  cta: string;
  external: boolean;
}[] = [
  {
    name: "Therapy & wellness",
    sentence: "Therapy, courses, retreats, and a consultation path on one live site.",
    href: "https://draliciawatkins.com/",
    cta: "Dr. Alicia Watkins",
    external: true,
  },
  {
    name: "Ministries",
    sentence: "Resources, events, speaking, and giving, gathered for the people the ministry serves.",
    href: "https://dearpastorswife.org/",
    cta: "Dear Pastor’s Wife",
    external: true,
  },
  {
    name: "Creators & athletes",
    sentence: `${filmCount} films for Dr. Boyce Watkins are on this site, with a NASCAR sponsorship site still in development.`,
    href: "/#ai-video",
    cta: "Dr. Boyce Watkins films",
    external: false,
  },
  {
    name: "Local service",
    sentence: "A massage practice’s services and studio, with booking still being connected.",
    href: "/#essential-massage",
    cta: "Essential Massage by Mesha",
    external: false,
  },
  {
    name: "Coaches",
    sentence: "Private coaching offered on the same live site as therapy and retreats.",
    href: "https://draliciawatkins.com/",
    cta: "Dr. Alicia Watkins",
    external: true,
  },
];

const monthlyDeliverable = [
  ["8", "Social-ready AI cuts"],
  ["4", "Carousels"],
  ["1", "Caption pack"],
  ["1", "Campaign reel"],
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
      <section className="future-niches" aria-labelledby="niches-heading">
        <div className="future-niches-inner">
          <p className="future-label" id="niches-heading">
            Who we build for
          </p>
          <ul className="future-niche-list">
            {niches.map((niche) => {
              const body = (
                <>
                  <strong>{niche.name}</strong>
                  <p>{niche.sentence}</p>
                  <small>
                    {niche.cta} <span aria-hidden="true">↗</span>
                  </small>
                </>
              );
              return (
                <li key={niche.name}>
                  {niche.external ? (
                    <a href={niche.href} target="_blank" rel="noreferrer">
                      {body}
                    </a>
                  ) : (
                    <Link href={niche.href}>{body}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
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
                src="/videos/selected-work/subscription-car.jpg"
                alt="Dr. Boyce beside a red sports car in a Cozy Digital client film"
                width={1080}
                height={1920}
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
                <em className="future-lead-proof">
                  {filmCount} films · Dr. Boyce Watkins
                </em>
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
          <p className="future-label">01 / AI VIDEO · CLIENT WORK</p>
          <h2 id="video-heading">Dr. Boyce Watkins.</h2>
          <p>
            <span className="future-proof-stat">{filmCount} films</span>
            Money, habits, and history, told through film. These are the
            pieces selected for Dr. Boyce Watkins, from quick social comedy
            to longer storytelling. Our team shapes the script, scenes, and
            final edit.
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
            <article key={project.name} id={project.id} className="future-project">
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
              <p className="future-project-proof">{project.proof}</p>
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
      <section
        id="social-content"
        className="future-section future-month"
        aria-labelledby="social-heading"
      >
        <div className="future-section-head">
          <p className="future-label">GROWTH &amp; SCALE</p>
          <h2 id="social-heading">
            Social &amp; content,
            <br />
            each month.
          </h2>
          <p>
            8 social-ready AI cuts + 4 carousels + caption pack + 1 campaign
            reel / month. The monthly set on Growth and Scale.{" "}
            <a href={CLIENT_HUB_URL} target="_blank" rel={CLIENT_HUB_REL}>
              Compare plans in the {CLIENT_HUB_LABEL}
              <span className="sr-only"> {CLIENT_HUB_NEW_TAB_HINT}</span>
            </a>.
          </p>
        </div>
        <ol className="future-month-set">
          {monthlyDeliverable.map(([count, label]) => (
            <li key={label}>
              <span>{count}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
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
        <div className="future-close-actions">
          <Link href="/free-audit/#audit-form" className="future-button">
            Get the free audit <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/cozy-booking/" className="future-button future-button-quiet">
            Book a 30-min call <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
