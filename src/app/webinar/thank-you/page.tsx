import type { Metadata } from "next";
import PaidCoursePreview from "@/app/courses/cozy-ai-video-course/PaidCoursePreview";
import Confirmation from "./Confirmation";
import styles from "./thank-you.module.css";

export const metadata: Metadata = {
  title: "Your workshop details | Cozy Digital",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://cozydigital.org/webinar/thank-you/" },
};

export default function ThankYouPage() {
  return <main className={styles.page}>
    <Confirmation />
    <details id="course-preview" className={styles.nextStep}>
      <summary>Want to keep learning? Preview AI Video Creator Lab <span aria-hidden="true">+</span></summary>
      <p className={styles.optional}>An optional paid course. Your free workshop place does not require a purchase.</p>
      <PaidCoursePreview />
    </details>
  </main>;
}
