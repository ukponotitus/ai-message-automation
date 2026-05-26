import { motion } from "motion/react";
// import sphereImg from "../../imports/1920WDefault-2/db218e28ccc24b458fd2b9ef4ca5741c37c2c7c0.png";
// import sphereImg2 from "../../imports/1920WDefault-2/9d6d507f86b0b324e0b80202be5dbfd93de00c48.png";

const stats = [
  { value: "24/7", label: "Automated replies" },
  { value: "<2s", label: "Response time" },
  { value: "100%", label: "WhatsApp native" },
];

const spheres = "/img/pheres.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-5 pt-[144px] pb-16">
      <div className="absolute inset-0 overflow-clip pointer-events-none">
        {/* Left top sphere */}
        <div
          className="absolute blur-[5px] opacity-80"
          style={{
            width: 505,
            height: 505,
            left: -315,
            top: "calc(100% - 1224px - 505px)",
          }}
        >
          <img
            src={spheres}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Right top large sphere */}
        <div
          className="absolute opacity-80"
          style={{ width: 604, height: 604, right: -171, top: -272 }}
        >
          <img
            src={spheres}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col items-start gap-6 px-5 sm:px-10">
        {/* Badge — matches Figma testimonial card position */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#141414] border border-[#1e1e1e] rounded-[24px] px-4 py-2 flex items-center gap-3 self-start"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span
            className="text-[#a5a5a5]"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 400,
              fontSize: "0.9rem",
            }}
          >
            WhatsApp Automation · Nigeria
          </span>
        </motion.div>

        {/* Main heading — Figma style: huge, stacked, Poppins 600 */}
        <div className="flex flex-col">
          {["Automate,", "Optimize,", "Scale With", "WhatsApp"].map(
            (word, i) => (
              <motion.h1
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="text-white leading-none"
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  letterSpacing: "-0.05em",
                }}
              >
                {word === "WhatsApp" ? (
                  <>
                    <span className="text-[#25D366]">WhatsApp</span> AI
                  </>
                ) : (
                  word
                )}
              </motion.h1>
            ),
          )}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.6 }}
          className="text-[#a5a5a5] max-w-[560px] leading-[1.6]"
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            letterSpacing: "-0.03em",
          }}
        >
          AI-powered replies, lead handling, and customer support — all running
          24/7 on WhatsApp without lifting a finger.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.55 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {/* Primary green — Figma "Link - Green" style */}
          <motion.a
            href="https://wa.me/2348121676394"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center justify-center gap-2 px-[18px] py-[16px] rounded-[14px] text-white"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              background: "#245f37",
              boxShadow: "0px 20px 17.5px #17230f",
            }}
          >
            <span className="absolute inset-0 rounded-[14px] border-t border-[#037c46] pointer-events-none" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                fill="white"
              />
            </svg>
            Chat on WhatsApp
          </motion.a>

          {/* Secondary — Figma "Link - Secondary" style */}
          {/* <motion.a
            href="mailto:automatenig@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center justify-center gap-2 bg-[#262626] px-5 py-[16px] rounded-[14px] text-white"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "1rem" }}
          >
            <span className="absolute inset-0 rounded-[14px] border-t border-[#424242] pointer-events-none" />
            Email coming soon
          </motion.a> */}
          <motion.button
            disabled
            className="relative flex items-center justify-center gap-2 bg-[#1f1f1f] px-5 py-[16px] rounded-[14px] text-[#666] cursor-not-allowed opacity-60"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            <span className="absolute inset-0 rounded-[14px] border-t border-[#2f2f2f] pointer-events-none" />
            Email coming soon
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.64, duration: 0.55 }}
          className="grid grid-cols-3 gap-3 w-full max-w-[460px]"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 + i * 0.08 }}
              whileHover={{ borderColor: "rgba(37,211,102,0.5)" }}
              className="bg-[#141414] border border-[#1e1e1e] rounded-[16px] p-4 flex flex-col items-center gap-1 transition-colors duration-200"
            >
              <span
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.3rem,4vw,1.7rem)",
                  color: "#25D366",
                }}
              >
                {s.value}
              </span>
              <span
                className="text-[#a5a5a5] text-center leading-tight"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.68rem",
                }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by strip */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center gap-3 mt-6"
        >
          <span
            className="text-[#a5a5a5]"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "0.9rem", background: "linear-gradient(90deg,#fff,#a5a5a5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Trusted by 50+ Nigerian businesses
          </span>
        </motion.div> */}
      </div>
    </section>
  );
}
