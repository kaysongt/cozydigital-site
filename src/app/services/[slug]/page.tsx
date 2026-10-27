import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeywordPageView, { keywordPageMetadata } from "@/components/keyword-page";
import { servicePages } from "@/data/keyword-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  return page ? keywordPageMetadata(page, `/services/${page.slug}/`) : {};
}

export default async function ServiceKeywordPage({ params }: Props) {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <KeywordPageView page={page} path={`/services/${page.slug}/`} parent={{ name: "Services", href: "/services/" }} />;
}
