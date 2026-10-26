import type { Metadata } from "next";
import styles from "./course.module.css";
import WebinarLanding from "./WebinarLanding";

export const metadata: Metadata = {
  title: "From Idea to AI Video | Free Live Workshop October 28 | Cozy Digital",
  description: "Turn one idea into an AI video. Watch the 40-second intro and join Quincy and Kayson live on Wednesday, October 28 at 8 p.m. Central. Free registration.",
  openGraph: {
    title: "From Idea to AI Video | Free Live Workshop",
    description: "Turn one idea into an AI video. Join Quincy and Kayson on Wednesday, October 28 at 8 p.m. Central.",
    url: "https://cozydigital.org/courses/cozy-ai-video-course/",
    type: "website",
    images: [{ url: "/courses/cozy-ai-video-course/intro-film-preview.jpg", width: 1280, height: 720, alt: "Cozy Digital AI video workshop preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Idea to AI Video | Free Live Workshop",
    description: "Wednesday, October 28 at 8 p.m. Central. Learn to plan, direct, and review your AI videos with Quincy and Kayson.",
    images: ["/courses/cozy-ai-video-course/intro-film-preview.jpg"],
  },
  alternates: { canonical: "https://cozydigital.org/courses/cozy-ai-video-course/" },
  robots: { index: false, follow: true }, // Remove only after launch readiness review.
};

export default function WebinarPage() {
  return <main className={styles.page}><WebinarLanding /></main>;
}
