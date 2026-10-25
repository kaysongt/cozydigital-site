import type { Metadata } from "next";
import Link from "next/link";
import { cozyVideoCourse as course, getCozyVideoCheckout } from "@/data/cozy-ai-video-course";
import styles from "./course.module.css";
import CoursePreview from "./preview";
import WebinarLanding from "./WebinarLanding";

export const metadata: Metadata = {
  title: "AI Video Creator Lab | Free Live Webinar October 28 | Cozy Digital",
  description: "Make AI videos that stop the scroll. Watch the 40-second intro and join Quincy and Kayson live on Wednesday, October 28 at 8 p.m. Central. Free registration.",
  openGraph: {
    title: "AI Video Creator Lab | Free Live Webinar",
    description: "Make AI videos that stop the scroll. Join Quincy and Kayson on Wednesday, October 28 at 8 p.m. Central.",
    url: "https://cozydigital.org/courses/cozy-ai-video-course/",
    type: "website",
    images: [{ url: "/courses/cozy-ai-video-course/intro-film-preview.jpg", width: 1280, height: 720, alt: "Cozy Digital AI video course preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Creator Lab | Free Live Webinar",
    description: "Wednesday, October 28 at 8 p.m. Central. Learn to plan, direct, and review your AI videos with Quincy and Kayson.",
    images: ["/courses/cozy-ai-video-course/intro-film-preview.jpg"],
  },
  alternates: { canonical: "https://cozydigital.org/courses/cozy-ai-video-course/" },
  robots: { index: false, follow: true }, // Remove only after launch readiness review.
};

export default function CozyVideoCoursePage() {
  const checkout = getCozyVideoCheckout();
  return (
    <main className={styles.page}>
      <WebinarLanding />
      <div className={`${styles.wrap} ${styles.courseNav}`}><Link href="/courses/">Cozy Digital / Optional paid course</Link><a href="#curriculum">The curriculum <span aria-hidden="true">↓</span></a></div>
      <section id="paid-course" className={`${styles.wrap} ${styles.hero}`} style={{ scrollMarginTop: 96 }}>
        <div>
          <p className={styles.eyebrow}>Your next step after the free webinar</p>
          <h2>{course.title}</h2>
          <p className={styles.lead}>Build your AI video skills with six narrated lessons, real production examples, and templates for your next project.</p>
          <div className={styles.heroLinks}><a className={styles.button} href="#course-intro">Watch the intro <span aria-hidden="true">▶</span></a><a className={styles.curriculumLink} href="#curriculum">Explore the course <span aria-hidden="true">↓</span></a></div>
          <p className={styles.heroNote}>Go at your pace. Put each lesson to work on your own idea.</p>
        </div>
        <aside className={styles.offer} aria-labelledby="offer-title">
          <p id="offer-title" className={styles.offerTitle}>{course.title}</p>
          <p className={styles.price}>${course.launchPrice}<span>USD / one time · {course.accessMonths} months of access</span></p>
          <p className={styles.saving}>50% off the planned ${course.plannedRegularPrice} regular price</p>
          <p className={styles.offerCopy}>Learn how to plan a scene, keep shots consistent, and review your video before you publish.</p>
          <ul className={styles.included}><li>{course.lessonCount} narrated case-study lessons · {course.lessonRuntime}</li><li>{course.workbookPages}-page PDF workbook with six exercises</li><li>Eight planning templates included in the workbook</li></ul>
          <p className={styles.note} id="purchase-email-notice">Use the same Google email at checkout and when signing in to the Hub. You may be asked to sign in with Google again to verify your email.</p>
          {checkout ? <a aria-describedby="purchase-email-notice" className={styles.button} href={checkout}>Get the course · ${course.launchPrice}</a> : <><button className={styles.disabled} disabled>Enrollment opens soon</button><p className={styles.note}>Course preview only. Checkout is not open yet.</p></>}
        </aside>
      </section>

      <div className={`${styles.wrap} ${styles.overview}`} aria-label="Course format"><p><strong>Watch</strong><span>Understand the decisions</span></p><p><strong>Plan</strong><span>Make the brief your own</span></p><p><strong>Review</strong><span>Know what to keep and fix</span></p></div>
      <section className={`${styles.wrap} ${styles.previewSection}`} aria-labelledby="preview-title"><div><p className={styles.eyebrow}>Try the approach</p><h2 id="preview-title">One shot.<br />Three better questions.</h2><p className={styles.sectionCopy}>A small planning exercise from the course. Choose a step to see how a loose idea becomes a useful shot brief.</p></div><CoursePreview /></section>
      <section className={`${styles.wrap} ${styles.intro}`} aria-labelledby="approach-title">
        <h2 id="approach-title">See the choices.<br />Then make your own.</h2>
        <div><p>Before generating a clip, decide what the scene needs to communicate. Then plan the shots, references, and details you will check.</p><p>These are narrated production case studies. They explain the work and its decisions; they are not live screen recordings of the tools.</p></div>
      </section>

      <section className={`${styles.wrap} ${styles.curriculum}`} id="curriculum" aria-labelledby="curriculum-title">
        <h2 id="curriculum-title">Inside the learning path</h2>
        <p className={styles.sectionCopy}>Preview the six case-study lessons and a practice exercise for each. {checkout ? "Purchased lessons are accessed through the Hub." : "Final lesson access opens with enrollment."}</p>
        <p className={styles.sectionCopy}><strong>Orientation: {course.orientation.title}.</strong> {course.orientation.description}</p>
        <div className={styles.lessons}>
          {course.curriculum.map((lesson, index) => <details key={lesson.title} className={styles.lesson} open={index === 0}>
            <summary><span className={styles.lessonNumber}>{String(index + 1).padStart(2, "0")}</span><span>{lesson.title}</span><span className={styles.plus} aria-hidden="true">+</span></summary>
            <div className={styles.lessonBody}><p>{lesson.description}</p><h3>Try the planning step</h3><p>{lesson.practice}</p></div>
          </details>)}
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.exercise}`} aria-labelledby="exercise-title">
        <div><p className={styles.eyebrow}>A preview exercise</p><h2 id="exercise-title">Give one shot<br />a clear purpose.</h2><p>Start with a scene you want to create. Answer these questions before you spend a generation credit.</p></div>
        <ol><li><strong>What changes?</strong><span>Describe the one action or story beat the viewer should notice.</span></li><li><strong>What stays the same?</strong><span>Name the character, clothing, object, and setting details you need to preserve.</span></li><li><strong>What will you check?</strong><span>Choose the signs of a usable shot, and note what would make you revise it.</span></li></ol>
      </section>

      <section className={`${styles.wrap} ${styles.workbook}`} aria-labelledby="workbook-title">
        <h2 id="workbook-title">A workbook for your next project</h2>
        <p className={styles.sectionCopy}>The {course.workbookPages}-page PDF contains six exercises and eight reusable templates. The templates are pages within the workbook, ready to use for your own production decisions.</p>
        <div className={styles.workbookColumns}>
          <div><h3>Plan and track</h3><ul><li>One-page production brief</li><li>Reference and character record</li><li>Shot card</li><li>Still-approval checklist</li></ul></div>
          <div><h3>Review and refine</h3><ul><li>Prompt and iteration record</li><li>Continuity ledger</li><li>Edit and sound check</li><li>Final export and delivery check</li></ul></div>
        </div>
        <p className={styles.sectionCopy}><strong>Your final project:</strong> assemble a brief, shot plan, and review record. The planning exercises can be completed without buying credits or generating a video.</p>
      </section>

      <section className={`${styles.wrap} ${styles.faq}`} aria-labelledby="questions-title">
        <h2 id="questions-title">Before you enroll</h2>
        <details><summary>Who is this for?</summary><p>Creators and small business owners who want to understand the planning and review decisions behind an AI video project.</p></details>
        <details><summary>What is the launch price?</summary><p>${course.launchPrice} USD as a one-time purchase. That is 50% off the planned ${course.plannedRegularPrice} regular price. The regular price is a planned future price, not a claim about a previous selling price. Any applicable taxes will be shown at checkout. {checkout ? "Continue to the Hub to review the offer before checkout." : "Checkout is currently closed."}</p></details>
        <details><summary>How will I access my purchase?</summary><p>Use the same Google email at checkout and when signing in to the Hub. You may be asked to sign in with Google again to verify your email. {checkout ? "After confirmed payment, open the Hub course access page to watch your lessons and download the workbook." : "Access instructions will be confirmed before checkout opens."}</p></details>
        <details><summary>How long is access, and what is the refund policy?</summary><p>Your purchase includes {course.accessMonths} months of access from confirmed payment. Refund requests are reviewed case by case, rather than under a fixed refund guarantee. Applicable consumer rights are unaffected. <a href="mailto:quincy@cozydigital.org?subject=Course%20refund%20request">Email Cozy Digital to request a review</a>. {checkout ? "Review these terms on the Hub before continuing to checkout." : "These terms will also appear before checkout when enrollment opens."}</p></details>
        <details><summary>Are AI tools or generation credits included?</summary><p>Tool subscriptions, generation credits, and any Hub subscription are separate from this course. Check each provider&apos;s costs and usage terms before creating.</p></details>
        <details><summary>Is this AI Video Prompt Boss?</summary><p>No. This is a separate video course. <Link href="/courses/ai-video-prompt-boss/">AI Video Prompt Boss</Link> is the written PDF playbook. <Link href="/courses/">The AI Advantage Blueprint</Link> is the separate business AI course.</p></details>
        <details><summary>Will I get the same results as the examples?</summary><p>Results vary with your tools, references, prompts, and editing. No specific creative, business, or income result is guaranteed.</p></details>
      </section>
      <footer className={`${styles.wrap} ${styles.end}`}><p>{course.title}</p><Link href="/courses/">Explore all Cozy Digital courses <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}
