import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  { q: "What is WhatsApp Business API and why do I need it?", a: "The WhatsApp Business API is the official, scalable version of WhatsApp for businesses. Unlike the free app, it allows you to automate messages, integrate with CRM systems, send bulk broadcasts, and handle thousands of conversations simultaneously." },
  { q: "How long does setup take?", a: "Most clients are fully up and running within 5–10 business days. This includes API account verification, bot setup, integrations, and a training session for your team." },
  { q: "Do I need technical knowledge to use the system?", a: "Not at all. We handle all the technical work — API setup, workflow design, integrations, and testing. Once live, your team manages conversations through a simple dashboard." },
  { q: "Will my customers know they're talking to a bot?", a: "Our AI bots are designed to sound natural and conversational. You can also configure them to hand off to a human agent for complex issues, which actually improves the overall customer experience." },
  { q: "What tools and CRMs can you integrate with?", a: "We integrate with HubSpot, Zoho CRM, Salesforce, Google Sheets, Paystack, Flutterwave, Shopify, WooCommerce, Calendly, and hundreds more via Zapier or custom API connections." },
  { q: "Is my business data safe?", a: "Yes. All communications run through Meta's official WhatsApp Business Platform, which is end-to-end encrypted. Our setups are compliant with NDPR (Nigeria Data Protection Regulation) guidelines." },
  { q: "What happens if something breaks after setup?", a: "Every plan includes ongoing support. If anything stops working you contact us on WhatsApp and we respond immediately. Growth and Scale plans include SLA-backed response times." },
  { q: "Can I upgrade or change my plan later?", a: "Absolutely. You can upgrade at any time as your business grows. There are no long-term contracts — we operate month-to-month with no penalty for changes." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative border-b border-[#262626] last:border-0"
    >
      <button 
        onClick={() => setOpen((o) => !o)} 
        className="relative z-10 w-full flex items-center justify-between gap-[20px] py-[24px] md:py-[32px] text-left outline-none"
      >
        <span 
          className="text-white font-['Poppins'] text-[18px] md:text-[22px] leading-[1.4] transition-colors duration-300"
          style={{ color: open ? "#32cd87" : "white" }}
        >
          {q}
        </span>
        <span 
          className="shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-500 ease-out" 
          style={{ 
            background: open ? "#1e3b2b" : "#141414", 
            border: "1px solid", 
            borderColor: open ? "#2a5c41" : "#262626",
            transform: open ? "rotate(180deg)" : "rotate(0deg)"
          }}
        >
          {open ? <Minus size={18} className="text-[#32cd87]" /> : <Plus size={18} className="text-[#a5a5a5] group-hover:text-white transition-colors" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-[32px] pr-[40px] md:pr-[80px]">
              <p className="text-[#888] font-['Poppins'] text-[16px] md:text-[18px] leading-[1.7]">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative bg-black py-[80px] md:py-[140px] px-[20px] md:px-[40px] overflow-hidden border-t border-[#1a1a1a]">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-[#262626] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#32cd87] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[64px] lg:gap-[100px]">
          
          {/* Left: sticky header */}
          <div ref={ref} className="flex flex-col gap-[24px] lg:sticky lg:top-[120px] self-start">
            <div className="flex flex-col gap-[16px]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="font-['Inter'] font-medium text-[#32cd87] text-[12px] md:text-[13px] tracking-[2.5px] uppercase"
              >
                KNOWLEDGE BASE
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.55 }}
                className="text-white font-['Poppins'] font-normal text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.04em]"
              >
                Everything you need to know.
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[#888] font-['Poppins'] text-[16px] md:text-[18px] leading-[1.6]"
            >
              Have a different question and can't find the answer you're looking for? Reach out to our support team directly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-[16px]"
            >
              <a
                href="https://wa.me/2348121676394"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-[12px] bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] hover:border-[#32cd87]/40 text-white px-[24px] py-[16px] rounded-[16px] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#32cd87]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <MessageCircle size={20} className="relative z-10 text-[#a5a5a5] group-hover:text-[#32cd87] transition-colors duration-300" />
                <span className="relative z-10 font-['Poppins'] font-medium text-[15px]">Chat with support</span>
              </a>
            </motion.div>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col border-t border-[#262626] lg:border-t-0 mt-[16px] lg:mt-0">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}