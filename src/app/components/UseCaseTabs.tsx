import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { label: "Say hi to new followers" },
  { label: "Send welcome messages" },
  { label: "Automate FAQs" },
  { label: "Auto-DM & capture leads" },
  { label: "Run giveaways" },
];

const descriptions: Record<string, string> = {
  "Say hi to new followers": "Automatically DM new followers — say hi, share a freebie, or make an offer. Turn followers into fans, and fans into customers.",
  "Send welcome messages": "Greet every new contact with a personalized welcome flow. Set the tone, share what you offer, and start the conversation right.",
  "Automate FAQs": "Let your AI handle the top 20 questions your business gets every day. Instant answers, zero effort, happy customers.",
  "Auto-DM & capture leads": "Auto-DM people who comment, capture emails and phone numbers straight from the conversation. Build your list on autopilot.",
  "Run giveaways": "Launch engagement giveaways that drive comments, shares, and new followers. Automatically pick winners and notify them via DM.",
};

export function UseCaseTabs() {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <section className="bg-white py-[80px] md:py-[120px] px-5 md:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#37b24d] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            TEMPLATES
          </p>
          <h2 className="text-[#1a1a2e] text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif" }}>
            From simple messages to sales funnels
          </h2>
          <p className="text-[#4b5563] mt-2 max-w-[560px] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Launch fast with Quick Automations or build custom flows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActive(tab.label)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === tab.label
                  ? "bg-[#37b24d] text-white shadow-md"
                  : "bg-gray-100 text-[#4b5563] hover:bg-gray-200"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="bg-[#f9fafb] border border-gray-200 rounded-3xl p-8 md:p-12 text-center max-w-[680px] mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#37b24d]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#37b24d" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-[#1a1a2e] text-xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {active}
            </h3>
            <p className="text-[#4b5563] leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              {descriptions[active]}
            </p>
            <a
              href="/signIn"
              className="inline-flex items-center gap-2 bg-[#37b24d] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#2b8a3e] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Try It Free
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
