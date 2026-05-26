import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "How it works", href: "#Howitworks" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "#contact" },
  ];

  const go = (href: string) => {
    setOpen(false);

    // full-page route (starts with "/" but not a hash)
    if (href.startsWith("/") && !href.startsWith("/#")) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // hash anchor
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(
        () => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }),
        120
      );
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.9)] backdrop-blur-2xl border-b border-[#1a1a1a]"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 flex items-center justify-between h-[64px]">
        {/* Logo */}
        <button onClick={() => go("/")} className="flex items-center gap-2.5">
          <div className="w-[32px] h-[32px] rounded-[10px] bg-[#25D366] flex items-center justify-center">
            <svg width="14" height="20" viewBox="0 0 12 20" fill="none">
              <path
                d="M0 1.5H12V7.5H6L0 1.5ZM0 7.5H6L12 13.5H6V19.5L0 13.5V7.5Z"
                fill="black"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 600,
              fontSize: "1.55rem",
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Automate<span className="text-[#25D366]">NG</span>
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.href)}
              className="text-[#a5a5a5] hover:text-white text-sm transition-colors"
              style={{
                fontFamily: "'Poppins',sans-serif",
                color:
                  location.pathname === l.href ? "#25D366" : undefined,
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <motion.a
          href="https://wa.me/2348121676394"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden md:flex items-center gap-2 bg-[#25D366] text-black px-5 py-[10px] rounded-[14px] text-sm relative"
          style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600 }}
        >
          <span className="absolute inset-0 rounded-[14px] border-t border-[#4fff8a] pointer-events-none" />
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="black"
            />
          </svg>
          WhatsApp us
        </motion.a>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[rgba(10,10,10,0.98)] backdrop-blur-2xl border-t border-[#1a1a1a]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className="text-left transition-colors"
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    color: location.pathname === l.href ? "#25D366" : "#a5a5a5",
                  }}
                >
                  {l.label}
                </button>
              ))}
              <a
                href="https://wa.me/2348121676394"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-black py-3 rounded-[14px]"
                style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600 }}
              >
                WhatsApp us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}