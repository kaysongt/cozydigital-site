import type { Metadata } from "next";
import Link from "next/link";
import { cozyVideoCourse as course, getCozyVideoCheckout } from "@/data/cozy-ai-video-course";
import styles from "./course.module.css";
import CoursePreview from "./preview";

export const metadata: Metadata = {
  title: "Cozy AI Video Course | Cozy Digital",
  description: "Explore narrated AI video production case studies, from the first brief to shot continuity and review. Preview the course and $75 USD launch offer.",
  alternates: { canonical: "https://cozydigital.org/courses/cozy-ai-video-course/" },
  robots: { index: false, follow: true }, // Remove only after launch readiness review.
};

export default function CozyVideoCoursePage() {
  const checkout = getCozyVideoCheckout();
  return (
    <main className={styles.page}>
      <div className={`${styles.wrap} ${styles.courseNav}`}><Link href="/courses/">Cozy Digital / Learning</Link><a href="#curriculum">The curriculum <span aria-hidden="true">↓</span></a></div>
      <section className={`${styles.wrap} ${styles.hero}`}>
        <div>
          <p className={styles.eyebrow}>The Cozy Digital production course</p>
          <h1>A good film starts<br /><span>before you generate.</span></h1>
          <p className={styles.lead}>Explore the production decisions behind AI video through narrated case studies and practical planning exercises.</p>
          <a className={styles.button} href="#curriculum">Explore the course <span aria-hidden="true">↗</span></a>
          <p className={styles.heroNote}>Your idea. A clearer brief. A more considered film.</p>
        </div>
        <aside className={styles.offer} aria-labelledby="offer-title">
          <p id="offer-title" className={styles.offerTitle}>{course.title}</p>
          <p className={styles.price}>${course.launchPrice}<span>USD / one time · {course.accessMonths} months of access</span></p>
          <p className={styles.saving}>50% off the planned ${course.plannedRegularPrice} regular price</p>
          <p className={styles.offerCopy}>A focused look at the choices that shape a shot, a scene, and a connected story.</p>
          <ul className={styles.included}><li>Narrated production case studies</li><li>Six practical workbook exercises</li><li>Eight reusable planning templates</li></ul>
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
        <p className={styles.sectionCopy}>Open a lesson to preview the topic and a practice exercise. Final lesson access opens with enrollment.</p>
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
        <p className={styles.sectionCopy}>Six exercises connect the case studies to your own ideas. Eight reusable templates help you record the decisions.</p>
        <div className={styles.workbookColumns}>
          <div><h3>Plan and track</h3><ul><li>One-page production brief</li><li>Reference and character record</li><li>Shot card</li><li>Still-approval checklist</li></ul></div>
          <div><h3>Review and refine</h3><ul><li>Prompt and iteration record</li><li>Continuity ledger</li><li>Edit and sound check</li><li>Final export and delivery check</li></ul></div>
        </div>
        <p className={styles.sectionCopy}><strong>Your final project:</strong> assemble a brief, shot plan, and review record. The planning exercises can be completed without buying credits or generating a video.</p>
      </section>

      <section className={`${styles.wrap} ${styles.faq}`} aria-labelledby="questions-title">
        <h2 id="questions-title">Before you enroll</h2>
        <details><summary>Who is this for?</summary><p>Creators and small business owners who want to understand the planning and review decisions behind an AI video project.</p></details>
        <details><summary>What is the launch price?</summary><p>${course.launchPrice} USD as a one-time purchase. That is 50% off the planned ${course.plannedRegularPrice} regular price. The regular price is a planned future price, not a claim about a previous selling price. Any applicable taxes will be shown at checkout. Checkout is currently closed.</p></details>
        <details><summary>How will I access my purchase?</summary><p>When enrollment opens, use the same Google email at checkout and when signing in to the Hub. You may be asked to sign in with Google again to verify your email. Access instructions will be confirmed before checkout opens.</p></details>
        <details><summary>How long is access, and what is the refund policy?</summary><p>Your purchase includes {course.accessMonths} months of access from confirmed payment. Refund requests are reviewed case by case, rather than under a fixed refund guarantee. Applicable consumer rights are unaffected. <a href="mailto:quincy@cozydigital.org?subject=Course%20refund%20request">Email Cozy Digital to request a review</a>. These terms will also appear before checkout when enrollment opens.</p></details>
        <details><summary>Are AI tools or generation credits included?</summary><p>Tool subscriptions, generation credits, and any Hub subscription are separate from this course. Check each provider&apos;s costs and usage terms before creating.</p></details>
        <details><summary>Is this AI Video Prompt Boss?</summary><p>No. This is a separate video course. <Link href="/courses/ai-video-prompt-boss/">AI Video Prompt Boss</Link> is the written PDF playbook. <Link href="/courses/">The AI Advantage Blueprint</Link> is the separate business AI course.</p></details>
        <details><summary>Will I get the same results as the examples?</summary><p>Results vary with your tools, references, prompts, and editing. No specific creative, business, or income result is guaranteed.</p></details>
      </section>
      <footer className={`${styles.wrap} ${styles.end}`}><p>{course.title}</p><Link href="/courses/">Explore all Cozy Digital courses <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}
