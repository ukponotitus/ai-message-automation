import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function Hero() {
  const [conversation, setConversation] = useState<
    { type: "user" | "bot"; text: string; id: number }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

  const timeouts = useRef<number[]>([]);
    const [open, setOpen] = useState(false);


  const messages: { type: "user" | "bot"; text: string }[] = [
    {type:"user", text:"Hi"},
    { type: "bot", text: "Hi! 👋 How can we help you today?" },
    { type: "user", text: "Do you have a website where I can see more?" },
    { type: "bot", text: "Check out our product page!" },
  ];

  const clearAllTimeouts = () => {
    timeouts.current.forEach((id) => clearTimeout(id));
    timeouts.current = [];
  };

  useEffect(() => {
    if (step >= messages.length) {
      const resetTimeout = setTimeout(() => {
        setConversation([]);
        setStep(0);
        setIsTyping(false);
      }, 2000);
      timeouts.current.push(resetTimeout);
      return () => clearTimeout(resetTimeout);
    }

    const currentMsg = messages[step];

    if (currentMsg.type === "bot") {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setConversation((prev) => [
          ...prev,
          { ...currentMsg, id: Date.now() },
        ]);
        setStep(step + 1);
      }, 1000);
      timeouts.current.push(typingTimeout);
      return () => clearTimeout(typingTimeout);
    } else {
      const userDelay = setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          { ...currentMsg, id: Date.now() },
        ]);
        setStep(step + 1);
      }, 1500); 
      timeouts.current.push(userDelay);
      return () => clearTimeout(userDelay);
    }
  }, [step]);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);
  

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,14,20,0.90) 0%, rgba(10,14,20,0.72) 45%, rgba(10,14,20,0.28) 75%, rgba(10,14,20,0.08) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "25%",
          left: "-6%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(55,178,77,0.13) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 pb-20 flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-0">
<div className="flex-1 flex flex-col justify-between items-start max-w-[600px] py-8">
  <div className="w-full flex flex-col items-start gap-6">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        background: "rgba(55,178,77,0.12)",
        border: "1px solid rgba(55,178,77,0.30)",
      }}
    >
      <span className="w-2 h-2 rounded-full bg-[#37b24d] animate-pulse" />
      <span
        className="text-sm font-medium"
        style={{ color: "#37b24d", fontFamily: "'Poppins',sans-serif" }}
      >
        WhatsApp Automation · Nigeria
      </span>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.1 }}
      style={{
        fontFamily: "'Poppins',sans-serif",
        fontWeight: 700,
        fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        color: "#ffffff",
      }}
    >
      Your Business on{" "}
      <span style={{ color: "#37b24d" }}>Autopilot.</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      style={{
        fontFamily: "'Poppins',sans-serif",
        fontWeight: 300,
        fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.65)",
        maxWidth: "480px",
      }}

    >
      AI that answers, qualifies, and closes on WhatsApp — while you sleep.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6 }}
      className="flex flex-wrap items-center gap-4 mt-1"
    >
      <motion.a
        href="/signIn"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(55,178,77,0.4)" }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-white font-semibold shadow-lg"
        style={{ background: "#37b24d", fontFamily: "'Poppins',sans-serif", fontSize: "1rem" }}
      >
                  <Link
  to="/signin?redirect=/onboarding"
  onClick={() => setOpen(false)}
  className="..."
>
  Get Started Free
</Link>
      </motion.a>

      <a
      href="https://wa.me/2348121676394"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-gray-200 text-[#fff] px-6 py-3 rounded-2xl font-semibold hover:border-[#37b24d] hover:text-[#37b24d] transition-all"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      Talk to Us
    </a>
    </motion.div>
  </div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7 }}
    className="flex-1 flex items-end justify-end mt-10  "
  >
    {[
      { icon: "🏢", label: "50+ Nigerian businesses" },
      { icon: "⚡", label: "Live in 48 hours" },
      { icon: "🔒", label: "100% private & secure" },
    ].map((b) => (
      <div
        key={b.label}
        className="flex items-center gap-2"
        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem" }}
      >
        <span>{b.icon}</span>
        <span>{b.label}</span>
      </div>
    ))}
  </motion.div>
</div>

        <motion.div
          className="flex-1 relative hidden lg:flex items-end justify-end pb-4 md:mt-16"
          style={{ minHeight: "400px" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute bottom-0 right-0 w-full max-w-sm flex flex-col items-end gap-3">
            <AnimatePresence>
              {conversation.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className={`rounded-2xl px-4 py-3 shadow-xl max-w-[260px] ${
                    msg.type === "user"
                      ? "rounded-br-sm bg-white self-end"
                      : "rounded-bl-sm bg-[#37b24d] self-start"
                  }`}
                >
                  {msg.type === "user" && (
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: "#1a1a2e", color: "#fff" }}
                      >
                        C
                      </div>
                      <span className="text-xs" style={{ color: "#9ca3af" }}>
                        Chidi O.
                      </span>
                    </div>
                  )}
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{
                      color: msg.type === "user" ? "#1a1a2e" : "#ffffff",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    {msg.text}
                  </p>
                  {msg.type === "bot" && (
                    <p
                      className="text-xs mt-1.5 text-right"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                    >
                      AutomateNG · just now ✓✓
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl rounded-bl-sm px-4 py-3 shadow-xl bg-[#37b24d] self-start max-w-[100px]"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.04, 1],
              y: 0,
            }}
            transition={{ delay: 1.65, duration: 2, repeat: Infinity }}
            className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              top: "6%",
              right: "6%",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              zIndex: 21,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#37b24d] animate-pulse" />
            <span className="text-xs font-medium text-white" style={{ fontFamily: "'Poppins',sans-serif" }}>
              Replied in &lt;2 seconds
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}