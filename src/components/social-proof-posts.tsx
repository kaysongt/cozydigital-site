import Image from "next/image";

type PostItem =
  | { type: "raw"; src: string }
  | { type: "ig"; src: string; caption: string };

const igCaptions = [
  "A healthy smile changes everything. Book your appointment today! 😁",
  "Your smile is worth it. Cosmetic dentistry that builds confidence.",
  "Don't wait — your dream smile starts with one visit. 🦷",
  "Real results. Real patients. Real confidence. Book now!",
  "We make dental care easy, comfortable, and worth it. ✨",
  "Brighter smiles start here. Same-day appointments available.",
  "Your smile is our specialty. See what we can do for you.",
  "Confidence starts with your smile. Let us help. Book today!",
  "From cleanings to implants — we handle it all. 🌟",
  "5-star care, every visit. See why patients love us.",
  "Ready for your best smile? We're ready for you. 😊",
  "Dental care that fits your life. Easy online booking.",
  "Your smile deserves the best. We deliver — every time.",
  "Book your free consultation today. Your smile won't wait. 🦷✨",
];

// Build interleaved list: 2 raw cozy posts, then 1 dr-alicia IG card, repeat
const posts: PostItem[] = [];
const rawCount = 10;
const igCount = 14;
let ri = 0;
let ai = 0;
let slot = 0;
while (ri < rawCount || ai < igCount) {
  if (slot % 3 === 2 && ai < igCount) {
    posts.push({
      type: "ig",
      src: `/images/social-proof/dr-alicia-${String(ai + 1).padStart(2, "0")}.png`,
      caption: igCaptions[ai],
    });
    ai++;
  } else if (ri < rawCount) {
    posts.push({
      type: "raw",
      src: `/images/social-proof/post-${String(ri + 1).padStart(2, "0")}.png`,
    });
    ri++;
  } else {
    posts.push({
      type: "ig",
      src: `/images/social-proof/dr-alicia-${String(ai + 1).padStart(2, "0")}.png`,
      caption: igCaptions[ai],
    });
    ai++;
  }
  slot++;
}

function IgPostCard({ src, caption }: { src: string; caption: string }) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg"
      style={{ width: 186, height: 330, fontSize: 10.5 }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between bg-black px-2 py-[2px] text-white" style={{ fontSize: "8px" }}>
        <span className="font-semibold">9:41</span>
        <span className="opacity-60">▲ ◆ 5G</span>
      </div>

      {/* IG header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/90 px-2 py-[3px]">
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 shrink-0 rounded-full p-[1.5px]"
            style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
          >
            <div className="h-full w-full overflow-hidden rounded-full border border-black">
              <Image src="/images/social-proof/dr-alicia-01.png" alt="" width={21} height={21} className="h-full w-full object-cover" />
            </div>
          </div>
          <span className="font-bold text-white" style={{ fontSize: "9px" }}>dralicia.dental</span>
        </div>
        <span className="text-white opacity-40" style={{ fontSize: 12 }}>•••</span>
      </div>

      {/* Photo */}
      <div className="relative bg-zinc-900" style={{ height: 186 }}>
        <Image src={src} alt="Dr. Alicia dental post" fill className="object-cover" />
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between bg-black px-2 py-[3px]">
        <div className="flex items-center gap-2 text-white" style={{ fontSize: "10.5px" }}>
          <span>♥</span><span>💬</span><span>↗</span>
        </div>
        <span style={{ fontSize: "10.5px" }}>🔖</span>
      </div>

      {/* Likes */}
      <div className="bg-black px-2" style={{ fontSize: "8px" }}>
        <span className="font-bold text-white">847 likes</span>
      </div>

      {/* Caption */}
      <div className="bg-black px-2 py-[2px]" style={{ fontSize: "8px", lineHeight: 1.35 }}>
        <span className="font-bold text-white">dralicia.dental </span>
        <span className="text-zinc-400">{caption.slice(0, 52)}…</span>
      </div>
    </div>
  );
}

function RawPostCard({ src }: { src: string }) {
  return (
    <div className="h-[330px] w-[186px] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
      <Image src={src} alt="Cozy Digital post" width={248} height={440} className="h-full w-full object-cover" />
    </div>
  );
}

function PostCard({ post, idx }: { post: PostItem; idx: number }) {
  if (post.type === "ig") return <IgPostCard key={idx} src={post.src} caption={post.caption} />;
  return <RawPostCard key={idx} src={post.src} />;
}

export default function SocialProofPosts() {
  return (
    <div className="social-row relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
      <div className="social-track-fwd flex w-max gap-4 px-4">
        {posts.map((p, i) => <PostCard key={`a-${i}`} post={p} idx={i} />)}
        {posts.map((p, i) => <PostCard key={`b-${i}`} post={p} idx={i} />)}
      </div>
    </div>
  );
}
