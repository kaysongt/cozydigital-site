# Cozy AI Video Course: launch review

Draft landing route: `/courses/cozy-ai-video-course/`. Product ID: `cozy-ai-video-course`.

## What this change does

- Adds a distinct, responsive charcoal/cyan course landing page and course-index listing.
- Shows a factual seven-part curriculum outline with native expandable previews and a practical planning exercise.
- Clearly identifies the format as narrated production case studies, not live software screen recordings.
- Advertises $75 USD one-time launch pricing, 50% off a **planned** $150 regular price; no historical-price claim or artificial expiry.
- Leaves Prompt Boss and AI Advantage Blueprint offers unchanged.
- Disables purchasing and marks the landing page noindex until release checks pass. No paid media, access tokens, client names, or private source URLs are included.

## Release blockers

Do not merge or deploy until the owner confirms the product identity and the following checks pass:

- Listen to the complete seven-video set and verify the student workbook.
- Confirm rights to distribute all course examples and final student-facing labels.
- Upload lessons to paid-only storage and verify access after a confirmed purchase.
- Verify Stripe product identity, USD 7500 one-time price, visible taxes/refund policy, and server-side fulfillment. No payment link exists in this draft.
- Run a successful approved end-to-end checkout test, including return, delayed payment, repeat visits, and unpaid access denial.
- Confirm the real Hub checkout route. Set `checkoutUrl` in `src/data/cozy-ai-video-course.ts` only to that verified route, then enable `salesEnabled`. This flag is presentation only; the Hub must enforce authorization.
- Update the FAQ's checkout status, remove noindex, add the landing page to the sitemap, and rerun all checks when enrollment opens.
- Add a public video excerpt/poster only after it has been explicitly cleared for marketing. None is assumed from the private lessons.

## Design and verification

Targeted addition to the existing site; existing routes, navigation, analytics and legal pages are preserved. A restrained editorial layout, single dark theme, existing cyan brand accent, native disclosure controls and visible keyboard focus support desktop and phone screens. No new dependency is required.

Run `npx tsc --noEmit`, `npm run build` (includes `check:public`) and browser checks at phone and desktop widths. Check disclosures with keyboard and pointer, links/back navigation, disabled checkout and no horizontal overflow. The existing package's `lint` command uses `next lint`, which is not a configured lint setup for this Next version; do not count it as a passing lint run.
