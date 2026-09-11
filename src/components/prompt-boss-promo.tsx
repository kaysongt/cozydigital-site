export default function PromptBossPromo() {
  return (
    <section
      className="border-y border-[#c5fa6a]/20 bg-[#141619] px-6 py-16"
      aria-labelledby="prompt-boss-promo-title"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-[140px_1fr]">
        <img
          src="/courses/ai-video-prompt-boss-cover.png"
          width="140"
          height="181"
          loading="lazy"
          alt="AI Video Prompt Boss cover"
          className="mx-auto w-28 rotate-[-3deg] rounded-sm shadow-xl sm:w-36"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#c5fa6a]">
            From Cozy Digital · PDF course
          </p>
          <h2
            id="prompt-boss-promo-title"
            className="mt-3 text-3xl font-semibold text-[#edf0ed]"
          >
            The playbook for your next video.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#a9b0aa]">
            AI Video Prompt Boss includes 70 pages, 120 prompts, 14 cheat sheets
            and word banks, and three complete storyboards. Use it to plan an
            ad, a social clip, or a short film.
          </p>
          <a
            href="/courses/ai-video-prompt-boss/"
            className="mt-6 inline-flex rounded-lg bg-[#c5fa6a] px-6 py-3 text-sm font-bold text-[#172012] hover:bg-[#ddffa2]"
          >
            Explore the playbook · $30{" "}
            <span className="ml-3" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
