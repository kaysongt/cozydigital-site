/** Public marketing copy only. Never put lesson URLs or access tokens here. */
export const cozyVideoCourse = {
  id: "cozy-ai-video-course",
  title: "AI Video Creator Lab",
  path: "/courses/cozy-ai-video-course/",
  launchPrice: 75,
  plannedRegularPrice: 150,
  currency: "USD",
  accessMonths: 12,
  refundPolicy: "Requests reviewed case by case; applicable consumer rights are unaffected.",
  // Flip only after the approved product, $75 Stripe checkout and paid-only
  // delivery have passed end-to-end QA. This is not a security boundary.
  salesEnabled: false,
  checkoutUrl: "https://hub.cozydigital.org/courses/cozy-ai-video-course/",
  lessonCount: 6,
  lessonRuntime: "20 minutes, 50 seconds",
  workbookPages: 13,
  orientation: { title: "Start with a production plan", description: "Use the course introduction to frame your audience, purpose, format, and the moment your film needs to land." },
  curriculum: [
    { title: "Prepare your workspace", description: "An account-preparation case study before production begins.", practice: "Check your tool access, references, usage rights, and generation budget." },
    { title: "Direct a fashion try-on", description: "A narrated case study in planning a fashion sequence.", practice: "Define the outfit and character details that must stay consistent between shots." },
    { title: "Build a dialogue scene", description: "A narrated case study in character-led drama.", practice: "Map who speaks, what changes in the scene, and which shot carries each beat." },
    { title: "Keep a racing sequence consistent", description: "A narrated case study in vehicle and shot continuity.", practice: "Make a continuity checklist for the vehicle, framing, lighting, and action." },
    { title: "Plan a transformation", description: "A narrated case study in a visual transformation sequence.", practice: "Break the change into clear stages and approve the key images before animation." },
    { title: "Connect an episodic story", description: "A narrated case study in shaping story episodes.", practice: "Track character details and story beats across a sequence, then review what needs a fix." },
  ],
} as const;

/** Only the canonical Hub sales page may receive the buyer. */
export function validateCozyVideoCheckout(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "hub.cozydigital.org" ||
        url.port || url.username || url.password || url.search || url.hash ||
        url.pathname !== "/courses/cozy-ai-video-course/") return null;
    return url.href;
  } catch { return null; }
}

/** Fail closed: a missing or unverified checkout must never become a buy link. */
export function getCozyVideoCheckout(): string | null {
  if (!cozyVideoCourse.salesEnabled || !cozyVideoCourse.checkoutUrl) return null;
  return validateCozyVideoCheckout(cozyVideoCourse.checkoutUrl);
}
