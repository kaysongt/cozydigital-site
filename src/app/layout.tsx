import "./globals.css";
import type { Metadata } from "next";
import CozyPublicHeader from "@/components/cozy-public-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cozydigital.org"),
  title: {
    default: "Cozy Digital | Websites, Content & Lead Systems",
    template: "%s",
  },
  description: "Cozy Digital helps service brands improve websites, content, booking paths, and first impressions.",
  openGraph: {
    title: "Cozy Digital | Websites, Content & Lead Systems",
    description: "Sharper websites, cleaner content systems, and easier booking paths for service brands.",
    url: "https://www.cozydigital.org",
    siteName: "Cozy Digital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CozyPublicHeader />
        {children}
      </body>
    </html>
  );
}
