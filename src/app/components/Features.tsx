import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bot, Users, Zap, Megaphone } from "lucide-react";

const spheres = "/img/pheres.png";

const cards = [
  {
    Icon: Bot,
    title: "AI Customer Support",
    body: "Instant AI replies handle FAQs, orders, and complaints automatically — any time of day.",
    num: "01",
  },
  {
    Icon: Users,
    title: "Lead Qualification",
    body: "Automatically collect, score, and route inbound WhatsApp leads to your sales team.",
    num: "02",
  },
  {
    Icon: Zap,
    title: "Workflow Automation",
    body: "Connect WhatsApp to your CRM, booking systems, or payment flows without code.",
    num: "03",
  },
  {
    Icon: Megaphone,
    title: "Broadcast Campaigns",
    body: "Send targeted messages, promotions, and follow-ups to customer segments at scale.",
    num: "04",
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative bg-white py-[112px] px-5 overflow-hidden">
      <div className="absolute pointer-events-none inset-0 overflow-clip">
        <div className="absolute blur-[5px] opacity-40" style={{ width: 505, height: 505, left: -310, top: -60 }}>
          <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute opacity-40" style={{ width: 505, height: 505, right: -341, top: 300 }}>
          <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 relative z-10">
        <div ref={ref} className="flex flex-col gap-[23px] mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "#37b24d",
              letterSpacing: "2.8px",
              textTransform: "uppercase",
            }}
          >
            WHAT WE BUILD
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[#1a1a2e]"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.05em", lineHeight: 1.2 }}
          >
            Everything your business<br className="hidden sm:block" /> needs on WhatsApp
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map(({ Icon, title, body, num }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{
                scale: 1.018,
                borderColor: "rgba(55,178,77,0.3)",
              }}
              className="relative bg-white border-2 border-gray-200 rounded-[20px] p-6 flex flex-col gap-6 overflow-hidden transition-all duration-300"
            >
              <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#37b24d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div
                className="absolute bottom-[-65px] left-[-110px] w-[286px] h-[294px] rounded-[24px] opacity-30 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(55,178,77,0), #37b24d)", filter: "blur(42px)" }}
              />

              <div className="flex items-center justify-between">
                <div className="w-[56px] h-[56px] rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "1.1rem", color: "#9ca3af" }}>{num}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Icon size={19} className="text-[#37b24d]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="text-[#1a1a2e]"
                  style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "1.4rem", letterSpacing: "-0.03em" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#6b7280] leading-relaxed"
                  style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.95rem" }}
                >
                  {body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="mt-12 relative bg-white border-2 border-gray-200 rounded-[20px] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden"
        >
          <span className="absolute inset-0 rounded-[20px] border-t-2 border-gray-200 pointer-events-none" />
          <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full opacity-30 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #37b24d)", filter: "blur(60px)" }} />

          <div className="relative z-10">
            <p className="text-[#1a1a2e]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "1.15rem", letterSpacing: "-0.03em" }}>
              Ready to put your WhatsApp on autopilot?
            </p>
            <p className="text-[#6b7280] mt-1" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.9rem" }}>
              We set it up and get you running in days, not weeks.
            </p>
          </div>

          <motion.a
            href="https://wa.me/2348121676394"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative shrink-0 bg-[#37b24d] text-white px-5 py-[14px] rounded-[14px] z-10"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "0.95rem", boxShadow: "0 20px 17px rgba(55,178,77,0.2)" }}
          >
            <span className="absolute inset-0 rounded-[14px] border-t border-[#4cd964] pointer-events-none" />
            Get started →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
