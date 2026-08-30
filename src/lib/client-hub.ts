/**
 * The Client Hub is a separate application. Plan details and sign-in for
 * current clients live there, which is why this marketing site links out to it
 * instead of restating any of it. Keeping the address in one constant means the
 * header, footer, services page, and the /pricing/ redirect can never drift
 * apart if the Hub ever moves to its own domain.
 */
export const CLIENT_HUB_URL = "https://cozy-client-hub-production.up.railway.app/";

/** The label to use everywhere, so the link is recognisable page to page. */
export const CLIENT_HUB_LABEL = "Client Hub";

/**
 * Hub links open in a new tab so people don't lose the page they were reading.
 * `noopener` keeps the new tab from touching `window.opener`; `noreferrer`
 * also avoids leaking the page address through the referrer header.
 */
export const CLIENT_HUB_REL = "noopener noreferrer";

/** Announced to screen readers, since the new tab is otherwise a surprise. */
export const CLIENT_HUB_NEW_TAB_HINT = "(opens in a new tab)";
