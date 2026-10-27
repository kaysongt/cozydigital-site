# Free AI video webinar registration

The printed-card destination remains https://cozydigital.org/courses/cozy-ai-video-course/ . The route now contains only the free workshop registration. The public 40-second intro remains near the top. The optional paid AI Video Creator Lab preview is on `/webinar/thank-you/`; its pricing, checkout gating, access terms, and lesson access are unchanged.

## What this release does

- Collects name, email, optional creation goal, and separately optional marketing consent.
- Saves registrations to the existing Hub CRM via POST /api/webhook/lead, with leadSource beginning `AI Video Webinar`.
- Displays success only after HTTP success AND `{ok:true}`. Blocks double submission in the current page session. Existing public-intake rate limiting and honeypot remain in place.
- Records consent version, timestamp, event scope, optional marketing choice, and UTM attribution in notes. No attendee data goes into analytics events.
- Sends an existing Meta Lead event and a GA4 generate_lead event with form_id=ai_video_webinar only after confirmed persistence. Analytics failures do not change successful signup state.
- Uses the existing public course intro as a teaching-style preview. Does not publish private Drive files, raw meeting recordings, full paid lessons, or new video access links.

## Current event: Thursday, November 5, 2026 at 9 p.m. Eastern

The owner moved the session to Thursday, November 5 at 9 p.m. Eastern on October 27; the page uses the America/New_York timezone. The shared event record is `src/data/cozy-ai-video-webinar.ts`, starting at `2026-11-05T21:00:00-05:00`.

The free workshop is named **From Idea to AI Video** and the headline is **Turn one idea into an AI video.** The optional paid course keeps the name **AI Video Creator Lab**. The existing 40-second public intro is in the first panel, before the form, with native playback controls and a poster extracted from that same film. There is no autoplay or video preload. Paid lesson access stays separate.

The webinar is hosted live by Quincy and Kayson, with prerecorded production examples. A joining URL has not yet been supplied; the page says the team will email joining instructions before the session. There is no claim that a confirmation email has already been sent, no invented seat limit, and no replay promise. Refresh the schedule and copy after this pilot before promoting a new session.

The generic Hub intake endpoint does NOT send confirmation emails or reminders. This release does not claim otherwise. The on-page saved state is immediate; the team must send the confirmed schedule/viewing link to the webinar list. Do not describe email automation as delivered.

## First pilot workflow

1. Open Hub admin → People → Webinar signups. The list groups registrations by normalized email and shows Google Sheet sync status.
2. Explicit internal QA entries are excluded automatically. Repeated submissions update the displayed registration; the raw intake history stays in the CRM. The hub retries Sheet sync every five minutes, with manual Sync now available to admins.
3. Use `Optional marketing consent: no` contacts only for this webinar's requested details, not unrelated newsletters.
4. Confirm the viewing platform/link and final program; send the scheduled Thursday, November 5 at 9 p.m. Eastern details. If a different timezone was intended, update the shared event record and page metadata before distribution.
5. Send event details and joining instructions. Verify receipt and playback with a small internal group before Boyce promotes the event broadly.
6. Compare tagged registrations with actual attendance and purchases. Signup events alone do not measure attendance or paid conversion.

Public pilot attribution link:
https://cozydigital.org/courses/cozy-ai-video-course/?utm_source=boyce&utm_medium=show&utm_campaign=ai_video_webinar#webinar-register

The untagged printed QR remains valid. Do not label every untagged visitor as a QR scan; it may be direct or shared traffic.

## QA

`node scripts/test-webinar.mjs` runs browser/UI and request-contract tests against a local static build on port 4173. API replies are mocked; those checks do not prove production persistence or email delivery. Screenshots and JSON results are uploaded by Webinar page checks. A separate production intake validation check exercises an invalid address only (no attendee created), with the same public build-time intake value. A real saved signup and CRM readback remain distinct acceptance checks.

## Sheet export

The hub owns webinar persistence and export. `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` cannot bypass the hub. The seven-column Webinar registrations tab receives event registration data only; neither Subscribers nor Mail merge audience is changed. A requested marketing checkbox is not a confirmed newsletter subscription. The hub uses RAW cell values, email matching, and a database lock to make retried exports safe.

## Conversion refresh, October 25

- First panel: the new headline, real video intro, one `Save my seat` action, and scheduled date/time.
- The optional creation-goal field is inside a disclosure. Existing field names, order, consent wording, intake API, retry ID, and validation stay intact.
- Existing `generate_lead` and Meta Lead events fire only after the Hub confirms `{ok:true}`. `form_id` and `lead_type` remain stable; `webinar_id` identifies this session.
- Added fixed-label GA events: `webinar_cta_click` (hero/program), `webinar_form_start`, `webinar_signup_error`, `webinar_intro_start`, `webinar_intro_progress` (25/50/75), and `webinar_intro_complete`. These carry no names, emails, goals, or full URLs. Intro engagement is not live-webinar attendance.
- Existing CI covers mocked registration success/error, consent, attribution, no-JavaScript fallback, responsive overflow, intro placement, and event details in the saved notes. A live real-person signup and email delivery still need separate confirmation.

Design read: preserve the existing Cozy Digital teal, Manrope/Space Grotesk type, and light course surface; use the existing Next.js/native CSS stack. DESIGN_VARIANCE 6, MOTION_INTENSITY 3, VISUAL_DENSITY 4. The change puts evidence and an action in the first viewport, keeps the canonical route, and avoids new dependencies.


## Conversion and celebration update, October 26

- Registration page: free workshop only, real event countdown (America/New_York), three practical takeaways, founder portraits and existing role/portfolio evidence, and the live-attendee 13-page workbook bonus. There is no invented seat cap, testimonial, student count, or claim that producing videos never requires paid tools.
- The two required fields remain name and email. The question field stays collapsed and marketing consent remains optional and unchecked. Consent wording and stable analytics IDs remain unchanged.
- A confirmed JSON `{ok:true}` redirects to `/webinar/thank-you/#registered`. Only that arrival fires a short, silent confetti burst. It honors reduced motion, does not block controls, and clears after 3.4 seconds. The fragment is then removed; refreshes do not replay it. A direct unmarked thank-you visit does not claim registration. The marker is presentation state only and grants no course access.
- The thank-you screen offers Google Calendar, Outlook, and an iCalendar download. Start is November 6 at 02:00 UTC, equivalent to November 5 at 9 p.m. Eastern (EST). A clearly disclosed one-hour calendar hold is not a claim about session duration. The calendar file and server fallback must be updated with the shared event data for future sessions.
- Native submissions POST to the Hub `/api/webhook/webinar-register`. The server shares the existing public intake key and rate limiter, validates inputs and the honeypot, preserves separate consent, and calls the same CRM `createLead`. It returns a complete HTML confirmation with calendar links only after persistence. Error pages preserve escaped input for retry. This route is also usable without JavaScript and does not send emails.
- Deploy the Hub endpoint before the marketing page. The new endpoint has focused handler tests for persistence, validation, failure, consent, escaping, and throttling. Existing browser QA now covers separated offers, thank-you routing, calendar times, native form submission, and reduced motion.
- Operational follow-through: the team still needs to send the joining link and share the workbook during the live session. Neither the signup API nor the calendar buttons send these emails or distribute paid files.

Design read: playful workshop registration for creators and small businesses, preserving existing assets, Manrope/Space Grotesk type, and teal. DESIGN_VARIANCE 6, MOTION_INTENSITY 5 (confirmed-signup celebration), VISUAL_DENSITY 4. Native CSS and existing Next.js; no added runtime dependencies.
