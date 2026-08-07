import Image from "next/image";

// Real content Cozy Digital has produced and posted from the @cozydig1tal
// account. These are genuine screenshots, with no fabricated engagement counts and
// no fake platform UI. They're shown as examples of the content work, not as
// client performance metrics.
const RAW_COUNT = 10;
const posts = Array.from(
  { length: RAW_COUNT },
  (_, i) => `/images/social-proof/post-${String(i + 1).padStart(2, "0")}.png`
);

function PostCard({ src }: { src: string }) {
  return (
    <div className="h-[330px] w-[186px] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
      <Image
        src={src}
        alt="Example of branded content produced by Cozy Digital"
        width={248}
        height={440}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function SocialProofPosts() {
  return (
    <div className="social-row relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
      <div className="social-track-fwd flex w-max gap-4 px-4">
        {posts.map((src, i) => (
          <PostCard key={`a-${i}`} src={src} />
        ))}
        {posts.map((src, i) => (
          <PostCard key={`b-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
}
