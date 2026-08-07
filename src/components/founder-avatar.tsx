import Image from "next/image";
import type { Founder } from "@/data/founders";

const ring: Record<Founder["accent"], string> = {
  cyan: "border-cyan-300/30 shadow-[0_0_40px_-12px_rgba(34,211,238,0.55)]",
  fuchsia: "border-fuchsia-300/30 shadow-[0_0_40px_-12px_rgba(217,70,239,0.55)]",
};

const monogram: Record<Founder["accent"], string> = {
  cyan: "bg-gradient-to-br from-cyan-500/25 via-blue-600/15 to-transparent text-cyan-200",
  fuchsia: "bg-gradient-to-br from-fuchsia-500/25 via-blue-600/15 to-transparent text-fuchsia-200",
};

/**
 * Renders a real headshot when `photo` is set on the founder, and a branded
 * monogram otherwise. The monogram is a deliberate design state — we never
 * substitute a stock photo of a different person.
 */
export default function FounderAvatar({
  person,
  size = 96,
  className = "",
}: {
  person: Founder;
  size?: number;
  className?: string;
}) {
  const base = `shrink-0 rounded-2xl border object-cover ${ring[person.accent]} ${className}`;

  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={`${person.name}, ${person.role} at Cozy Digital`}
        width={size}
        height={size}
        loading="lazy"
        className={base}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center font-black tracking-tight ${monogram[person.accent]} ${base}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {person.initials}
    </div>
  );
}
