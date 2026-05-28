import { motion } from "framer-motion";

const stats = [
  { value: "24/7", label: "Always Active" },
  { value: "<2s", label: "Response Time" },
  { value: "10x", label: "Faster Growth" },
];

const spheres = "/img/pheres.png";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#050505] px-5 pt-[80px] pb-16">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#25D366] opacity-[0.08] blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#25D366] opacity-[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto w-full flex flex-col items-center text-center gap-8">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#111] border border-[#222] rounded-full px-4 py-1.5 flex items-center gap-2 mb-4 mt-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          <span className="text-[#888] text-xs font-medium tracking-wider uppercase">
            The Future of Nigerian Trade
          </span>
        </motion.div>

        {/* Main Heading — Stronger Hook */}
        <div className="flex flex-col gap-2">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7 }}
               className="text-white font-semibold leading-[1.1] tracking-tight"
               style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontFamily: "'Poppins', sans-serif" }}
            >
              Your Business, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#dcfce7]">
                On Autopilot.
              </span>
            </motion.h1>
        </div>

        {/* Subtitle — More emotional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#a5a5a5] max-w-[640px] fz-lg leading-relaxed mx-auto"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 300 }}
        >
          Stop losing leads to slow replies. Our WhatsApp AI closes sales, 
          handles support, and qualifies prospects while you sleep.
        </motion.p>

        {/* CTA Buttons — Higher Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <motion.a
            href="https://wa.me/2348121676394"
            target="_blank"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37, 211, 102, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-[#050505] bg-[#25D366] font-bold text-lg shadow-lg"
          >
            Get Started Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </motion.a>

          <motion.button
            className="px-8 py-4 rounded-2xl text-white bg-transparent border border-[#333] font-medium text-lg hover:bg-white/5 transition-colors"
          >
            See Live Demo
          </motion.button>
        </motion.div>

        {/* Stats Row — Glassmorphism style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-6 w-full max-w-[600px] mt-12 pt-12 border-t border-white/5"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">{s.value}</span>
              <span className="text-[#666] text-xs md:text-sm uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}