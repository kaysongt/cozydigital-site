# Free AI video webinar registration

The shared URL and printed QR destination remain https://cozydigital.org/courses/cozy-ai-video-course/ .

## Current registration flow — October 27, 2026

The website embeds the owner's Luma event, https://luma.com/h5qnohwa . Visitors click **Save my seat**, reach the signup area, and complete the Luma registration there. The direct **Open registration on Luma** link remains available if embeds are blocked or the visitor prefers a separate tab. The countdown remains above signup; the client-film examples remain below it.

The event is Thursday, November 5, 2026, 9–10:30 p.m. Eastern / 8–9:30 p.m. Central, on Google Meet. The shared source is `src/data/cozy-ai-video-webinar.ts`. Calendar links and the ICS download match the 90-minute Luma schedule.

### Where registrations go

- New website registrations go directly to Luma. Luma owns the registration UI, confirmation, joining information, and event communications.
- The website no longer posts new webinar registrations to the Hub. Existing Hub/Google Sheet registrations remain untouched.
- This embed does **not** import previous attendees into Luma or create a Luma-to-Hub/Sheets sync. Those require a separate authenticated import or integration. The old event id is retained for historical Hub records.
- There is no separate marketing opt-in collected on the Cozy page. Do not treat Luma registration as consent for unrelated newsletters.
- The optional paid course remains separate at `/webinar/thank-you/`; its purchase flow and access rules are unchanged. That legacy confirmation route does not establish Luma registration.

### Attribution and confirmation

Only documented UTM/ad-click fields are forwarded from the landing URL to the iframe and fallback link. Untagged visits use `utm_source=cozydigital&utm_medium=website`; they are not automatically called QR scans.

The official `luma:purchase` message also fires for free registrations. The website accepts it only from `https://luma.com` **and** the exact embedded frame, with a non-empty transaction id. Confirmed registrations show the existing reduced-motion-aware confetti and send the existing GA4 `generate_lead` and Meta Lead events. Transactions are deduplicated in memory and session storage. Clicks, iframe loads, and forged parent messages never count as signups. No names or emails are sent to site analytics.

Official embed reference: https://help.luma.com/p/embed-luma-on-your-website .

## QA and operational limits

`node scripts/test-webinar.mjs` verifies the embed contract with a mocked external frame, attribution, forged/duplicate messages, responsive layout, fallback navigation, film playback, calendar schedule, and reduced-motion behavior. It never submits a real attendee to Luma. A separate browser check verifies that the live embedded event opens its real Name/Email registration flow.

Existing Hub registrations and any historical Sheet export remain in their existing systems. Confirm a real registration email and Google Meet access using an authorized internal attendee before promotion; the automated tests do not claim email delivery or a completed live registration.
