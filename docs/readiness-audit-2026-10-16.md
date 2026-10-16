# Public-site readiness audit — October 16, 2026

The marketing pages are suitable for browsing and enquiries after this patch. This is not a sign-off for every paid offer or for the separate Hub's self-service production flow.

## Changes

- Default to the daylight theme, preserving an explicitly saved dark preference and a usable no-JavaScript default. This carries forward the still-relevant part of PR #4.
- Correct low-contrast text and translucent dark surfaces in the light theme. Make the Prompt Boss promo's text follow its actual background on both home and Courses.
- Improve small supporting text in saved dark mode, and underline the inline Hub plan link.
- Replace the AI Advantage embedded Stripe iframe with its existing, verified $30 one-time payment link. The direct button works without Stripe’s loader and avoids an unnamed third-party iframe; it does not enable a new offer. Applicable tax remains calculated by Stripe.
- Use `https://hub.cozydigital.org/` for Hub navigation, the legacy pricing redirect and public lead intake. Preserve existing payment destinations and course purchase gates.
- Use a native audit dialog: hidden until opened, background focus prevented, Escape dismissal, scroll restoration, accessible field names and bounded mobile scrolling. Keep dismissal for the session.
- Associate all eight audit-form validation errors with their fields. Preserve actual lead-submission behavior.

## Verification

- `npm run build`: pass, including type validation and the public-content checks.
- `npx tsc --noEmit`: pass.
- `node scripts/check-video-course.mjs`: pass. Premium-course enrollment remains closed.
- `git diff --check`: pass.
- Chromium + axe WCAG 2 A/AA and 2.1 AA: 17 public routes at 390 and 1440 pixels, 34 checks; no reported violations, missing images, page errors or horizontal overflow in the revised daylight build.
- 462 internal links across those pages: all target files and fragment IDs exist in the export.
- Browser interaction checks: mobile menu/Escape, empty-form validation, field error associations, simulated failed submission then retry/success, modal keyboard traversal, dismissal and scroll restoration passed. Submissions were intercepted locally; no real lead or email was created.
- The saved dark preference is preserved; the course index's low-contrast supporting text was corrected separately.
- Live canonical Hub lead endpoint responds to CORS preflight. This is connectivity evidence, not a confirmed CRM delivery.

Routes checked: home, Services, AI Search, About, Founders, FAQ, Free Audit, Free Playbook, its thank-you page, booking, Courses, Prompt Boss, premium video course, AI Academy, Academy Access, Privacy and Terms. Legacy home/pricing redirects were also inspected. Chrome-only checks do not establish Safari/Firefox compatibility or assistive-technology usability.

## Open work

- The AI Advantage HTML course is in this public static site. An unlisted path and `noindex` do not enforce purchase access. Moving paid delivery to a protected server flow requires a coordinated migration that preserves existing buyers' access; this patch does not remove their current delivery.
- Premium video-course payment and protected delivery are still gated by the Hub release and integration tests. Do not describe the complete storefront as launch-ready.
- Actual enquiry delivery, a real booking, payment/refund tests and private buyer access were not exercised here.
- PR #11's optional Lamp FAQ helper needs a separate current-content review; it is not needed to repair these launch issues. PR #7's old logo treatment was superseded by merged PR #8 and should not be revived.
- No load test, Web Vitals benchmark or complete cross-browser audit was run. Existing `npm run lint` points to the removed Next lint command; the successful build/type/content checks must not be reported as an independent lint pass.
