import DesignCarousel from "@/components/design-carousel";
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
        <DesignCarousel />
      </div>
      <div className="studio-discipline-strip" aria-label="Our capabilities"><span>Web design & development</span><span aria-hidden="true">✳</span><span>Content & creative</span><span aria-hidden="true">✳</span><span>Booking & automation</span><span aria-hidden="true">✳</span><span>Search & AI visibility</span></div>
    </section>
  );
}
