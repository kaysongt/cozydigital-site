import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import CozyPublicHeader from "@/components/cozy-public-header";
import CozyPublicFooter from "@/components/cozy-public-footer";
import AuditPopup from "@/components/audit-popup";
import StructuredData from "@/components/structured-data";
import SiteMotion from "@/components/site-motion";
import MetaPixel from "@/components/meta-pixel";
import AttributionCapture from "@/components/attribution";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

// The GA4 property for the public marketing site, provided by the site owner.
// This is the only measurement ID the site should ever report to.
const GA_MEASUREMENT_ID = "G-QJ7R8893NF";

const description = "Cozy Digital helps service businesses improve their websites, messaging, content, booking paths, automation, and search visibility. Request a free Digital Presence Audit.";
const siteTitle = "Digital Presence for Service Businesses | Cozy Digital";

export const metadata: Metadata = {
  metadataBase: new URL("https://cozydigital.org"),
  title: {
    default: siteTitle,
    template: "%s",
  },
  description,
  openGraph: {
    title: siteTitle,
    description,
    url: "https://cozydigital.org",
    siteName: "Cozy Digital",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cozy Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://cozydigital.org/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply saved/system theme before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();",
          }}
        />
        <StructuredData />
        {/* GA4. The root layout renders once per document, so declaring the tag
            here is what keeps it from being injected twice. next/script
            de-duplicates by `id` and holds the loader until after hydration, so
            analytics never blocks first paint. Both the loader URL and the
            config call read GA_MEASUREMENT_ID, so the two can't drift apart. */}
        <Script
          id="ga4-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <MetaPixel />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} ${inter.className} flex min-h-screen flex-col bg-zinc-950`}
      >
        <SiteMotion />
        <AttributionCapture />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <CozyPublicHeader />
        <div id="main-content" className="flex-1">{children}</div>
        <CozyPublicFooter />
        <AuditPopup />
      </body>
    </html>
  );
}
