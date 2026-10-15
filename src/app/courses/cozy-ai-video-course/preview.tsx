"use client";
import { useState } from "react";
import styles from "./course.module.css";
const steps = [
  { label: "Purpose", title: "Give the action a reason.", prompt: "What should the viewer notice?", example: "A creator turns toward the window so the light reveals the jacket’s texture.", detail: "One clear action is easier to direct, judge, and connect to the next shot." },
  { label: "Continuity", title: "Name what stays consistent.", prompt: "What must carry into the next shot?", example: "The same creator, navy jacket, silver zip, and window light from camera left.", detail: "Record the details in your continuity ledger before creating another angle." },
  { label: "Review", title: "Set your approval criteria.", prompt: "What would make this take usable?", example: "Check the face, garment details, hand movement, and direction of the light.", detail: "Keep a take when it serves the scene. Write a specific correction when it does not." },
];
export default function CoursePreview() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return <div className={styles.preview}>
    <div className={styles.stepControls} role="group" aria-label="Choose a planning step">{steps.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="course-preview-panel" onClick={() => setActive(index)}><span aria-hidden="true">0{index + 1}</span>{item.label}</button>)}</div>
    <div className={styles.previewPanel} id="course-preview-panel" aria-live="polite" aria-atomic="true"><p className={styles.sheetLabel}>The shot brief / 0{active + 1}</p><h3>{step.title}</h3><p className={styles.previewPrompt}>{step.prompt}</p><blockquote>{step.example}</blockquote><p className={styles.previewDetail}>{step.detail}</p></div>
    <p className={styles.previewCaption}>Interactive planning example · no generation credits used</p>
  </div>;
}
