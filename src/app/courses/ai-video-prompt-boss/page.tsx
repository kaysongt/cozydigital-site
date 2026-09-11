import type { Metadata } from "next";
import PromptBossPage from "@/components/prompt-boss-page";

const checkoutUrl = "https://buy.stripe.com/dRmaEQaJ59Yudu5b8ga7C03";
export const metadata: Metadata = {
  title: "AI Video Prompt Boss | 120 Prompts & Director's Playbook | Cozy Digital",
  description: "Stop guessing. Start directing. Get the 70-page AI video PDF course with 120 prompts, 14 cheat sheets and word banks, 3 storyboards, and an AI Director master prompt. $30, one time.",
  alternates: { canonical: "https://cozydigital.org/courses/ai-video-prompt-boss/" },
  openGraph: { title: "AI Video Prompt Boss — Stop guessing. Start directing.", description: "120 prompts. 14 cheat sheets and word banks. 3 storyboards. One practical PDF playbook for $30.", url: "https://cozydigital.org/courses/ai-video-prompt-boss/", images: [{ url: "/courses/ai-video-prompt-boss-cover.png", width: 773, height: 1000, alt: "AI Video Prompt Boss by Cozy Digital" }] },
  twitter: { card: "summary_large_image", title: "AI Video Prompt Boss | Cozy Digital", description: "A practical 70-page AI video PDF playbook. $30, one time.", images: ["/courses/ai-video-prompt-boss-cover.png"] },
};
export default function Page() {
  const product = { "@context": "https://schema.org", "@type": "Product", name: "AI Video Prompt Boss", description: "70-page downloadable PDF course and playbook with 120 prompts, 14 cheat sheets and word banks, 3 storyboards, and an AI Director master prompt.", image: "https://cozydigital.org/courses/ai-video-prompt-boss-cover.png", brand: { "@type": "Brand", name: "Cozy Digital" }, offers: { "@type": "Offer", price: "30.00", priceCurrency: "USD", availability: "https://schema.org/InStock", url: checkoutUrl } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} /><PromptBossPage checkoutUrl={checkoutUrl} /></>;
}
