# Cozy Assistant

The bottom-right Ask Cozy launcher is shared by all pages through the root
layout. It opens only on request, supports Escape and native dialog focus,
respects reduced motion and small screens, and retains the current conversation
only in page memory. Clear conversation resets it; reload removes it.

Public business facts and curated destinations live in
`public/chat/knowledge.json`. Update these alongside changes to services or
policies. Avoid putting time-sensitive dates, service prices, unannounced offers,
internal notes or private customer information here. Event dates and live prices
stay on their authoritative pages.

Common questions are matched locally using complete words/phrases. Other
questions call the existing Hub at `https://hub.cozydigital.org/api/public/chat`.
The Hub implementation is in `kaysongt/cozy-client-hub/server/publicChat.ts`.
See that repo's `docs/public-website-chat.md` for activation and rate limits.
Only the server holds `COZY_CHAT_OPENROUTER_API_KEY`; never put it here or in a
NEXT_PUBLIC variable. No key is needed for built-in answers and navigation.

The UI renders provider text as escaped text and resolves link IDs against the
local allowlist, never model-provided URLs or markup. Missing keys, invalid
responses, timeouts, and usage limits fall back to the website guide. No message
is automatically submitted to the CRM, analytics, a mailing list, or a booking.

The frontend limits input to 500 characters, keeps at most 40 messages, permits
only one in-flight request, and pauses repeated requests locally. Those are UX
controls; the Hub applies the actual server-side limits. AI mode is optional and
is restricted by the server to free OpenRouter inference with no paid fallback.
