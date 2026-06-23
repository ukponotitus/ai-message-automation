import { motion } from "motion/react";

const spheres = "/img/pheres.png";

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#37b24d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    ),
    title: "Simple > Complex",
    desc: "We cut through the noise. Every automation we build is clean, purposeful, and easy to maintain.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#37b24d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: "Human Advice, Not Just AI",
    desc: "We combine real business experience with AI — you get a strategy partner, not just a chatbot.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#37b24d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    title: "Build for Impact",
    desc: "We design for real results — more leads closed, fewer hours wasted, more money made.",
  },
];

const antiBeliefs = [
  {
    title: "More tools = more progress",
    desc: "Fewer, smarter systems always win. We simplify your stack, not bloat it.",
  },
  {
    title: "Every problem needs a new solution",
    desc: "Your existing stack is often enough — it just needs the right orchestration.",
  },
  {
    title: "Busy = Productive",
    desc: "We optimize to remove work, not add dashboards to monitor more work.",
  },
];

function FadeIn({ children, delay = 0, className = "" }:any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: any) {
  return (
    <span
      className="text-[#37b24d] uppercase tracking-widest"
      style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.18em" }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children }: any) {
  return (
    <h2
      className="text-[#1a1a2e] leading-tight"
      style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "clamp(1.9rem, 4vw, 2.8rem)", letterSpacing: "-0.04em" }}
    >
      {children}
    </h2>
  );
}

export function AboutPage() {
  return (
    <div className="bg-white min-h-screen overflow-hidden">

      <section className="relative flex items-center justify-center min-h-[52vh] px-5 pt-[130px] pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-clip">
          <div className="absolute opacity-30 blur-[6px]" style={{ width: 500, height: 500, right: -180, top: -200 }}>
            <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute opacity-20 blur-[8px]" style={{ width: 360, height: 360, left: -120, bottom: -100 }}>
            <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-[24px] px-4 py-2 flex items-center gap-3 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#37b24d] animate-pulse" />
            <span className="text-[#6b7280]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.85rem" }}>
              WhatsApp Automation · Nigeria
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[#1a1a2e]"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "clamp(2.6rem, 7vw, 4.5rem)", letterSpacing: "-0.05em", lineHeight: 1.08 }}
          >
            Where AI meets{" "}
            <span className="text-[#37b24d]">business clarity.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#6b7280] max-w-[560px] leading-[1.65]"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "clamp(0.95rem, 2vw, 1.08rem)", letterSpacing: "-0.02em" }}
          >
            We design intelligent WhatsApp systems tailored to how your business works — not the other way around.
          </motion.p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <SectionLabel>Our Background</SectionLabel>
              <SectionHeading>Our Story</SectionHeading>
              <div className="flex flex-col gap-4">
                {[
                  "Nigerian businesses were losing hours every day to repetitive WhatsApp messages — answering the same questions, chasing leads, following up manually.",
                  "So we asked: what if WhatsApp could work for you while you sleep? What if AI could handle the noise — without replacing the human touch your customers expect?",
                  "That's how we started. Not as a flashy tech product, but as a quiet force behind Lagos businesses that want to move faster, close more deals, and never miss a message again.",
                ].map((para, i) => (
                  <p key={i} className="text-[#6b7280] leading-[1.7]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.97rem", letterSpacing: "-0.02em" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="rounded-[20px] overflow-hidden aspect-[4/3] shadow-sm">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCuT4zKRhi1U4Js__0rvwDh9qPuSl3XpOBQ&s"
                  alt="Team at work"
                  className="w-full h-full object-cover grayscale opacity-60"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-28">
        <FadeIn>
          <div className="flex flex-col gap-3 mb-12">
            <SectionLabel>Our Values</SectionLabel>
            <SectionHeading>What We Believe</SectionHeading>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ borderColor: "rgba(55,178,77,0.4)" }}
                className="bg-white border border-gray-200 rounded-[20px] p-7 flex flex-col gap-4 transition-colors duration-200 h-full shadow-sm"
              >
                <div className="w-10 h-10 rounded-[10px] bg-gray-50 border border-gray-200 flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="text-[#1a1a2e]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.03em" }}>
                  {v.title}
                </h3>
                <p className="text-[#6b7280] leading-[1.65]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.88rem" }}>
                  {v.desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-28">
        <FadeIn>
          <div className="flex flex-col gap-3 mb-12">
            <SectionLabel>Anti-Beliefs</SectionLabel>
            <SectionHeading>What We Don't Believe In</SectionHeading>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-3">
          {antiBeliefs.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ borderColor: "rgba(55,178,77,0.3)", x: 4 }}
                className="bg-white border border-gray-200 rounded-[16px] px-7 py-6 flex items-start gap-5 transition-all duration-200 shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div>
                  <p className="text-[#1a1a2e] mb-1.5" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.03em" }}>
                    {item.title}
                  </p>
                  <p className="text-[#6b7280]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn>
        <section className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-28">
          <div className="bg-white border border-gray-200 rounded-[24px] p-10 sm:p-16 flex flex-col items-center text-center gap-6 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 110%, rgba(55,178,77,0.07) 0%, transparent 70%)" }} />
            <p className="text-[#37b24d] uppercase tracking-widest" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.18em" }}>
              Ready to Automate?
            </p>
            <h2 className="text-[#1a1a2e] relative z-10" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.05em", lineHeight: 1.1 }}>
              You don't need more people.<br />You need better systems.
            </h2>
            <p className="text-[#6b7280] max-w-[460px]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.97rem" }}>
              Let's build your WhatsApp automation. 50+ Nigerian businesses already have.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 relative z-10">
              <motion.a
                href="https://wa.me/2348121676394"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center justify-center gap-2 px-6 py-4 rounded-[14px] text-white"
                style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "1rem", background: "#37b24d", boxShadow: "0px 20px 17.5px rgba(55,178,77,0.2)" }}
              >
                <span className="absolute inset-0 rounded-[14px] border-t border-[#4cd964] pointer-events-none" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                Chat on WhatsApp
              </motion.a>
              <motion.a
                href="mailto:automatenig@gmail.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center justify-center gap-2 bg-gray-100 px-6 py-4 rounded-[14px] text-[#1a1a2e] border border-gray-200"
                style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "1rem" }}
              >
                Email us
              </motion.a>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}
