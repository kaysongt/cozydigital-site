export default function PromptBossPromo() {
  return (
    <section
      className="prompt-boss-promo border-y px-6 py-16"
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
          <p className="promo-eyebrow text-xs font-semibold uppercase tracking-[.2em]">
            From Cozy Digital · PDF course
          </p>
          <h2
            id="prompt-boss-promo-title"
            className="mt-3 text-3xl font-semibold"
          >
            The playbook for your next video.
          </h2>
          <p className="promo-copy mt-4 max-w-2xl text-base leading-7">
            AI Video Prompt Boss includes 70 pages, 120 prompts, 14 cheat sheets
            and word banks, and three complete storyboards. Use it to plan an
            ad, a social clip, or a short film.
          </p>
          <a
            href="/courses/ai-video-prompt-boss/"
            className="studio-button mt-6"
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
