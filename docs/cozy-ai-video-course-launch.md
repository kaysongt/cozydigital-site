# Cozy AI Video Course: launch review

Draft landing route: `/courses/cozy-ai-video-course/`. Product ID: `cozy-ai-video-course`.

## What this change does

- Adds a distinct, responsive cream/navy course landing page with a teal accent and course-index listing.
- Shows a factual seven-part curriculum outline with native expandable previews and a practical planning exercise.
- Clearly identifies the format as narrated production case studies, not live software screen recordings.
- Advertises $75 USD one-time launch pricing, 50% off a **planned** $150 regular price; no historical-price claim or artificial expiry.
- Leaves Prompt Boss and AI Advantage Blueprint offers unchanged.
- Disables purchasing and marks the landing page noindex until release checks pass. No paid media, access tokens, client names, or private source URLs are included.

## Release blockers

Do not merge or deploy until the owner confirms the product identity and the following checks pass:

- Complete the real Hub walkthroughs required by the original course scope, OR obtain the owner's explicit approval for a reduced case-study package. The current approximately 24-minute case-study inventory is not approval to change the product scope. Do not promise future extras, dates, or delivery that have not been approved.
- Listen to the complete seven-video set and verify the student workbook.
- Confirm rights to distribute all course examples and final student-facing labels.
- Upload lessons to paid-only storage and verify access after a confirmed purchase.
- Verify Stripe product identity, USD 7500 one-time price, visible taxes/refund policy, and server-side fulfillment. No payment link exists in this draft.
- Run a successful approved end-to-end checkout test, including return, delayed payment, repeat visits, and unpaid access denial.
- The canonical Hub sales route is `https://hub.cozydigital.org/courses/cozy-ai-video-course/`; its checkout action remains disabled in the Hub draft. Verify it end to end before enabling. Set `checkoutUrl` in `src/data/cozy-ai-video-course.ts` only to that verified route, then enable `salesEnabled`. This flag is presentation only; the Hub must enforce authorization.
- Update the FAQ's checkout status, remove noindex, add the landing page to the sitemap, and rerun all checks when enrollment opens.
- Add a public video excerpt/poster only after it has been explicitly cleared for marketing. None is assumed from the private lessons.

## Confirmed purchase terms — 15 October 2026

The owner selected 12 months of lesson access from confirmed payment and case-by-case refund review, with applicable consumer rights unaffected. Both storefronts disclose these terms before purchase. The protected delivery implementation must enforce the 12-month period; storefront copy alone does not implement expiry.

## Design and verification

Targeted addition to the existing site; existing routes, navigation, analytics and legal pages are preserved. The course surface uses a light editorial layout, navy type, cream background and teal accent. Native disclosures and a three-step interactive shot-planning preview use visible focus and reduced-motion support. No new production dependency is required. Only one offer panel is boxed; the rest uses open sections and horizontal rules.

Run `npx tsc --noEmit`, `npm run build` (includes `check:public`) and browser checks at phone and desktop widths. Check disclosures with keyboard and pointer, links/back navigation, disabled checkout and no horizontal overflow. The existing package's `lint` command uses `next lint`, which is not a configured lint setup for this Next version; do not count it as a passing lint run.

The current static export passes the production build, public-content checks, course-offer assertions, and TypeScript check. Local Chromium browser checks pass at 375, 390, 768, 1024, 1440 and 1920 pixels: no document overflow or JavaScript errors; planning-step buttons, keyboard activation, curriculum disclosures and the closed checkout work. Desktop and phone captures were visually inspected. This is local storefront QA, not payment fulfillment or signed-in Hub integration evidence.

## Purchaser identity disclosure

Final Railway readback on October 15 lists `STRIPE_SECRET_KEY` and no staged patch. The earlier missing-key configuration blocker is resolved; no credential value was fetched or configured by this storefront work. Protected lesson delivery, 12-month expiry and real sandbox payment/refund tests remain required. No enrollment is enabled by the key's presence alone.

The draft landing page now explains before checkout and in the FAQ that the purchase email and Google sign-in email must match, and that a fresh Google sign-in is required. Do not enable checkout until that exact flow passes integration tests. Existing generic Hub sessions and a receipt/return link alone must not establish entitlement. Do not advertise all-email password recovery as a working course-access method. No OAuth scopes or persistent permissions are changed by this storefront copy.
