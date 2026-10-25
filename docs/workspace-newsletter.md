# Cozy Digital newsletter setup

Update October 25: Webinar signup now always saves to the hub. The hub exports its deduplicated registration list to the Webinar registrations Sheet tab every five minutes. `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` now only controls the separate newsletter page; it does not reroute webinar signups. Two real historical registrations were copied into the Webinar registrations tab. Automated exports require the Sheets API enabled for the configured service account. The older rollout notes below describe the original, unactivated Apps Script plan.

Prepared October 24, 2026. **Not activated**: Google Apps Script sign-in was blocked by a rejected password. No newsletter or confirmation email was sent. Production intake still uses the existing Hub CRM. Two clearly labeled, non-deliverable internal QA submissions were accepted through the live API; browser submission still needs verification after a stale site build produced an error.

## What is ready

- Private Workspace workbook owned by `out@cozydigital.org`: `Cozy Digital — Newsletter and Webinar List`.
- A separate `/newsletter/` page with explicit consent and email confirmation.
- Optional Workspace intake for the existing webinar form, preserving event-only consent.
- Apps Script backend with a confirmed subscriber list, unsubscribe links, per-address cooldown, daily caps, spreadsheet formula escaping, serialized writes, and duplicate webinar-registration handling.
- Audience export for **native Gmail mail merge**, always sent from `out@cozydigital.org`. No campaign sender, time trigger, or automatic newsletter schedule has been enabled.

## Activate

1. Sign into Google Apps Script as `out@cozydigital.org`. Create a standalone project called `Cozy Digital Newsletter`. Add `integrations/google-workspace/Code.gs` and the manifest. Keep exception logging disabled so form payloads are not captured in error reports.
2. Set Script Properties: `SPREADSHEET_ID` to the private workbook ID, then create a web-app deployment that executes as the owner and permits visitor submissions. Keep the Sheet private. Review the Sheets, send-mail and identity permissions before authorizing. Do not change organization sharing policies to force deployment.
3. Set `WEB_APP_URL` to the deployment `/exec` URL, then run `setup()`. It validates headers and sender; it sends nothing.
4. With an explicitly approved internal test address, verify signup → confirmation email → pending row → POST confirmation → subscribed row → export → unsubscribe → removed from export. Verify GET link previews do not change consent. Verify webinar-only registration sends no newsletter confirmation and a mail failure retains webinar registration while reporting newsletter retry.
5. Set repository variable `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` to the verified `/exec` URL and deploy this branch through the normal Pages release workflow. This activates the separate newsletter page; webinar registration continues through the hub. Audit/playbook forms continue using the Hub CRM. Confirm real browser cross-origin behavior; opaque responses are not proof of success.
6. Verify a signup from the published website and the Sheet readback. Confirm receipt using the test mailbox. Re-test mobile validation and failures.

Until the endpoint is configured, existing webinar intake is unchanged and the newsletter page displays an email fallback. Do not enable an unverified endpoint. The new Sheet begins empty; historical Hub leads were not copied. Only migrate people with documented newsletter consent. Webinar-only contacts remain event-only.

## Sending Cozy Notes

Run `exportNewsletterAudience()` immediately before a send. The first tab, `Mail merge audience`, contains only confirmed subscribers with Email and Name. Use native Gmail **mail merge** from `out@cozydigital.org`; keep its recipient-specific unsubscribe links and suppression. Google-managed opt-outs are additional to the Sheet status and are not automatically written back into the Sheet. Never bypass Gmail suppression by using ordinary BCC or switching senders. Review each campaign and recipient count before sending.

Confirm this Workspace edition supports mail merge. If it does not, leave sends disabled until an approved sending tool is selected. Use a link to the webinar, not the large video as an email attachment. Confirm the final link/audience and approved business mailing address for the campaign footer before release.

Suggested first issue subject: **One thing to decide before your next AI video**

Draft: “Before you write a long prompt, decide what the shot needs to do. Is it introducing a character, showing a product detail, or moving the story forward? Give it one clear job, then choose the reference and camera movement around that. We use examples from our try-on, drama, and racing work in the Cozy AI Video Course. Take a look at the preview: https://cozydigital.org/courses/cozy-ai-video-course/ . — Quincy and Kayson, Cozy Digital.”

This draft has not been sent or scheduled.

## Checks and limits

`node scripts/test-workspace-newsletter.mjs` tests the backend with Google services mocked. `npm run build` checks the static site. Neither proves Google authorization, mail delivery, sender authentication or browser delivery through Google’s redirect.

Validation on October 24: all 19 backend checks passed; production builds passed with the endpoint absent and with a syntactically valid test endpoint. Local browser automation was unavailable. A later cloud-browser check loaded an older asset and reported an unconfirmed signup; the current public API accepted a matching test payload. The Railway connector returned `Unknown tool` errors after reconnection, so service diagnostics remain blocked. Confirmation pages now use Google’s supported viewport API and top-level navigation for iframe-hosted forms. Live Google deployment, browser submission and email receipt remain activation checks.

Initial caps: 100 public submissions/day and 50 confirmation messages/day, plus Google’s account quota. These deliberately limit confirmation abuse; review expected demand before increasing them. This is a pilot setup, not a bulk-mail platform. Domain SPF/DKIM/DMARC and the Workspace plan have not been verified in this session. No DNS records, authentication settings or existing client lists were changed.

References: https://support.google.com/mail/answer/12921167?hl=en ; https://developers.google.com/apps-script/guides/web ; https://developers.google.com/apps-script/reference/mail/mail-app .
