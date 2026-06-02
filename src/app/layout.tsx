import "./globals.css";
import type { Metadata } from "next";
import CozyPublicHeader from "@/components/cozy-public-header";
import CozyPublicFooter from "@/components/cozy-public-footer";
import AuditPopup from "@/components/audit-popup";

const description = "Practical growth systems for service brands — sharper websites, cleaner content, and booking paths that turn visitors into clients.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cozydigital.org"),
  title: {
    default: "Cozy Digital | Websites, Content & Lead Systems",
    template: "%s",
  },
  description,
  openGraph: {
    title: "Cozy Digital | Websites, Content & Lead Systems",
    description,
    url: "https://www.cozydigital.org",
    siteName: "Cozy Digital",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cozydigital.org/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-zinc-950">
        <CozyPublicHeader />
        <div className="flex-1">{children}</div>
        <CozyPublicFooter />
        <AuditPopup />
      </body>
    </html>
  );
}
