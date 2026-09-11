type Props = { checkoutUrl: string; homeUrl?: string };

const chapters = [
  ["01", "The foundation", "Build a clear shot with the B.O.S.S. formula and an image-first workflow."],
  ["02", "Director cheat sheets", "Find the words for framing, camera moves, lenses, light, mood, and sound."],
  ["03", "The tool playbook", "Understand how to choose a video tool for the job and the references you have."],
  ["04", "The prompt vault", "Customize 120 prompts across 12 categories, from product ads to cinematic scenes."],
  ["05", "Complete storyboards", "Follow a 30-second product ad, a 15-second UGC-style ad, and a short film scene."],
  ["06", "Characters and dialogue", "Plan consistent characters, clear speakers, and dialogue that fits the shot."],
  ["07", "The fix-it guide", "Diagnose awkward motion, drifting details, and missed instructions before another generation."],
  ["08", "Your AI assistant director", "Use one master prompt and five helpers to turn your idea into a workable shot plan."],
  ["09", "The business side", "Explore ways to package client work, scope deliverables, and sell responsibly."],
  ["10", "Planning worksheets", "Put the shot planner, prompt builder, and pre-generation checklist to work."],
];
const questions = [
  ["Is this a video course?", "It is a 70-page downloadable PDF course and practical playbook. You get written lessons, prompts, storyboards, cheat sheets, and worksheets. Recorded video lessons are not included."],
  ["Do I need to be a filmmaker?", "No. Start with the foundation, then choose a prompt and replace the bracketed details. The cheat sheets explain the visual vocabulary as you go."],
  ["Are AI tools or generation credits included?", "No. Use the playbook with your chosen AI tools. Their subscriptions, generation credits, features, and commercial-use terms are separate."],
  ["Can I use the prompts for client work?", "Yes. The guide allows personal and business use, including creating videos for clients. You may not resell, share, or redistribute the PDF or its contents. Check the terms of your chosen AI tools too."],
  ["How do I receive it?", "After payment, you will return to the Cozy Digital hub to download the PDF once Stripe confirms your purchase. Save the PDF and bookmark your private access page."],
  ["Is there a subscription?", "No. The playbook is a one-time $30 USD purchase. Any applicable tax is shown at checkout. Results depend on your tools, references, and editing; income or video performance is not guaranteed."],
];

