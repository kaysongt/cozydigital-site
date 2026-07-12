import Image from "next/image";
import Link from "next/link";

/**
 * Founder / team trust section.
 *
 * OWNER-SUPPLIED CONTENT: Add the real people behind Cozy Digital to the
 * `founders` array below. Do NOT invent names, roles, credentials, or photos.
 * Each entry renders a headshot, name, role, and a one-line description.
 *
 * Drop headshots in /public/brand/team/ (square, ~400x400, e.g. founder-name.jpg)
 * and fill in the fields. Until at least one real founder is added, the section
 * renders an honest studio blurb instead of placeholder people.
 *
 * type Founder = { name; role; photo; bio; }
 */
type Founder = {
  name: string;
  role: string;
  photo: string; // e.g. "/brand/team/first-last.jpg"
  bio: string;
};

const founders: Founder[] = [
  // TODO (owner): add real founders, e.g.
  // { name: "Full Name", role: "Founder & Lead Designer", photo: "/brand/team/full-name.jpg",
  //   bio: "Handles website design, messaging, and the overall client build." },
];

export default function FounderTrust() {
  return (
    <section className="px-6 py-20" aria-labelledby="team-heading">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">
            The Team
          </p>
          <h2 id="team-heading" className="text-3xl font-black text-white md:text-4xl">
            Meet the people behind the work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Cozy Digital is a small, hands-on studio. You work directly with the
            people building your website, content, and booking systems, not a
            rotating account team.
          </p>
        </div>

        {founders.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center"
              >
                <Image
                  src={person.photo}
                  alt={`${person.name}, ${person.role} at Cozy Digital`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-24 w-24 rounded-full border border-cyan-300/20 object-cover"
                />
                <h3 className="mt-4 text-base font-black text-white">{person.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{person.bio}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
            <p className="text-sm leading-relaxed text-zinc-300">
              Cozy Digital was built to fix a common gap: service businesses
              spending on ads and content while their website, booking path, and
              search presence quietly lost them customers. We handle the whole
              digital presence so those pieces finally work together.
            </p>
            <Link
              href="/about/"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100"
            >
              More about Cozy Digital
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
