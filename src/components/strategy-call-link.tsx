"use client";

import Link from "next/link";

function trackStrategyCallClick() {
  // Record intent, not a booked appointment. No visit-specific fields are sent.
  const analytics = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof analytics.gtag === "function") {
    analytics.gtag("event", "strategy_call_click", { cta_location: "homepage_hero" });
  } else {
    analytics.dataLayer ??= [];
    const queue = function (...args: unknown[]) {
      // GA's command queue expects an arguments object.
      void args;
      analytics.dataLayer?.push(arguments);
    };
    queue("event", "strategy_call_click", { cta_location: "homepage_hero" });
  }
}

export default function StrategyCallLink({ className }: { className: string }) {
  return (
    <Link href="/cozy-booking/#schedule" className={className} onClick={trackStrategyCallClick}>
      Book your free strategy call
    </Link>
  );
}
