import { motion } from "motion/react";
import { Mail, ZoomIn, MessageSquare, Database, RefreshCw, Layers } from "lucide-react";

export function WhatWeOffer() {
  return (
    <section id="services" className="bg-black py-[60px] md:py-[112px] px-[20px] md:px-[40px] flex flex-col items-center relative w-full overflow-hidden">
      <div className="flex flex-col gap-[40px] md:gap-[64px] max-w-[1120px] w-full">
        {/* Header */}
        <div className="flex flex-col gap-[16px] md:gap-[23px] items-start w-full">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-['Inter'] font-medium text-[#32cd87] text-[12px] md:text-[13.8px] tracking-[2.8px] uppercase m-0"
          >
            SERVICES
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="font-['Poppins'] font-normal text-[40px] md:text-[64px] text-white tracking-[-2px] md:tracking-[-3.2px] leading-[1.2] m-0"
          >
            What We Offer
          </motion.h2>
        </div>

        {/* Grid Container */}
        <div className="flex flex-col gap-[24px]">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] w-full">
            
            {/* Card 1: Lead Gen */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, borderColor: "rgba(37,211,102,0.4)", boxShadow: "0 20px 40px -20px rgba(37,211,102,0.15)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#141414] rounded-[20px] border border-[#1e1e1e] p-[24px] flex flex-col gap-[32px] overflow-hidden group cursor-pointer"
            >
              {/* Graphic */}
              <div className="h-[220px] bg-gradient-to-b from-[#112419] to-transparent rounded-[16px] flex flex-col items-center justify-center p-[20px] relative border border-[#1e1e1e] group-hover:border-[#32cd87]/20 transition-colors duration-500">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-[48px] h-[48px] bg-[#25D366] rounded-[12px] shadow-[0_0_30px_rgba(37,211,102,0.3)] mb-4 shrink-0 flex items-center justify-center z-10 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-500"
                >
                  <div className="w-[16px] h-[16px] bg-[#1a1a1a] rounded-[4px]"></div>
                </motion.div>
                
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: 40 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-px bg-[#25D366] absolute top-[44px] z-0 origin-top group-hover:bg-white transition-colors duration-500"
                ></motion.div>
                
                <div className="flex flex-col gap-[8px] w-full mt-2 relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#1e1e1e]/80 rounded-[8px] p-[12px] flex items-center justify-between border border-[#262626] group-hover:bg-[#25D366]/10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-[12px]">
                      <div className="text-white font-bold text-[14px]">M</div>
                      <div className="flex flex-col">
                        <span className="text-white text-[12px] font-['Poppins'] font-medium">Gmail</span>
                        <span className="text-[#a5a5a5] text-[10px] font-['Poppins']">Compose a mail</span>
                      </div>
                    </div>
                    <span className="text-[#a5a5a5] text-[10px] font-['Poppins']">Running Currently...</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#1e1e1e]/60 rounded-[8px] p-[12px] flex items-center gap-[12px] border border-[#262626] group-hover:bg-[#25D366]/10 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-300 delay-75"
                  >
                    <Database size={14} className="text-white" />
                    <div className="flex flex-col">
                      <span className="text-white text-[12px] font-['Poppins'] font-medium">AirTable</span>
                      <span className="text-[#a5a5a5] text-[10px] font-['Poppins']">Send mail to the users</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="bg-[#1e1e1e]/40 rounded-[8px] p-[12px] flex items-center gap-[12px] border border-[#262626] group-hover:bg-[#25D366]/10 group-hover:translate-x-3 group-hover:-translate-y-1 transition-all duration-300 delay-150"
                  >
                    <ZoomIn size={14} className="text-white" />
                    <div className="flex flex-col">
                      <span className="text-white text-[12px] font-['Poppins'] font-medium">Zoom</span>
                      <span className="text-[#a5a5a5] text-[10px] font-['Poppins']">Schedule the call</span>
                    </div>
                  </motion.div>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-['Poppins'] font-normal text-[24px] text-white leading-[31.2px] m-0">
                  Lead Generation &<br />Outreach
                </h3>
                <p className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] m-0">
                  Automate lead sourcing, email follow-ups, and engagement to grow your business effortlessly.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Data Processing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, borderColor: "rgba(37,211,102,0.4)", boxShadow: "0 20px 40px -20px rgba(37,211,102,0.15)" }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="bg-[#141414] rounded-[20px] border border-[#1e1e1e] p-[24px] flex flex-col justify-between overflow-hidden group relative cursor-pointer"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#112419] to-transparent pointer-events-none group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="flex items-center gap-[8px] mb-[40px]">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-[8px] h-[8px] rounded-full bg-[#32cd87]"
                ></motion.div>
                <span className="text-[#a5a5a5] text-[14px] font-['Poppins'] group-hover:text-white transition-colors duration-300">Before AutomateNG</span>
              </div>
              
              <div className="flex items-end justify-center gap-[12px] h-[140px] mb-[40px] relative z-10">
                {[40, 60, 45, 80, 50, 45, 30].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.05), duration: 0.5, type: "spring" }}
                    className="w-[20px] bg-[#262626] rounded-t-[6px] group-hover:bg-[#32cd87] group-hover:scale-y-[1.15] origin-bottom transition-all duration-500"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  ></motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-[12px] mt-auto relative z-10">
                <h3 className="font-['Poppins'] font-normal text-[24px] text-white leading-[31.2px] m-0">
                  Data Processing & Insights
                </h3>
                <p className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] m-0">
                  Turn raw data into actionable insights with AI-driven analysis and reporting.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Chatbots */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, borderColor: "rgba(37,211,102,0.4)", boxShadow: "0 20px 40px -20px rgba(37,211,102,0.15)" }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              className="bg-[#141414] rounded-[20px] border border-[#1e1e1e] p-[24px] flex flex-col justify-between overflow-hidden relative group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#25D366] blur-[100px] opacity-10 rounded-full pointer-events-none group-hover:opacity-30 group-hover:scale-110 transition-all duration-700" />
              
              <div className="flex flex-col gap-[12px] mb-[30px] relative z-10 pt-[5px]">
                {/* User Message */}
                <div className="flex items-end gap-[8px]">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-[24px] h-[24px] bg-[#a5a5a5] rounded-full overflow-hidden border border-[#262626] shrink-0 group-hover:scale-110 transition-transform duration-500"
                  >
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50&h=50" alt="Profile" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-[#262626] text-white p-[10px_14px] rounded-[16px] rounded-bl-[4px] border border-[#333] w-fit font-['Poppins'] text-[12px] group-hover:-translate-y-1 transition-all duration-500"
                  >
                    Can I automate replies?
                  </motion.div>
                </div>

                {/* AI Response 1 */}
                <div className="flex items-end gap-[8px] self-end mt-[4px]">
                  <motion.div 
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0, type: "spring" }}
                    className="bg-[#1e3b2b] text-white p-[10px_14px] rounded-[16px] rounded-br-[4px] border border-[#2a5c41] max-w-[200px] font-['Poppins'] text-[12px] group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(37,211,102,0.15)] transition-all duration-500"
                  >
                    Yes! We can set up an AI chatbot to handle 80% of your queries. ⚡
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, type: "spring" }}
                    className="w-[24px] h-[24px] bg-[#25D366] rounded-full shrink-0 flex items-center justify-center border border-[#1e1e1e] group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                       <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="white" />
                    </svg>
                  </motion.div>
                </div>
                
                {/* AI Response 2 */}
                <div className="flex items-end gap-[8px] self-end -mt-[4px]">
                  <motion.div 
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6, type: "spring" }}
                    className="bg-[#1e3b2b] text-white p-[10px_14px] rounded-[16px] rounded-br-[4px] rounded-tr-[4px] border border-[#2a5c41] max-w-[200px] font-['Poppins'] text-[12px] group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(37,211,102,0.15)] transition-all duration-500 delay-75"
                  >
                    Would you like a demo?
                  </motion.div>
                  <div className="w-[24px] shrink-0 opacity-0" />
                </div>
              </div>

              <div className="flex flex-col gap-[12px] relative z-10 mt-auto">
                <h3 className="font-['Poppins'] font-normal text-[24px] text-white leading-[31.2px] m-0">
                  AI-Powered Chatbots
                </h3>
                <p className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] m-0">
                  Enhance customer support with intelligent, 24/7 AI chatbots that handle queries instantly.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-[24px] w-full">
            
            {/* Card 4: Workflow Automation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, borderColor: "rgba(37,211,102,0.4)", boxShadow: "0 20px 40px -20px rgba(37,211,102,0.15)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#141414] rounded-[20px] border border-[#1e1e1e] p-[24px] flex flex-col gap-[40px] overflow-hidden group cursor-pointer"
            >
              {/* Graphic */}
              <div className="relative h-[220px] flex items-center justify-between px-[20px]">
                <div className="flex flex-col gap-[12px] w-[60%] relative z-10">
                  {[
                    { name: "Emma, RetailSync", time: "09:45 PM", text: "We're looking to automate inventory updates. Can you help?", bg: "bg-gradient-to-r from-[#173a26] to-[#132a1d]", border: "border-[#1e4a31]" },
                    { name: "Liam, FinEdge Analytics", time: "12:45 AM", text: "How does your AI handle financial data processing?", bg: "bg-[#1a1a1a]", border: "border-[#262626]" },
                    { name: "Olivia, GreenTech Solutions", time: "02:45 AM", text: "Looking for AI automation to streamline customer inquiries. Can we discuss?", bg: "bg-[#1a1a1a]", border: "border-[#262626]" }
                  ].map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.15) }}
                      className={`rounded-[8px] sm:rounded-[12px] p-[8px] sm:p-[12px] flex items-start gap-[6px] sm:gap-[12px] border ${msg.border} ${msg.bg} relative overflow-hidden group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#32cd87]/60 group-hover:shadow-[0_5px_15px_rgba(37,211,102,0.1)] transition-all duration-300 w-full sm:w-auto`}
                    >
                       {/* Subtle continuous pulse for the active item */}
                       {i === 0 && (
                         <motion.div 
                           animate={{ opacity: [0, 0.4, 0] }}
                           transition={{ repeat: Infinity, duration: 2 }}
                           className="absolute inset-0 bg-[#32cd87] pointer-events-none"
                         />
                       )}
                       <div className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px] bg-[#262626] rounded-full shrink-0 overflow-hidden relative z-10 mt-[2px] sm:mt-0">
                         <img src={['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=50&h=50', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&h=50'][i % 3]} alt="Avatar" className="w-full h-full object-cover" />
                       </div>
                       <div className="flex flex-col flex-1 gap-[2px] sm:gap-[4px] relative z-10 min-w-0">
                          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center w-full">
                            <span className="text-white text-[9px] sm:text-[12px] font-['Poppins'] font-medium truncate w-full">{msg.name}</span>
                            <span className="text-[#a5a5a5] text-[8px] sm:text-[10px] font-['Poppins'] shrink-0 hidden sm:block">{msg.time}</span>
                          </div>
                          <span className="text-[#d6d6d6] text-[8px] sm:text-[10px] font-['Poppins'] line-clamp-2 sm:line-clamp-none leading-tight">{msg.text}</span>
                       </div>
                    </motion.div>
                  ))}
                </div>

                {/* Node connection logic */}
                <div className="absolute right-[20px] top-0 bottom-0 w-[140px] flex items-center justify-end pointer-events-none">
                   <svg width="100" height="220" className="absolute right-[40px] top-0 z-0">
                      {/* Base Track Lines */}
                      <path d="M 0 48 C 50 48, 50 110, 100 110" fill="none" stroke="#262626" strokeWidth="1" />
                      <path d="M 0 110 L 100 110" fill="none" stroke="#262626" strokeWidth="1" />
                      <path d="M 0 172 C 50 172, 50 110, 100 110" fill="none" stroke="#262626" strokeWidth="1" />

                      {/* Animated Flowing Data */}
                      <motion.path 
                        d="M 0 48 C 50 48, 50 110, 100 110" fill="none" stroke="#25D366" strokeWidth="2"
                        strokeDasharray="6 8"
                        animate={{ strokeDashoffset: [14, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="group-hover:stroke-white transition-colors duration-500"
                      />
                      <motion.path 
                        d="M 0 110 L 100 110" fill="none" stroke="#25D366" strokeWidth="2"
                        strokeDasharray="6 8"
                        animate={{ strokeDashoffset: [14, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="group-hover:stroke-white transition-colors duration-500 opacity-60 group-hover:opacity-100"
                      />
                      <motion.path 
                        d="M 0 172 C 50 172, 50 110, 100 110" fill="none" stroke="#25D366" strokeWidth="2"
                        strokeDasharray="6 8"
                        animate={{ strokeDashoffset: [14, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="group-hover:stroke-white transition-colors duration-500 opacity-30 group-hover:opacity-100"
                      />
                   </svg>
                   <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 1.4, type: "spring" }}
                     className="w-[48px] h-[48px] bg-[#25D366] rounded-[12px] shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] group-hover:rotate-12 transition-all duration-500"
                   >
                     <div className="w-[16px] h-[16px] bg-[#1a1a1a] rounded-[4px] group-hover:scale-50 transition-transform duration-500"></div>
                     {/* Pulse ring for the central node */}
                     <motion.div 
                       animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                       transition={{ repeat: Infinity, duration: 2 }}
                       className="absolute inset-0 rounded-[12px] border border-white/50 pointer-events-none"
                     />
                   </motion.div>
                </div>
              </div>
              
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-['Poppins'] font-normal text-[24px] text-white leading-[31.2px] m-0">
                  Workflow Automation
                </h3>
                <p className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] m-0 max-w-[80%]">
                  Streamline repetitive tasks with AI-driven workflows that save time and boost efficiency.
                </p>
              </div>
            </motion.div>

            {/* Card 5: Custom AI */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, borderColor: "rgba(37,211,102,0.4)", boxShadow: "0 20px 40px -20px rgba(37,211,102,0.15)" }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="bg-[#141414] rounded-[20px] border border-[#1e1e1e] p-[24px] flex flex-col justify-between overflow-hidden relative group cursor-pointer"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#25D366] blur-[100px] opacity-10 rounded-full pointer-events-none group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" />
              
              <div className="h-[220px] relative flex items-center justify-center mb-[20px]">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-[48px] h-[48px] bg-[#25D366] rounded-[12px] shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center relative z-20 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] group-hover:-rotate-3 transition-all duration-500"
                >
                   <div className="w-[16px] h-[16px] bg-[#1a1a1a] rounded-[4px] group-hover:scale-75 transition-transform duration-500"></div>
                </motion.div>
                
                {/* Orbiting System */}
                <div 
                  className="absolute w-[180px] h-[180px] rounded-full group-hover:scale-105 transition-transform duration-700 z-10"
                  style={{ animation: 'spin 20s linear infinite' }}
                >
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#262626] group-hover:border-[#32cd87]/40 transition-colors duration-700" />
                  
                  {[
                    { icon: Layers, angle: 0 },
                    { icon: MessageSquare, angle: 60 },
                    { icon: Database, angle: 120 },
                    { icon: RefreshCw, angle: 180 },
                    { icon: Mail, angle: 240 },
                    { icon: ZoomIn, angle: 300 }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="absolute top-1/2 left-1/2 w-[32px] h-[32px] -ml-[16px] -mt-[16px]"
                      style={{ transform: `rotate(${item.angle}deg) translateY(-90px)` }}
                    >
                      {/* Counter rotation wrapper to keep icons upright */}
                      <div 
                         className="w-full h-full"
                         style={{ animation: 'spin 20s linear infinite reverse' }}
                      >
                        <motion.div 
                          initial={{ scale: 0, opacity: 0, rotate: -item.angle }}
                          whileInView={{ scale: 1, opacity: 1, rotate: -item.angle }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                          className="w-full h-full bg-[#1a1a1a] border border-[#262626] rounded-full flex items-center justify-center group-hover:scale-125 group-hover:border-[#32cd87]/50 group-hover:bg-[#1a2f22] group-hover:shadow-[0_0_15px_rgba(37,211,102,0.2)] transition-all duration-500"
                        >
                          <item.icon size={14} className="text-white group-hover:text-[#32cd87] transition-colors duration-500" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[12px] relative z-10">
                <h3 className="font-['Poppins'] font-normal text-[24px] text-white leading-[31.2px] m-0">
                  Custom AI Integrations
                </h3>
                <p className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] m-0">
                  Seamlessly connect AI tools with your existing software—no technical setup required.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
