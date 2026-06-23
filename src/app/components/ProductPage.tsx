import { motion } from "motion/react";

const productPages = [
  {
    id: "instagram",
    title: "Instagram Automation",
    subtitle: "Turn comments into conversations that sell.",
    tagline: "Your Instagram just got smarter.",
    description:
      "Send links, answer questions, collect leads, and close sales — automatically. Stop treating engagement like a full-time job.",
    features: [
      {
        title: "Turn comments into sales",
        desc: '"How much is this?" Instant reply. Boom — wallets open, money lands.',
      },
      {
        title: "Catch every lead",
        desc: "Grab emails and numbers straight from DMs. Followers are cute. Leads pay rent.",
      },
      {
        title: "Boost engagement & reach",
        desc: "Spark more conversations and let Instagram's algorithm bless your reach.",
      },
    ],
    channelColor: "#E4405F",
    channelLabel: "Instagram DM",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    subtitle: "Your 24/7 customer engagement team.",
    tagline: "Turn constant messages into qualified leads.",
    description:
      "Automate FAQs, receipts, and product info — delivered instantly. Identify high-intent leads while the routine handles itself.",
    features: [
      {
        title: "Qualified leads, automatically",
        desc: "Lead scoring and routing so you only talk to sales-ready conversations.",
      },
      {
        title: "24/7 instant replies",
        desc: "FAQ responses, order updates, and follow-ups — all automated, all the time.",
      },
      {
        title: "Re-engagement that drives revenue",
        desc: "Guide prospects through frictionless journeys and bring them back for more.",
      },
    ],
    channelColor: "#37b24d",
    channelLabel: "WhatsApp API",
  },
  {
    id: "messenger",
    title: "Messenger Automation",
    subtitle: "Meet customers where they already chat.",
    tagline: "Facebook Messenger, automated.",
    description:
      "Engage customers with interactive Messenger flows — from welcome messages to order confirmations and support.",
    features: [
      {
        title: "Welcome & nurture flows",
        desc: "Automatically greet new conversations and guide them through your funnel.",
      },
      {
        title: "Order & support updates",
        desc: "Send receipts, tracking info, and support responses directly in Messenger.",
      },
      {
        title: "Retarget & re-engage",
        desc: "Follow up with past customers using personalized Messenger broadcasts.",
      },
    ],
    channelColor: "#0084FF",
    channelLabel: "Messenger",
  },
  {
    id: "tiktok",
    title: "TikTok Automation",
    subtitle: "Turn viral moments into meaningful conversations.",
    tagline: "Grow your TikTok audience on autopilot.",
    description:
      "Automatically engage with your TikTok audience — from comment replies to DM follow-ups. Turn views into value.",
    features: [
      {
        title: "Auto-reply to comments",
        desc: "Engage with every comment instantly. More conversation, more algorithm love.",
      },
      {
        title: "DM new followers",
        desc: "Welcome new followers with an automated DM — share a freebie, make an offer.",
      },
      {
        title: "Cross-platform growth",
        desc: "Move TikTok followers into WhatsApp or email to build lasting relationships.",
      },
    ],
    channelColor: "#000000",
    channelLabel: "TikTok",
  },
  {
    id: "ai",
    title: "AI Engine",
    subtitle: "Smarter conversations, deeper insights.",
    tagline: "AI that sounds like you.",
    description:
      "Our AI understands your business, your tone, and your customers. Handle complex FAQs, qualify leads, and close sales — automatically.",
    features: [
      {
        title: "Natural conversations",
        desc: "AI that sounds human, knows your products, and never misses a detail.",
      },
      {
        title: "Smart lead qualification",
        desc: "Identify high-intent prospects and route them to your team at the right moment.",
      },
      {
        title: "Learning over time",
        desc: "The more conversations you have, the smarter your AI gets.",
      },
    ],
    channelColor: "#37b24d",
    channelLabel: "AI-Powered",
  },
];

export function ProductPage({ productId }: { productId: string }) {
  const page = productPages.find((p) => p.id === productId);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="text-[#1a1a2e] text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Page not found</h1>
          <p className="text-[#6b7280] mt-2">This product page doesn't exist yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[120px] pb-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${page.channelColor}15` }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill={page.channelColor} opacity="0.3" />
                  <path d="M8 12h8M12 8v8" stroke={page.channelColor} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: page.channelColor, fontFamily: "'Inter', sans-serif" }}
              >
                {page.channelLabel}
              </span>
            </div>
            <p className="text-[#37b24d] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              {page.subtitle}
            </p>
            <h1
              className="text-[#1a1a2e] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.04em] mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {page.tagline}
            </h1>
            <p className="text-[#4b5563] text-lg leading-relaxed mb-8 max-w-[520px]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {page.description}
            </p>
            <div className="flex gap-3">
              <a
                href="/signIn"
                className="inline-flex items-center gap-2 bg-[#37b24d] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#2b8a3e] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get Started Free
              </a>
              <a
                href="https://wa.me/2348121676394"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-200 text-[#4b5563] px-6 py-3 rounded-2xl font-semibold hover:border-[#37b24d] hover:text-[#37b24d] transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Talk to Us
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div
              className="aspect-square rounded-[32px] flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${page.channelColor}10, ${page.channelColor}05)` }}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, ${page.channelColor} 0%, transparent 60%)`,
                }}
              />
              <div className="text-center relative z-10">
                <div
                  className="w-24 h-24 rounded-[24px] flex items-center justify-center mx-auto mb-6"
                  style={{ background: page.channelColor, boxShadow: `0 20px 60px ${page.channelColor}40` }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="text-[#1a1a2e] text-lg font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {page.title}
                </p>
                <p className="text-[#9ca3af] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {page.channelLabel}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-[#37b24d] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              FEATURES
            </p>
            <h2 className="text-[#1a1a2e] text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Everything you need to grow
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {page.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#37b24d]/30 hover:shadow-sm transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${page.channelColor}15` }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: page.channelColor }} />
                </div>
                <h3 className="text-[#1a1a2e] font-semibold mb-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem" }}>
                  {f.title}
                </h3>
                <p className="text-[#4b5563] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-gray-200 rounded-3xl p-10 md:p-16 text-center">
          <p className="text-[#37b24d] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            GET STARTED
          </p>
          <h2 className="text-[#1a1a2e] text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Ready to automate your {page.id === "ai" ? "business" : page.id}?
          </h2>
          <p className="text-[#4b5563] max-w-[480px] mx-auto mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Join 50+ Nigerian businesses already using AutomateNG to save time, close more deals, and never miss a message.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="/auth?redirect=/onboarding"
              className="inline-flex items-center gap-2 bg-[#37b24d] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#2b8a3e] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Start Free Trial
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 border border-gray-200 text-[#4b5563] px-6 py-3 rounded-2xl font-semibold hover:border-[#37b24d] hover:text-[#37b24d] transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              See Plans
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
