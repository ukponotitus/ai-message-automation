import { motion } from "motion/react";

const spheres = "/img/pheres.png";

const sections = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Data we collect",
    body: "We collect phone numbers and message content sent to our WhatsApp Business number solely for the purpose of delivering automated customer support and AI-powered responses.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "How we use your data",
    body: "Messages are processed by an AI system to generate contextual, accurate replies. We do not sell, rent, or share your personal data with any third parties under any circumstances.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Data retention",
    body: "Conversation data is retained only for as long as necessary to provide our service and improve response quality. You may request deletion of your data at any time by contacting us.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Your rights",
    body: "You have the right to access, correct, or delete any personal information we hold about you. To exercise these rights, reach out to us via email or WhatsApp and we will respond within 48 hours.",
  },
];

const contactItems = [
  {
    label: "Email",
    value: "automatenig@gmail.com",
    href: "mailto:automatenig@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+234 812 167 6394",
    href: "https://wa.me/2348121676394",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Ikot Ekpene, Akwa Ibom, Nigeria",
    href: null,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Privacy() {
  return (
    <section
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-black px-5 pt-[120px] pb-24"
    >
      {/* Sphere decorations */}
      <div className="absolute inset-0 overflow-clip pointer-events-none">
        <div
          className="absolute blur-[5px] opacity-40"
          style={{ width: 400, height: 400, right: -160, top: -120 }}
        >
          <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div
          className="absolute opacity-25"
          style={{ width: 300, height: 300, left: -120, bottom: 80 }}
        >
          <img src={spheres} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-[760px] w-full mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-3 bg-[#141414] border border-[#1e1e1e] rounded-[24px] px-4 py-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span
            className="text-[#a5a5a5]"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.85rem" }}
          >
            Legal · Last updated May 2026
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-white mb-3 leading-none"
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Privacy{" "}
          <span style={{ color: "#25D366" }}>Policy</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-[#a5a5a5] mb-12 max-w-[520px]"
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.7,
          }}
        >
          We are committed to protecting your personal information and being transparent about how we use it when you interact with our WhatsApp AI service.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-[#1e1e1e] mb-12"
        />

        {/* Policy sections */}
        <div className="flex flex-col gap-4">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.09, duration: 0.55 }}
              whileHover={{ borderColor: "rgba(37,211,102,0.3)" }}
              className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-[20px] p-6 flex gap-5 transition-colors duration-200"
            >
              {/* Icon bubble */}
              <div className="flex-shrink-0 w-10 h-10 rounded-[12px] bg-[#141414] border border-[#1e1e1e] flex items-center justify-center mt-0.5">
                {s.icon}
              </div>

              <div>
                <h2
                  className="text-white mb-2"
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 500,
                    fontSize: "1.05rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-[#a5a5a5] leading-[1.7]"
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="h-px bg-[#1e1e1e] my-12"
        />

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.55 }}
          className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-[24px] p-8"
        >
          <h2
            className="text-white mb-1"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 500,
              fontSize: "1.25rem",
              letterSpacing: "-0.04em",
            }}
          >
            Contact us
          </h2>
          <p
            className="text-[#a5a5a5] mb-6"
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.85rem" }}
          >
            Have a privacy concern? We're here to help.
          </p>

          <div className="flex flex-col gap-3">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.07 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-[10px] bg-[#141414] border border-[#1e1e1e] flex items-center justify-center text-[#25D366] flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-3">
                  <span
                    className="text-[#555]"
                    style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.78rem", minWidth: 64 }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#25D366] transition-colors duration-150"
                      style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.9rem" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      className="text-white"
                      style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.9rem" }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="https://wa.me/2348121676394"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="relative mt-8 inline-flex items-center gap-2 px-5 py-[14px] rounded-[14px] text-white"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              background: "#245f37",
              boxShadow: "0px 20px 17.5px #17230f",
            }}
          >
            <span className="absolute inset-0 rounded-[14px] border-t border-[#037c46] pointer-events-none" />
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Message us on WhatsApp
          </motion.a>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-center text-[#3a3a3a] mt-10"
          style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: "0.78rem" }}
        >
          © {new Date().getFullYear()} AutomateNig · Ikot Ekpene, Akwa Ibom, Nigeria
        </motion.p>
      </div>
    </section>
  );
}