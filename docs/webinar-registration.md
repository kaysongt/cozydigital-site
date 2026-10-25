# Free AI video webinar registration

The printed-card destination remains https://cozydigital.org/courses/cozy-ai-video-course/ . The new webinar section appears before the separate paid course. Paid pricing, checkout gating, access terms, and lesson access are unchanged.

## What this release does

- Collects name, email, optional creation goal, and separately optional marketing consent.
- Saves registrations to the existing Hub CRM via POST /api/webhook/lead, with leadSource beginning `AI Video Webinar`.
- Displays success only after HTTP success AND `{ok:true}`. Blocks double submission in the current page session. Existing public-intake rate limiting and honeypot remain in place.
- Records consent version, timestamp, event scope, optional marketing choice, and UTM attribution in notes. No attendee data goes into analytics events.
- Sends an existing Meta Lead event and a GA4 generate_lead event with form_id=ai_video_webinar only after confirmed persistence. Analytics failures do not change successful signup state.
- Uses the existing public course intro as a teaching-style preview. Does not publish private Drive files, raw meeting recordings, full paid lessons, or new video access links.

## Current event state: invite list, NOT a scheduled seat

No event date, time, meeting link, or approved full webinar player has been supplied. Public copy says date to be announced. Do not add a countdown, calendar invite, seat limit, live claim, or replay promise until verified.

The generic Hub intake endpoint does NOT send confirmation emails or reminders. This release does not claim otherwise. The on-page saved state is immediate; the team must send the confirmed schedule/viewing link to the webinar list. Do not describe email automation as delivered.

## First pilot workflow

1. Open Hub admin → People → Webinar signups. The list groups registrations by normalized email and shows Google Sheet sync status.
2. Explicit internal QA entries are excluded automatically. Repeated submissions update the displayed registration; the raw intake history stays in the CRM. The hub retries Sheet sync every five minutes, with manual Sync now available to admins.
3. Use `Optional marketing consent: no` contacts only for this webinar's requested details, not unrelated newsletters.
4. Confirm date/time/timezone, viewing platform/link, final program and Q&A format.
5. Send event details and joining instructions. Verify receipt and playback with a small internal group before Boyce promotes the event broadly.
6. Compare tagged registrations with actual attendance and purchases. Signup events alone do not measure attendance or paid conversion.

Public pilot attribution link:
https://cozydigital.org/courses/cozy-ai-video-course/?utm_source=boyce&utm_medium=show&utm_campaign=ai_video_webinar#webinar-register

The untagged printed QR remains valid. Do not label every untagged visitor as a QR scan; it may be direct or shared traffic.

## QA

`node scripts/test-webinar.mjs` runs browser/UI and request-contract tests against a local static build on port 4173. API replies are mocked; those checks do not prove production persistence or email delivery. Screenshots and JSON results are uploaded by Webinar page checks. A separate production intake validation check exercises an invalid address only (no attendee created), with the same public build-time intake value. A real saved signup and CRM readback remain distinct acceptance checks.

## Sheet export

The hub owns webinar persistence and export. `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` cannot bypass the hub. The seven-column Webinar registrations tab receives event registration data only; neither Subscribers nor Mail merge audience is changed. A requested marketing checkbox is not a confirmed newsletter subscription. The hub uses RAW cell values, email matching, and a database lock to make retried exports safe.
