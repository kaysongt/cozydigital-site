import Link from "next/link";
import { cozyVideoCourse as course } from "@/data/cozy-ai-video-course";

export default function CozyVideoCoursePromo() {
  return <section aria-labelledby="cozy-video-course-title" className="border-b border-cyan-200/20 bg-[#101a21] px-6 py-12 text-[#eef4f5]">
    <div className="mx-auto flex max-w-5xl flex-col justify-between gap-7 md:flex-row md:items-center">
      <div className="max-w-2xl"><p className="text-xs font-semibold tracking-widest text-[#67e8f9]">NARRATED VIDEO CASE STUDIES</p><h2 id="cozy-video-course-title" className="mt-3 text-3xl font-medium">{course.title}</h2><p className="mt-4 text-base leading-7 text-[#a9b8bf]">Explore the planning and review decisions behind fashion, dialogue, racing, transformation, and episodic video.</p><p className="mt-3 text-sm text-[#a9b8bf]">${course.launchPrice} USD one-time launch price · 50% off the planned ${course.plannedRegularPrice} regular price</p></div>
      <Link href={course.path} className="inline-flex shrink-0 self-start rounded-lg bg-[#67e8f9] px-6 py-4 text-sm font-bold text-[#09232b] hover:bg-[#b4f4fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">Preview the course ↗</Link>
    </div>
  </section>;
}
