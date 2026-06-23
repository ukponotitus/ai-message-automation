import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";

const info = [
  { Icon: Mail, label: "Email Us", value: "automatenig@gmail.com", href: "mailto:automatenig@gmail.com" },
  { Icon: Phone, label: "Call Us", value: "+234 812 167 6394", href: "tel:+2348121676394" },
  { Icon: MapPin, label: "Location", value: "Ikot Ekpene, Akwa Ibom, Nigeria", href: null },
  { Icon: Clock, label: "Business Hours", value: "Mon–Sat, 9am–6pm WAT", href: null },
];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<"whatsapp" | "email">("whatsapp"); 
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (method === "whatsapp") {
      const t = encodeURIComponent(`Hello, I found you online.\n\nName: ${name}\nPhone: ${phone}\n\nMessage: ${message}`);
      window.open(`https://wa.me/2348121676394?text=${t}`, "_blank");
    } else {
      setLoading(true);
      try {
        const response = await fetch("https://ai-message-be-service.vercel.app/email-webhook/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
          setSubmitted(true);
          setName(""); setEmail(""); setMessage("");
        }
      } catch (error) {
        console.error("Email submission failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section id="contact" className="relative bg-gray-50 py-[80px] md:py-[140px] px-[20px] md:px-[40px] overflow-hidden border-t border-gray-200">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#37b24d] opacity-[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#37b24d] opacity-[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10" ref={ref}>
        <div className="flex flex-col items-center text-center gap-[16px] mb-[64px] md:mb-[80px]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} className="inline-flex items-center gap-[8px] px-[16px] py-[6px] rounded-full bg-white border border-gray-200 shadow-sm">
            <div className="w-[8px] h-[8px] rounded-full bg-[#37b24d] animate-pulse" />
            <span className="font-['Inter'] font-medium text-[#6b7280] text-[12px] tracking-[1.5px] uppercase">READY TO AUTOMATE?</span>
          </motion.div>
          <motion.h2 className="text-[#1a1a2e] font-['Poppins'] font-normal text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.04em] max-w-[700px]">Let's build your <span className="text-[#37b24d]">growth engine</span> together.</motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[32px] md:gap-[48px] items-start relative">
          
          <div className="flex flex-col gap-[16px]">
            {info.map(({ Icon, label, value, href }, i) => (
              <div key={label} className="group relative bg-white border border-gray-200 rounded-[20px] p-[24px] shadow-sm">
                 <div className="relative z-10 flex items-center gap-[20px]">
                  <div className="w-[56px] h-[56px] rounded-[16px] bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-[#6b7280]" />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <span className="font-['Inter'] text-[#6b7280] text-[13px] tracking-[0.5px] uppercase">{label}</span>
                    <span className="font-['Poppins'] text-[#1a1a2e] text-[16px]">{value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div className="bg-white border border-gray-200 rounded-[24px] p-[24px] md:p-[40px] relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#37b24d] to-transparent opacity-20" />
            
            <div className="mb-[32px]">
              <h3 className="text-[#1a1a2e] font-['Poppins'] font-medium text-[24px] md:text-[28px] leading-[1.2] mb-[8px]">
                {submitted ? "Zira is replying!" : "Send a Message"}
              </h3>
              <p className="text-[#6b7280] font-['Poppins'] text-[15px]">
                {submitted ? "Check your email inbox shortly for a response." : "Choose your preferred way to connect."}
              </p>
            </div>

            {!submitted && (
              <div className="flex gap-2 p-1 bg-gray-100 rounded-[16px] border border-gray-200 mb-8">
                <button
                  type="button"
                  onClick={() => setMethod("whatsapp")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-[12px] transition-all ${method === 'whatsapp' ? 'bg-[#37b24d] text-white font-semibold' : 'text-[#6b7280] hover:text-[#1a1a2e]'}`}
                >
                  <MessageSquare size={16} /> <span className="text-[13px]">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("email")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-[12px] transition-all ${method === 'email' ? 'bg-[#37b24d] text-white font-semibold' : 'text-[#6b7280] hover:text-[#1a1a2e]'}`}
                >
                  <Mail size={16} /> <span className="text-[13px]">Email AI</span>
                </button>
              </div>
            )}

            {!submitted && (
              <form onSubmit={submit} className="flex flex-col gap-[24px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[#6b7280] font-['Inter'] text-[13px]">Full Name <span className="text-[#37b24d]">*</span></label>
                    <div className={`relative rounded-[14px] bg-gray-50 border border-gray-200 transition-all duration-300 ${focused === 'name' ? 'border-[#37b24d]/60 shadow-[0_0_15px_rgba(55,178,77,0.1)]' : 'hover:border-gray-300'}`}>
                      <input type="text" required placeholder="John Doe" value={name} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent px-[16px] py-[14px] text-[#1a1a2e] font-['Poppins'] text-[15px] outline-none placeholder:text-gray-400" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[#6b7280] font-['Inter'] text-[13px]">
                        {method === 'whatsapp' ? 'Phone Number' : 'Email Address'} <span className="text-[#37b24d]">*</span>
                    </label>
                    <div className={`relative rounded-[14px] bg-gray-50 border border-gray-200 transition-all duration-300 ${focused === 'contact' ? 'border-[#37b24d]/60 shadow-[0_0_15px_rgba(55,178,77,0.1)]' : 'hover:border-gray-300'}`}>
                      {method === 'whatsapp' ? (
                        <input type="tel" required placeholder="+234 800 000 0000" value={phone} onFocus={() => setFocused('contact')} onBlur={() => setFocused(null)} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent px-[16px] py-[14px] text-[#1a1a2e] font-['Poppins'] text-[15px] outline-none" />
                      ) : (
                        <input type="email" required placeholder="john@example.com" value={email} onFocus={() => setFocused('contact')} onBlur={() => setFocused(null)} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent px-[16px] py-[14px] text-[#1a1a2e] font-['Poppins'] text-[15px] outline-none" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <label className="text-[#6b7280] font-['Inter'] text-[13px]">Project Details <span className="text-[#37b24d]">*</span></label>
                  <div className={`relative rounded-[14px] bg-gray-50 border border-gray-200 transition-all duration-300 ${focused === 'message' ? 'border-[#37b24d]/60 shadow-[0_0_15px_rgba(55,178,77,0.1)]' : 'hover:border-gray-300'}`}>
                    <textarea required placeholder="Tell us what you'd like to automate..." value={message} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full bg-transparent px-[16px] py-[14px] text-[#1a1a2e] font-['Poppins'] text-[15px] outline-none placeholder:text-gray-400 resize-none" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-[8px] group relative w-full bg-[#37b24d] text-white py-[16px] rounded-[14px] flex items-center justify-center gap-[12px] overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 font-['Poppins'] font-semibold text-[16px]">
                    {loading ? "Zira is thinking..." : method === 'whatsapp' ? "Send via WhatsApp" : "Send via Email AI"}
                  </span>
                  {loading ? <Loader2 size={18} className="animate-spin relative z-10" /> : <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />}
                </motion.button>
              </form>
            )}

            {submitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
                 <CheckCircle2 size={48} className="text-[#37b24d] mx-auto mb-4" />
                 <div className="text-[#1a1a2e] font-['Poppins']">Message received! Check your email for Zira's reply.</div>
                 <button type="button" onClick={() => setSubmitted(false)} className="mt-8 text-[#37b24d] text-sm underline cursor-pointer">Send another message</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
