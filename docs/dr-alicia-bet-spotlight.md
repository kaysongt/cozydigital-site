# Dr. Alicia Watkins hero client proof

Updated at the owner's November 2 request: BET and Nick Cannon @ Night marks
are now inside the top hero panel, not a separate section below the fold.
Desktop places proof beside the original service headline; mobile puts the
proof panel before the headline. The website/AI-video positioning, audit CTA,
booking CTA, founder link, and all other portfolio content remain intact.

## Claim and assets

The owner's placement attribution is phrased as "helped our client land a
guest appearance." Client identity is prominent; the footer note explicitly
does not imply a BET endorsement of Cozy Digital. The show is named
Nick Cannon @ Night, without asserting a separate podcast appearance.

- BET announcement listing Dr. Alicia Watkins:
  https://www.paramountpressexpress.com/bet/shows/nick-cannon-night/releases/?view=113396-bet-launches-nick-cannon-night-bringing-candid-conversation-to-late-night-premiering-tuesday-october-20
- Episode listing (S1E2, October 27, 2026):
  https://tv.apple.com/us/episode/natalie-nunn--dr-watkins-are-you-too-broke-to-date/umc.cmc.7hiwc52dpk0z7ofab9h33p3ne?showId=umc.cmc.7ilp9ckg7lyshld9lo1oxaxlq
- Official BET white mark, unchanged:
  https://www.bet.com/svg/BET_Logo_Hero_Square_Large_100K_CMYK_White.svg
- Show-title artwork from the official BET-era press key art:
  https://public-assets-pressexpress.s3.amazonaws.com/assets/pages/images/2026/10/13/image_7877545131791911315147-foibpwfk.png

The show mark uses a CSS viewport (55,155,910,355) into the unchanged
1600x900 official key-art JPEG. No generative recreation or modified logo.

Marks identify the client's appearance only. No broadcast video, invented
metrics, partner badge, or claim that BET endorses the studio.

## Verification

Run:
- `node scripts/check-client-spotlight.mjs`
- `npm run build`
- `npx tsc --noEmit`

The source guard checks placement inside StudioHero, no duplicate lower
spotlight, both logo assets, preserved service CTAs, safe external link,
accessible heading and explicit client/endorsement copy.

Before release, review at 390px and 1440px in both themes, including initial
viewport logo visibility, keyboard focus and links. Chromium is sandbox-
blocked here, so browser visual QA is still required. The local source
snapshot excludes unrelated binary media; it is not a full media QA checkout.

Keep PR 26 in draft until visual QA is complete. No main push, merge,
production deployment, or workflow change is part of this update.

Revision verification: production build (25 static pages) and public-content
checks passed; TypeScript and hero source guard passed. Exported HTML confirms
both eager-loaded logo assets are inside the hero, with one original H1,
original audit/booking links, and no duplicate lower spotlight. Browser
viewport verification remains explicitly outstanding.