export default function PromptBossPage({ checkoutUrl, homeUrl = "/" }: Props) {
  const button = "inline-flex items-center justify-center rounded-full bg-[#d8b76a] px-7 py-4 text-base font-bold text-[#171309] transition hover:bg-[#ebcd89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8b76a]";
  return <main className="min-h-screen bg-[#0e0d0a] text-[#f2ecde]">
    <div className="mx-auto max-w-6xl px-6 py-7"><a href={homeUrl} className="text-xs uppercase tracking-[.2em] text-[#d8b76a]">Cozy Digital / The director&apos;s playbook</a></div>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1.15fr_1fr] md:pt-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d8b76a]">AI Video Prompt Boss · 2026 edition</p>
        <h1 className="mt-6 text-5xl leading-[1.04] tracking-tight md:text-7xl" style={{ fontFamily: "Georgia, serif" }}>Stop guessing.<br /><em className="text-[#d8b76a]">Start directing.</em></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#c8c2b6]">Your idea deserves more than another almost-right generation. Learn to turn it into a clear shot, a stronger prompt, and a sequence you can actually edit.</p>
        <p className="mt-4 text-sm leading-7 text-[#c8c2b6]">A 70-page PDF course and playbook for creators, marketers, and small business owners making AI video.</p>
        <div className="mt-8 flex flex-wrap items-center gap-5"><a className={button} href={checkoutUrl}>Get the playbook · $30 <span aria-hidden="true" className="ml-3">↗</span></a><a href="#inside" className="text-sm underline underline-offset-4">See what&apos;s inside</a></div>
        <p className="mt-4 text-xs leading-6 text-[#aaa395]">One-time payment · Downloadable PDF · No subscription<br />AI tools and generation credits sold separately.</p>
      </div>
      <div className="mx-auto w-full max-w-sm rotate-[2deg] rounded-sm border border-[#d8b76a]/30 shadow-[0_30px_80px_rgba(0,0,0,.5)]"><img src="/courses/ai-video-prompt-boss-cover.png" width="773" height="1000" alt="AI Video Prompt Boss by Cozy Digital, a black and gold director's playbook" className="block h-auto w-full" fetchPriority="high" /></div>
    </section>
    <section className="border-y border-[#d8b76a]/20 bg-[#18160f]" aria-label="What you get"><dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">{[["120", "customizable prompts"], ["14", "cheat sheets & word banks"], ["3", "complete storyboards"], ["1", "AI Director master prompt"]].map(([value, label]) => <div key={label}><dt className="text-xs text-[#c8c2b6]">{label}</dt><dd className="mt-2 text-4xl text-[#d8b76a]" style={{ fontFamily: "Georgia, serif" }}>{value}</dd></div>)}</dl></section>
    <section className="mx-auto max-w-6xl px-6 py-20" id="inside">
      <p className="text-xs uppercase tracking-[.2em] text-[#d8b76a]">From first idea to final cut</p><h2 className="mt-4 max-w-2xl text-4xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>A repeatable process.<br />A reference you keep open.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2">{chapters.map(([number, title, copy]) => <article key={number} className="rounded-2xl border border-[#d8b76a]/15 bg-[#16140f] p-6"><span className="text-xs tracking-widest text-[#d8b76a]">{number}</span><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#c8c2b6]">{copy}</p></article>)}</div>
    </section>
    <section className="border-y border-[#d8b76a]/20 bg-[#18160f] px-6 py-16"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-[.2em] text-[#d8b76a]">The B.O.S.S. formula</p><h2 className="mt-4 text-3xl" style={{ fontFamily: "Georgia, serif" }}>Give every shot a job.</h2><div className="mt-8 grid gap-7 sm:grid-cols-2 md:grid-cols-4">{[["B", "Base", "Subject, setting, and framing."], ["O", "Orchestrate", "Action and one clear camera move."], ["S", "Style", "Light, lens, color, and mood."], ["S", "Sound & Seal", "Audio and the details that stay consistent."]].map(([letter, title, copy]) => <div key={title}><span className="text-4xl text-[#d8b76a]">{letter}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#c8c2b6]">{copy}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-6 py-20"><h2 className="text-3xl" style={{ fontFamily: "Georgia, serif" }}>Built for the videos you want to make.</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{[["Sell a product", "Plan product reveals, ecommerce clips, food shots, and local-business promos."], ["Build your content library", "Create UGC-style concepts, faceless B-roll, hooks, loops, and transitions."], ["Tell a story", "Direct cinematic scenes with more intentional framing, character continuity, and dialogue."]].map(([title, copy]) => <div key={title}><h3 className="text-lg font-semibold text-[#d8b76a]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#c8c2b6]">{copy}</p></div>)}</div></section>
    <section className="mx-auto max-w-3xl px-6 pb-20"><h2 className="mb-7 text-3xl" style={{ fontFamily: "Georgia, serif" }}>Before you take the director&apos;s chair.</h2>{questions.map(([question, answer]) => <details key={question} className="border-b border-[#d8b76a]/20 py-5"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-3 text-sm leading-7 text-[#c8c2b6]">{answer}</p></details>)}</section>
    <section className="border-t border-[#d8b76a]/20 bg-[#18160f] px-6 py-20 text-center"><p className="text-xs uppercase tracking-[.2em] text-[#d8b76a]">Your next shot starts here</p><h2 className="mt-4 text-4xl" style={{ fontFamily: "Georgia, serif" }}>Make the idea easier to see.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-[#c8c2b6]">Get the lessons, prompt vault, storyboards, and worksheets in one practical playbook.</p><a className={`${button} mt-8`} href={checkoutUrl}>Get AI Video Prompt Boss · $30</a><p className="mt-4 text-xs text-[#aaa395]">Secure Stripe checkout. Applicable tax shown before payment.</p></section>
  </main>;
}
