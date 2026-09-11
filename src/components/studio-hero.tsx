import Image from "next/image";
import Link from "next/link";

export default function StudioHero() {
  return (
    <section className="studio-hero" aria-labelledby="studio-heading">
      <div className="studio-orbit" aria-hidden="true" />
      <div className="studio-hero-top"><span>Independent digital studio</span><span>Strategy. Design. Connection.</span></div>
      <div className="studio-hero-grid">
        <div className="studio-copy" data-hero-copy>
          <p className="studio-kicker"><span /> For businesses ready for their next chapter</p>
          <h1 id="studio-heading">Great at what<br />you do.<br /><em>Look the part.</em></h1>
          <p className="studio-intro">Websites that make an impression. Content that feels like you. Systems that turn “I’m interested” into your next customer.</p>
          <div className="studio-actions">
            <Link href="/free-audit/#audit-form" className="studio-button">Find your next move <span aria-hidden="true">↗</span></Link>
            <Link href="#client-work" className="studio-text-link">Explore our work <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="studio-reassurance">Start with a free audit. Leave with three clear priorities.</p>
        </div>
        <div className="studio-project-stage">
          <div className="studio-stage-label"><span className="studio-kicker">A little of what we do</span><span aria-hidden="true">↙</span></div>
          <Link href="#client-work" className="studio-preview studio-preview-main" aria-label="Explore the KingsWord Training Institute project">
            <div className="studio-browser-bar"><i /><i /><i /><span>thekti.org</span><span>↗</span></div>
            <Image src="/images/client-proof/kti-site.jpg" alt="KingsWord Training Institute website designed by Cozy Digital" width={1200} height={900} priority sizes="(min-width: 1024px) 520px, 90vw" />
          </Link>
          <Link href="#client-work" className="studio-preview studio-preview-small" aria-label="Explore the Dr. Alicia Watkins project">
            <div className="studio-browser-bar"><i /><i /><i /><span>draliciawatkins.com</span></div>
            <Image src="/images/client-proof/dr-alicia-site.png" alt="Dr. Alicia Watkins wellness website designed by Cozy Digital" width={1200} height={900} sizes="(min-width: 1024px) 300px, 55vw" />
          </Link>
          <div className="studio-seal" aria-hidden="true"><span>Made to</span><strong>connect.</strong><span>Cozy Digital ↗</span></div>
          <p className="studio-stage-caption">Real businesses. Thoughtfully connected.</p>
        </div>
      </div>
      <div className="studio-discipline-strip" aria-label="Our capabilities"><span>Web design & development</span><span aria-hidden="true">✳</span><span>Content & creative</span><span aria-hidden="true">✳</span><span>Booking & automation</span><span aria-hidden="true">✳</span><span>Search & AI visibility</span></div>
    </section>
  );
}
