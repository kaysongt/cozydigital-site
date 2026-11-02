# Dr. Alicia Watkins client spotlight

Focused homepage addition before Selected Work. Existing portfolio, routes,
analytics, and forms are unchanged. The spotlight uses the site's existing
light/dark tokens, restrained cyan accent, rounded media frame, and a stacked
mobile layout. Design direction: editorial client proof; variance 5, motion 1,
density 4. No new animation or client-side JavaScript.

## Claim and asset provenance

- Cozy's placement contribution is supplied by the owner in the November 2,
  2026 request. Wording deliberately says "helped ... land a guest appearance."
- BET's October 13 announcement lists Dr. Alicia Watkins among the experts:
  https://www.paramountpressexpress.com/bet/shows/nick-cannon-night/releases/?view=113396-bet-launches-nick-cannon-night-bringing-candid-conversation-to-late-night-premiering-tuesday-october-20
- Episode details supplied and verified during the parent task: Season 1,
  Episode 2, October 27, 2026; Natalie Nunn and Dr. Watkins. Listing:
  https://tv.apple.com/us/episode/natalie-nunn--dr-watkins-are-you-too-broke-to-date/umc.cmc.7hiwc52dpk0z7ofab9h33p3ne?showId=umc.cmc.7ilp9ckg7lyshld9lo1oxaxlq
- Portrait is the existing client-site asset from
  `kaysongt/dralicia/src/dralicia-hero-yellow-900.webp`, copied without edits.
  It is not a broadcast still. No BET logo, video, metrics, or endorsement claim.

## Verification

- Local `npm run build` passed, including TypeScript validity checks, static
  export of all 25 pages, and the existing public-content guard.
- Standalone `tsc --noEmit` passed. Built-homepage HTML inspection confirmed
  one spotlight heading, both expected links, and the lazy-loaded portrait
  present in the export.
- Browser visual QA remains outstanding: Chromium is blocked in this sandbox.
  The local source snapshot excludes unrelated binary media, so it is not a
  replacement for a full-repository browser run. No production assets changed.

- `node scripts/check-client-spotlight.mjs` checks the insertion, accessible
  heading, contact destination, source link safety, factual copy, asset, and
  responsive/theme rules. This is a source check, not a browser test.
- Run `npm run build`, then the existing `scripts/test-site.mjs` in an authorized
  browser-capable environment before release. Review at 390px and 1440px in
  both themes, check the portrait crop, keyboard focus, and both links.
- Keep the PR in draft until visual QA is complete. No main-branch push,
  merge, production deployment, or workflow changes are part of this update.
