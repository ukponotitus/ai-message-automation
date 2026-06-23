import { motion } from "motion/react";

const items = [
  { name: "Natasha Willis", handle: "@natashawillis", followers: "27.3k", quote: "We've used AutomateNG to generate over ₦45M in sales through WhatsApp alone. It's insane how much time we save.", color: "#37b24d" },
  { name: "Giovanni Begossi", handle: "@giovannibeg", followers: "2m", quote: "My Instagram account gained over 500k followers in less than 6 months using AutomateNG's auto-DM flows.", color: "#f59e0b" },
  { name: "Cassie Schoonover", handle: "@cassieschoon", followers: "504k", quote: "This is a 10 out of 10. The functionality, the creativity, the ability to create the flows — it changed my business.", color: "#37b24d" },
  { name: "Michelle Hansen", handle: "@michellehansen", followers: "214K", quote: "I've had over 3 million new views to my account thanks to automated engagement. Absolute game-changer.", color: "#f59e0b" },
];

export function SocialProof() {
  const doubled = [...items, ...items];

  return (
    <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#37b24d] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            SOCIAL PROOF
          </p>
          <h2 className="text-[#1a1a2e] text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif" }}>
            ❤️'d by 1M+ creators, marketers & brands
          </h2>
        </div>

        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            style={{ width: "max-content" }}
          >
            {doubled.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="w-[380px] shrink-0 bg-[#f9fafb] border border-gray-200 rounded-2xl p-6 hover:border-[#37b24d]/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: item.color }}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#1a1a2e] text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{item.name}</p>
                    <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.handle} · {item.followers} followers
                    </p>
                  </div>
                </div>
                <p className="text-[#4b5563] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  "{item.quote}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
