import Link from "next/link";
import type { Metadata } from "next";
import { cozyVideoCourse as course } from "@/data/cozy-ai-video-course";

export const metadata: Metadata = {
  title: "AI Video Creator Lab | Cozy Digital",
  description: "Explore how Cozy Digital plans, directs, and reviews AI video through six narrated case studies.",
  alternates: { canonical: "https://cozydigital.org/courses/cozy-ai-video-course/" },
  robots: { index: false, follow: true },
};

export default function CozyVideoCoursePage() {
  return (
    <main className="bg-[#101a21] px-6 py-20 text-[#eef4f5]">
      <div className="mx-auto max-w-5xl">
        <Link href="/courses/" className="text-sm font-semibold text-cyan-200 underline">← All courses</Link>
        <p className="mt-10 text-xs font-semibold tracking-widest text-cyan-200">NARRATED VIDEO CASE STUDIES</p>
        <h1 className="mt-3 text-4xl font-medium md:text-6xl">{course.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#a9b8bf]">Six case studies on how to plan, direct, and review an AI video, with a workbook to use on your own projects.</p>
        <ul aria-label="Course curriculum" className="mt-10 grid gap-4 sm:grid-cols-2">
          {course.curriculum.map((lesson) => (
            <li key={lesson.title} className="rounded-xl border border-cyan-200/20 p-5">
              <h2 className="text-lg font-semibold">{lesson.title}</h2>
              <p className="mt-2 text-[#a9b8bf]">{lesson.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
