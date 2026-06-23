import { Youtube, Facebook, Linkedin, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Instagram", href: "/product/instagram" },
      { label: "WhatsApp", href: "/product/whatsapp" },
      { label: "Messenger", href: "/product/messenger" },
      { label: "TikTok", href: "/product/tiktok" },
      { label: "AI Engine", href: "/product/ai" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "For Creators", href: "/solutions/creators" },
      { label: "For eCommerce", href: "/solutions/ecommerce" },
      { label: "For Agencies", href: "/solutions/agencies" },
      { label: "Lead Generation", href: "/solutions/lead-gen" },
      { label: "Customer Support", href: "/solutions/support" },
      { label: "Broadcasts", href: "/solutions/broadcasts" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "How It Works", href: "/#Howitworks" },
      { label: "Help Center", href: "https://help.automateNGB.com" },
      { label: "Community", href: "https://community.automateNG.com/" },
    ],
  },
];

export function Footer() {
  const navigate = useNavigate();

  const go = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }
    if (href.startsWith("/#")) {
      const id = href.substring(2);
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => go("/")} className="flex items-center gap-2.5 mb-4">
              <div className="w-[32px] h-[32px] rounded-[10px] bg-[#37b24d] flex items-center justify-center">
                <svg width="14" height="20" viewBox="0 0 12 20" fill="none">
                  <path d="M0 1.5H12V7.5H6L0 1.5ZM0 7.5H6L12 13.5H6V19.5L0 13.5V7.5Z" fill="white" />
                </svg>
              </div>
              <span className="font-['Syne'] font-bold text-xl text-[#1a1a2e] tracking-[-0.02em]">
                Automate<span className="text-[#37b24d]">NG</span>
              </span>
            </button>
            <p className="text-[#4b5563] text-sm leading-relaxed max-w-[240px]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Powering Nigerian businesses with AI-driven WhatsApp automation.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[#1a1a2e] text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => go(link.href)}
                      className="text-[#4b5563] text-sm hover:text-[#37b24d] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9ca3af] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            &copy; 2026 AutomateNG. All rights reserved. Made by Titus Ukpono.
          </p>

          <div className="flex gap-4">
            <a href="https://www.youtube.com/@UkponoTitus-ze5du" target="_blank" rel="noopener noreferrer">
              <Youtube size={20} className="text-[#9ca3af] hover:text-[#37b24d] transition-colors" />
            </a>
            <a href="https://www.facebook.com/titusukpono0/" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} className="text-[#9ca3af] hover:text-[#37b24d] transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/ukpono-titus-72810b346/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} className="text-[#9ca3af] hover:text-[#37b24d] transition-colors" />
            </a>
            <a href="https://www.instagram.com/ukscode/" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} className="text-[#9ca3af] hover:text-[#37b24d] transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
