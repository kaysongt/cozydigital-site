import Link from "next/link";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import { cozyVideoCourse as course } from "@/data/cozy-ai-video-course";

/**
 * Homepage pointer to the free live webinar. The printed QR card is the main
 * channel and the course page stays noindex, so this is the only path for
 * someone who arrives at the homepage first. Date and time come from the
 * shared event record so they can never drift from the registration page.
 */
export default function WebinarStrip() {
  return (
    <aside className="future-webinar-strip" aria-labelledby="webinar-strip-title">
      <div className="future-webinar-strip-inner">
        <p>
          <span className="future-webinar-flag">FREE LIVE WEBINAR</span>
          <strong id="webinar-strip-title">{webinar.title}</strong>
          <time dateTime={webinar.startsAt}>
            {webinar.shortDate} at {webinar.shortTime}
          </time>
        </p>
        <Link href={`${course.path}#webinar-register`}>
          Save my seat <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </aside>
  );
}
