import type { Metadata } from "next";
import styles from "./course.module.css";
import WebinarLanding from "./WebinarLanding";

export const metadata: Metadata = {
  title: "Create AI Videos People Want to Watch | Free Workshop | Cozy Digital",
  description: "Tired of AI clips that don’t match your idea? Learn from the Cozy Digital creators behind films for Dr. Boyce Watkins. Free live workshop, November 4 at 8 p.m. Central.",
  openGraph: {
    title: "From Idea to AI Video | Free Live Workshop",
    description: "Become the AI creator people stop to watch. See real client films and join Quincy and Kayson live on November 4 at 8 p.m. Central.",
    url: "https://cozydigital.org/courses/cozy-ai-video-course/",
    type: "website",
    images: [{ url: "/courses/cozy-ai-video-course/intro-film-preview.jpg", width: 1280, height: 720, alt: "Cozy Digital AI video workshop preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Idea to AI Video | Free Live Workshop",
    description: "Wednesday, November 4 at 8 p.m. Central. Learn to plan, direct, and review your AI videos with Quincy and Kayson.",
    images: ["/courses/cozy-ai-video-course/intro-film-preview.jpg"],
  },
  alternates: { canonical: "https://cozydigital.org/courses/cozy-ai-video-course/" },
  robots: { index: false, follow: true }, // Remove only after launch readiness review.
};

export default function WebinarPage() {
  return <main className={styles.page}><WebinarLanding /></main>;
}
