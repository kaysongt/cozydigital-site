import { cozyVideoWebinar } from "@/data/cozy-ai-video-webinar";

/** Fixed labels only. Never pass names, emails, free text, or query strings. */
export function trackWebinarEvent(name: string, parameters: Record<string, string | number> = {}) {
  try {
    const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
    analytics.gtag?.("event", name, {
      form_id: "ai_video_webinar",
      webinar_id: cozyVideoWebinar.id,
      ...parameters,
    });
  } catch { /* Analytics must never block playback or registration. */ }
}
