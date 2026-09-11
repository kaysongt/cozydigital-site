import DesignCarousel from "@/components/design-carousel";
import Link from "next/link";

export default function StudioHero() {
  return (
    <section className="studio-hero" aria-labelledby="studio-heading">
      <div className="studio-orbit" aria-hidden="true" />
      <div className="studio-hero-top"><span>Independent digital studio</span><span>Strategy. Design. Connection.</span></div>
      <div className="studio-hero-grid studio-hero-balanced">
        <div className="studio-copy" data-hero-copy>
          <p className="studio-kicker"><span /> For businesses ready for their next chapter</p>
          <h1 id="studio-heading">Websites that work.<br /><em>AI video that moves.</em></h1>
          <p className="studio-intro">Custom websites and AI-generated video, made for your business. Build a clear place to buy or book. Create ads, product stories, and brand films that bring your offer to life.</p>
          <div className="studio-actions">
            <Link href="#client-work" className="studio-button">Explore websites <span aria-hidden="true">↓</span></Link>
            <Link href="#ai-video" className="studio-button">Explore AI video <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="studio-reassurance">Start with a free audit. Leave with three clear priorities.</p>
        </div>
        <div className="studio-lead-media"><DesignCarousel /><figure className="overflow-hidden rounded-2xl border border-white/15 bg-black"><video src="/videos/client-ad.mp4" poster="/videos/client-ad-poster.jpg" controls playsInline preload="none" aria-label="Cozy Digital short-form client advertisement" className="aspect-[3/2] w-full object-contain" /><figcaption className="px-5 py-4 text-sm text-white">AI video &amp; ad creative · Client campaign work</figcaption></figure></div>
      </div>
      <div className="studio-discipline-strip" aria-label="Our capabilities"><span>Web design & development</span><span aria-hidden="true">✳</span><span>AI video generation & production</span><span aria-hidden="true">✳</span><span>Booking & automation</span><span aria-hidden="true">✳</span><span>Search & AI visibility</span></div>
    </section>
  );
}
