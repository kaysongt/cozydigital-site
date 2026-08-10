"use client";

import { useEffect } from "react";

/**
 * Ad attribution capture.
 *
 * The site is a static export, so there is no server to read the query string
 * on the way in. Instead we grab the campaign params the first time someone
 * lands and keep them in sessionStorage, so they survive the internal
 * navigation from an ad landing page to /free-audit/ and still ride along on
 * the lead we send to the Cozy Client Hub.
 *
 * Session-scoped on purpose: it should describe how this visit started, not
 * follow someone around forever.
 */

const STORAGE_KEY = "cozy_attribution";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type Attribution = Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

/** Whatever was captured when this session started, or {} if it was direct traffic. */
export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {};
  } catch {
    // Private mode, disabled storage, or corrupt JSON: attribution is a
    // nice-to-have, never a reason to break a form.
    return {};
  }
}

/** "utm_source=facebook | utm_campaign=leads-aug" — for the lead's notes field. */
export function formatAttribution(attribution: Attribution): string {
  return Object.entries(attribution)
    .map(([key, value]) => `${key}=${value}`)
    .join(" | ");
}

export default function AttributionCapture() {
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return; // storage unavailable; nothing to do
    }
    // First touch wins: a later internal pageview must not overwrite the
    // campaign that actually brought this person here.
    if (stored) return;

    const params = new URLSearchParams(window.location.search);
    const captured: Attribution = {};
    for (const key of TRACKED_PARAMS) {
      const value = params.get(key)?.trim();
      if (value) captured[key] = value.slice(0, 200);
    }
    if (Object.keys(captured).length === 0) return; // direct visit

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // ignore
    }
  }, []);

  return null;
}
