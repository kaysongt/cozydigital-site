import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeywordPageView, { keywordPageMetadata } from "@/components/keyword-page";
import { industryPages } from "@/data/keyword-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return industryPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = industryPages.find((p) => p.slug === slug);
  return page ? keywordPageMetadata(page, `/websites-for/${page.slug}/`) : {};
}

// The industry pages have no index of their own, so their breadcrumb points
// back to Services.
export default async function IndustryKeywordPage({ params }: Props) {
  const { slug } = await params;
  const page = industryPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <KeywordPageView page={page} path={`/websites-for/${page.slug}/`} parent={{ name: "Services", href: "/services/" }} />;
}
