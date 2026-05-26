import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";



const spheres = "/img/pheres.png";
const plans = [
  {
    name: "Business",
    price: "₦30,000",
    period: "/setup + ₦15,000/month",
    tag: "Most Popular",
    desc: "Full setup + managed automation for growing businesses.",
    features: [
      "Everything in Starter",
      "Custom AI workflow setup",
      "CRM / Sheets integration",
      "Lead qualification automation",
      "Broadcast messaging",
      "Priority support",
      "Meta API integration setup",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tag: "Scale",
    desc: "Advanced automation for high-volume businesses.",
    features: [
      "Multiple WhatsApp numbers",
      "Advanced workflows",
      "ERP / API integrations",
      "Multi-agent inbox",
      "Dedicated support",
      "SLA-backed uptime",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative bg-black py-[112px] px-5 overflow-hidden">
      <div className="absolute pointer-events-none inset-0 overflow-clip">
        <div className="absolute blur-[5px] opacity-70" style={{ width: 505, height: 505, right: -331, bottom: "10%" }}>
          <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 relative z-10">
        <div ref={ref} className="flex flex-col gap-[23px] mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "0.875rem", color: "#32cd87", letterSpacing: "2.8px", textTransform: "uppercase" }}
          >
            PRICING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-white"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.05em", lineHeight: 1.2 }}
          >
            Our Subscriptions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "1rem", color: "#a5a5a5", maxWidth: 480, lineHeight: 1.7 }}
          >
            No hidden fees. No contracts. Cancel any time. All plans include a free 7-day setup consultation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {plans.map(({ name, price, period, tag, desc, features, cta, highlight }, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="relative rounded-[20px] overflow-hidden flex flex-col"
              style={{
                background: highlight ? "linear-gradient(160deg, #1a2e1f 0%, #141414 60%)" : "#141414",
                border: highlight ? "1.5px solid rgba(37,211,102,0.35)" : "1.5px solid #1e1e1e",
              }}
            >
              <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ boxShadow: highlight ? "inset 0 2px 0 rgba(37,211,102,0.3)" : "inset 0 2px 0 #1e1e1e" }} />
              <div className="absolute pointer-events-none" style={{ bottom: -65, left: -110, width: 286, height: 294, borderRadius: 24, background: "linear-gradient(to bottom, rgba(36,95,55,0), #245f37)", filter: "blur(42px)", opacity: highlight ? 0.9 : 0.55 }} />

              <div className="relative z-10 p-7 flex flex-col gap-6 flex-1">
                {/* Plan header */}
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "1rem", color: highlight ? "#32CD87" : "#a5a5a5" }}>{name}</span>
                  {tag && (
                    <span className="px-3 py-1 rounded-full" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "1.2px", background: "rgba(37,211,102,0.15)", color: "#25D366", textTransform: "uppercase" }}>
                      {tag}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-end gap-1">
                    <span className="text-white" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: price === "Custom" ? "2.2rem" : "2.4rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {price}
                    </span>
                    {period && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", color: "#555", marginBottom: 4 }}>{period}</span>}
                  </div>
                  <p className="mt-2 text-[#a5a5a5]" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}>{desc}</p>
                </div>

                <div className="h-px bg-[#1e1e1e]" />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(37,211,102,0.15)" }}>
                        <Check size={11} style={{ color: "#25D366" }} />
                      </span>
                      <span className="text-[#c8c8c8]" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.88rem", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="https://wa.me/2348121676394"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center justify-center gap-2 py-[13px] rounded-[12px]"
                  style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "0.95rem", background: highlight ? "#245f37" : "#1a1a1a", border: highlight ? "none" : "1.5px solid #262626", color: "white", boxShadow: highlight ? "0 20px 17px #17230f" : "none" }}
                >
                  {highlight && <span className="absolute inset-0 rounded-[12px] border-t border-[#037c46] pointer-events-none" />}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="white" /></svg>
                  {cta}
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8 text-[#3a3a3a]"
          style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem" }}
        >
          All prices in Naira (₦). One-time setup fee may apply. Contact us for custom enterprise quotes.
        </motion.p>
      </div>
    </section>
  );
}
