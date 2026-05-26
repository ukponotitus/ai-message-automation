import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

const info = [
  { Icon: Mail, label: "Email Us", value: "automatenig@gmail.com", href: "mailto:automatenig@gmail.com" },
  { Icon: Phone, label: "Call Us", value: "+234 812 167 6394", href: "tel:+2348121676394" },
  { Icon: MapPin, label: "Location", value: "Ikot Ekpene, Akwa Ibom, Nigeria", href: null },
  { Icon: Clock, label: "Business Hours", value: "Mon–Sat, 9am–6pm WAT", href: null },
];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = encodeURIComponent(`Hello, I found you online.\n\nName: ${name}\nPhone: ${phone}\n\nMessage: ${message}`);
    window.open(`https://wa.me/2348121676394?text=${t}`, "_blank");
  };

  return (
    <section id="contact" className="relative bg-[#050505] py-[80px] md:py-[140px] px-[20px] md:px-[40px] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#25D366] opacity-[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#32cd87] opacity-[0.03] blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#262626] to-transparent opacity-50" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10" ref={ref}>
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-[16px] mb-[64px] md:mb-[80px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-[8px] px-[16px] py-[6px] rounded-full bg-[#1a1a1a] border border-[#262626]"
          >
            <div className="w-[8px] h-[8px] rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-['Inter'] font-medium text-[#a5a5a5] text-[12px] tracking-[1.5px] uppercase">READY TO AUTOMATE?</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-white font-['Poppins'] font-normal text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.04em] max-w-[700px]"
          >
            Let's build your <span className="text-[#32cd87]">growth engine</span> together.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#888] font-['Poppins'] text-[16px] md:text-[18px] max-w-[600px] leading-[1.6]"
          >
            Whether you need a custom AI chatbot or a full-scale workflow automation system, our team is ready to deliver.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[32px] md:gap-[48px] items-start relative">
          
          {/* Left Column: Contact Info Cards */}
          <div className="flex flex-col gap-[16px]">
            {info.map(({ Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                className="group relative bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#32cd87]/40 rounded-[20px] p-[24px] overflow-hidden transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#112419] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-[20px]">
                  <div className="w-[56px] h-[56px] rounded-[16px] bg-[#141414] border border-[#262626] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#1a2f22] group-hover:border-[#32cd87]/50 transition-all duration-500">
                    <Icon size={22} className="text-[#888] group-hover:text-[#32cd87] transition-colors duration-500" />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <span className="font-['Inter'] text-[#888] text-[13px] tracking-[0.5px] uppercase">{label}</span>
                    {href ? (
                      <a href={href} className="font-['Poppins'] text-white text-[16px] md:text-[18px] hover:text-[#32cd87] transition-colors duration-300">
                        {value}
                      </a>
                    ) : (
                      <span className="font-['Poppins'] text-white text-[16px] md:text-[18px]">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Direct WhatsApp CTA Card */}
            <motion.a
              href="https://wa.me/2348121676394"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative bg-[#25D366] rounded-[20px] p-[32px] overflow-hidden mt-[16px] flex flex-col gap-[16px] hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.4)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white opacity-20 blur-[50px] group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col gap-[4px]">
                  <span className="font-['Poppins'] font-semibold text-[#0f3f22] text-[20px] md:text-[24px] leading-[1.2]">Chat directly</span>
                  <span className="font-['Poppins'] text-[#11502a] text-[15px]">We usually reply in minutes.</span>
                </div>
                <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-[24px] p-[24px] md:p-[40px] relative overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#32cd87] to-transparent opacity-20" />
            
            <div className="mb-[32px]">
              <h3 className="text-white font-['Poppins'] font-medium text-[24px] md:text-[28px] leading-[1.2] mb-[8px]">
                Send a Message
              </h3>
              <p className="text-[#888] font-['Poppins'] text-[15px]">
                Fill out the form below and we'll route it directly to our WhatsApp for an instant response.
              </p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-[24px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[#a5a5a5] font-['Inter'] text-[13px]">Full Name <span className="text-[#32cd87]">*</span></label>
                  <div className={`relative rounded-[14px] bg-[#141414] border transition-all duration-300 ${focused === 'name' ? 'border-[#32cd87]/60 shadow-[0_0_15px_rgba(37,211,102,0.1)]' : 'border-[#262626] hover:border-[#333]'}`}>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent px-[16px] py-[14px] text-white font-['Poppins'] text-[15px] outline-none placeholder:text-[#555]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <label className="text-[#a5a5a5] font-['Inter'] text-[13px]">Phone Number <span className="text-[#32cd87]">*</span></label>
                  <div className={`relative rounded-[14px] bg-[#141414] border transition-all duration-300 ${focused === 'phone' ? 'border-[#32cd87]/60 shadow-[0_0_15px_rgba(37,211,102,0.1)]' : 'border-[#262626] hover:border-[#333]'}`}>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent px-[16px] py-[14px] text-white font-['Poppins'] text-[15px] outline-none placeholder:text-[#555]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="text-[#a5a5a5] font-['Inter'] text-[13px]">Project Details <span className="text-[#32cd87]">*</span></label>
                <div className={`relative rounded-[14px] bg-[#141414] border transition-all duration-300 ${focused === 'message' ? 'border-[#32cd87]/60 shadow-[0_0_15px_rgba(37,211,102,0.1)]' : 'border-[#262626] hover:border-[#333]'}`}>
                  <textarea
                    required
                    placeholder="Tell us about your current workflow and what you'd like to automate..."
                    value={message}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-transparent px-[16px] py-[14px] text-white font-['Poppins'] text-[15px] outline-none placeholder:text-[#555] resize-none"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-[8px] group relative w-full bg-white text-black py-[16px] rounded-[14px] flex items-center justify-center gap-[12px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e0e0e0] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-['Poppins'] font-semibold text-[16px]">Send directly to WhatsApp</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <div className="flex items-center justify-center gap-[8px] mt-[8px]">
                <CheckCircle2 size={14} className="text-[#32cd87]" />
                <span className="font-['Inter'] text-[#888] text-[12px]">No wait times. 100% secure connection.</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
