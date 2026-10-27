"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";

// Homepage strip pointing to the free workshop. Hides itself once the
// calendar hold has ended so a stale date never lingers on the homepage.
export default function WebinarBanner() {
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    setEnded(Date.now() > new Date(webinar.calendarEndsAt).getTime());
  }, []);
  if (ended) return null;

  return (
    <Link
      href="/courses/cozy-ai-video-course/"
      className="webinar-banner"
      aria-label={`Free live workshop: ${webinar.title}, ${webinar.date} at ${webinar.time}. Save your seat.`}
    >
      <span className="webinar-banner-tag">Free live workshop</span>
      <span className="webinar-banner-copy">
        {webinar.title} · {webinar.shortDate}, {webinar.shortTime}
      </span>
      <span className="webinar-banner-cta">
        Save your seat <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
