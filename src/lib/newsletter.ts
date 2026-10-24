// This is a public web-app URL, never an API credential.
const configured = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT?.trim() || "";
export const NEWSLETTER_ENDPOINT = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(configured) ? configured : "";
