import { useRef } from "react";
import { motion, useInView } from "motion/react";

function IllustrationStep1() {
  return (
    <div className="relative flex-1 flex items-center justify-center w-full min-h-0">
      <div className="relative w-full max-w-[280px] flex flex-col gap-3 px-2">
        {[
          { text: "Hi! Do you deliver to Lagos?", align: "left", delay: 0 },
          { text: "What are your prices for bulk orders?", align: "left", delay: 0.3 },
          { text: "I need to track my order #4521", align: "left", delay: 0.6 },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + msg.delay, duration: 0.5 }}
            className="flex items-start gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#9ca3af" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="rounded-[14px] rounded-tl-[4px] px-4 py-2.5 max-w-[220px]" style={{ background: "#f3f4f6", border: "1px solid #e2e8f0" }}>
              <p className="text-[#1a1a2e]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem" }}>{msg.text}</p>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
          className="mx-auto mt-3 w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "#37b24d", boxShadow: "0 0 40px rgba(55,178,77,0.4)" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="white" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function IllustrationStep2() {
  return (
    <div className="relative flex-1 flex items-center justify-center w-full min-h-0">
      <div className="relative w-[240px] h-[200px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200">
          <motion.line
            x1="55" y1="60" x2="175" y2="60"
            stroke="#37b24d" strokeWidth="1.5" strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.line
            x1="55" y1="60" x2="110" y2="145"
            stroke="#37b24d" strokeWidth="1.5" strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          <motion.line
            x1="175" y1="60" x2="110" y2="145"
            stroke="#37b24d" strokeWidth="1.5" strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </svg>

        {[
          { label: "WhatsApp", emoji: "💬", left: "4px", top: "20px", color: "#37b24d", delay: 0 },
          { label: "AI Engine", emoji: "⚡", left: "152px", top: "20px", color: "#37b24d", delay: 0.2 },
          { label: "Your CRM", emoji: "📋", left: "78px", top: "108px", color: "#9ca3af", delay: 0.4 },
        ].map((n, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + n.delay, duration: 0.4, type: "spring" }}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: n.left, top: n.top }}
          >
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl shadow-sm"
              style={{
                background: "#ffffff",
                border: `1px solid ${n.color}44`,
                boxShadow: `0 0 20px ${n.color}22`,
              }}
            >
              {n.emoji}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#6b7280" }}>{n.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IllustrationStep3() {
  const stats = [
    { label: "Leads handled", value: "1,284", change: "+38%", color: "#37b24d" },
    { label: "Avg response", value: "1.4s", change: "24/7", color: "#37b24d" },
    { label: "Resolved auto", value: "91%", change: "+12%", color: "#37b24d" },
  ];

  return (
    <div className="relative flex-1 flex items-center justify-center w-full min-h-0 px-2">
      <div className="w-full max-w-[280px] flex flex-col gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            className="relative rounded-[14px] p-4 flex items-center justify-between overflow-hidden bg-white border border-gray-200 shadow-sm"
          >
            <span className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${s.color}55,transparent)` }} />
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#6b7280", marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "1.2rem", color: "#1a1a2e" }}>{s.value}</p>
            </div>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ fontFamily: "'Inter', sans-serif", background: `${s.color}15`, color: s.color }}
            >
              {s.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StepIcon({ num, icon }: { num: string; icon: React.ReactNode }) {
  return (
    <div className="relative w-14 h-14 shrink-0">
      <div className="absolute inset-0 rounded-full bg-white border border-gray-200 shadow-sm" />
      <div className="absolute inset-0 flex items-center justify-center">
        {icon}
      </div>
      <span
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
        style={{ background: "#37b24d", fontFamily: "'Inter', sans-serif" }}
      >
        {num}
      </span>
    </div>
  );
}

const steps = [
  {
    num: "1",
    title: "Share Your Workflow",
    desc: "From lead gen to customer support, just tell us how your WhatsApp works and the tools you use.",
    Illustration: IllustrationStep1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#37b24d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "We Build the System",
    desc: "We design and set up custom automations that connect WhatsApp to your tools with AI — so work happens while you sleep.",
    Illustration: IllustrationStep2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#37b24d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Watch It Work",
    desc: "Sit back while leads are captured, support tickets handled, and campaigns sent — all automatically, 24/7.",
    Illustration: IllustrationStep3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="#37b24d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 7 22 7 22 13" stroke="#37b24d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="Howitworks" className="relative bg-white py-[112px] px-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 relative z-10">
        <div ref={ref} className="flex flex-col gap-[23px] mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#37b24d",
              letterSpacing: "2.8px",
              textTransform: "uppercase",
            }}
          >
            PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[#1a1a2e]"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            How it works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map(({ num, title, desc, Illustration, icon }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="relative bg-white rounded-[20px] overflow-hidden flex flex-col border border-gray-200 shadow-sm"
              style={{ minHeight: 520 }}
            >
              <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ boxShadow: "inset 0 2px 0 rgba(55, 178, 77, 0.15)" }} />
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: -65, left: -110, width: 286, height: 294, borderRadius: 24,
                  background: "linear-gradient(to bottom, rgba(55, 178, 77, 0), rgba(55, 178, 77, 0.06))",
                  filter: "blur(42px)", opacity: 0.8,
                }}
              />
              <div className="relative z-10 flex flex-col gap-6 p-6 h-full">
                <div className="flex flex-col gap-6">
                  <StepIcon num={num} icon={icon} />
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-[#1a1a2e]"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.4rem",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-[#6b7280]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
                <div className="flex-1 min-h-0 flex items-center justify-center">
                  <Illustration />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
