# Public site audit — 2026-10-24

Scope: all 18 Next.js public pages on cozydigital.org, at desktop (1440px) and mobile (390px), plus linked destinations and key interactions.

## Changes

- Removed the unused signup/audit popup component, styles, and animations. The current layout already omitted it; the audit also confirmed no dialog appears after scrolling every public page.
- Free-playbook submissions now require both a successful HTTP response and `{ ok: true }`. Failures retain answers, offer retry and a direct free PDF download, and never show false confirmation.
- Removed the delayed automatic PDF popup. Downloads use the visible link; JavaScript-disabled visitors also receive a direct download fallback.
- Added accessible field labels and appropriate autocomplete/length limits to the playbook questions.
- Audit submissions now validate the saved response and time out instead of remaining pending indefinitely.
- Updated Next.js, Sharp, and the source-map dependency to patched versions. npm audit reports no known vulnerabilities.
- Added browser regression checks to the Pages deployment, before artifact publication, and switched installation to the lockfile with npm ci.

## Verification

- Crawled all 18 public pages at both widths: HTTP success, no page JavaScript errors, image errors, horizontal overflow, or open signup dialogs.
- Internal links and anchor targets passed; linked checkout, portfolio, social, calendar and Hub destinations responded successfully.
- Google Calendar embed displayed available appointments. No appointment was booked.
- All six featured films played; the design carousel advanced automatically and its manual controls worked.
- Mobile navigation, Escape/focus return, navigation dismissal, and persistent theme selection exercised in browser tests.
- Webinar tests cover confirmation, failures, retries, consent, attribution, no-JavaScript fallback, and 320/390/768/1440px layouts.
- Playbook and audit regression tests exercise HTTP failure, false-success response, retained inputs, and successful retry using mocked intake responses. They do not send customer emails or pollute the CRM.
- Production build and public-content checks run before release; deployment also runs both browser suites.

## Boundaries

- Cozy Notes automation is not configured; the page clearly offers an email-to-join fallback. This release does not activate a mailing service.
- No real purchase or booking is made by this audit. Prompt Boss's live configuration and purchase/access tests were reviewed separately, and its recovery fix is deployed in Hub commit 87c5499.
- Paid premium course availability remains controlled by its existing launch configuration.
