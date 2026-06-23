import { motion } from "motion/react";

const before = {
  label: "Before AutomateNG",
  title: "Chaos",
  items: [
    "Copy-pasting the same reply 50 times a day.",
    "Losing hot leads in endless DMs.",
    "Missed sales while you sleep.",
    "Every notification buries you deeper.",
  ],
};

const after = {
  label: "After AutomateNG",
  title: "Calm",
  items: [
    "Smart replies handle FAQs instantly.",
    "Organized, tagged leads queued up.",
    "Sales going off 24/7 on autopilot.",
    "Every interaction converts automatically.",
  ],
};

export function BeforeAfter() {
  return (
    <section className="bg-[#f9fafb] py-[80px] md:py-[120px] px-5 md:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#37b24d] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            BEFORE & AFTER
          </p>
          <h2 className="text-[#1a1a2e] text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Your inbox: a before & after
          </h2>
          <p className="text-[#4b5563] mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>More messages, less mess.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[before, after].map((side, si) => (
            <motion.div
              key={side.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.15, duration: 0.5 }}
              className={`rounded-3xl p-8 md:p-10 ${
                si === 0
                  ? "bg-white border border-gray-200"
                  : "bg-[#37b24d] text-white"
              }`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-widest ${
                  si === 0 ? "text-[#9ca3af]" : "text-white/70"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {side.label}
              </span>
              <h3
                className="text-3xl font-bold mt-2 mb-6"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
              >
                {side.title}
              </h3>
              <ul className="space-y-4">
                {side.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: si === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      si === 0 ? "bg-red-50 text-red-500" : "bg-white/20 text-white"
                    }`}>
                      {si === 0 ? "✕" : "✓"}
                    </span>
                    <span className={si === 0 ? "text-[#4b5563]" : "text-white/90"} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="/signIn"
            className="inline-flex items-center gap-2 bg-[#37b24d] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#2b8a3e] transition-colors shadow-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get Started Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
