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
      className="group relative border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative z-10 w-full flex items-center justify-between gap-[20px] py-[24px] md:py-[32px] text-left outline-none"
      >
        <span
          className="font-['Inter'] text-[18px] md:text-[22px] leading-[1.4] transition-colors duration-300 font-medium"
          style={{ color: open ? "#37b24d" : "#1a1a2e" }}
        >
          {q}
        </span>
        <span
          className="shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-500 ease-out"
          style={{
            background: open ? "#f0fdf4" : "#f3f4f6",
            border: "1px solid",
            borderColor: open ? "#37b24d" : "#e2e8f0",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {open ? <Minus size={18} className="text-[#37b24d]" /> : <Plus size={18} className="text-[#9ca3af] group-hover:text-[#1a1a2e] transition-colors" />}
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
              <p className="text-[#6b7280] font-['Inter'] text-[16px] md:text-[18px] leading-[1.7]">{a}</p>
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
    <section id="faq" className="relative bg-gray-50 py-[80px] md:py-[140px] px-[20px] md:px-[40px] overflow-hidden border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[64px] lg:gap-[100px]">
          <div ref={ref} className="flex flex-col gap-[24px] lg:sticky lg:top-[120px] self-start">
            <div className="flex flex-col gap-[16px]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="font-['Inter'] font-medium text-[#37b24d] text-[12px] md:text-[13px] tracking-[2.5px] uppercase"
              >
                KNOWLEDGE BASE
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.55 }}
                className="text-[#1a1a2e] font-['Syne'] font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.04em]"
              >
                Everything you need to know.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[#6b7280] font-['Inter'] text-[16px] md:text-[18px] leading-[1.6]"
            >
              Have a different question? Reach out to our support team directly.
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
                className="group relative inline-flex items-center gap-[12px] bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#37b24d]/40 text-[#1a1a2e] px-[24px] py-[16px] rounded-[16px] transition-all duration-300 overflow-hidden shadow-sm"
              >
                <MessageCircle size={20} className="relative z-10 text-[#37b24d]" />
                <span className="relative z-10 font-['Inter'] font-medium text-[15px]">Chat with support</span>
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col border-t border-gray-200 lg:border-t-0 mt-[16px] lg:mt-0">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
