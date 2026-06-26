import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, LogOut, Settings, CreditCard, User } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const publicNavConfig: (
  | { label: string; type: "link"; href: string }
  | { label: string; type: "dropdown"; links: { label: string; href: string }[] }
)[] = [
  {
    label: "Products",
    type: "dropdown",
    links: [
      { label: "Instagram Automation", href: "/product/instagram" },
      { label: "WhatsApp Automation", href: "/product/whatsapp" },
      { label: "Messenger Automation", href: "/product/messenger" },
      { label: "TikTok Automation", href: "/product/tiktok" },
      { label: "AI Engine", href: "/product/ai" },
    ],
  },
  {
    label: "Solutions",
    type: "dropdown",
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
    label: "Resources",
    type: "dropdown",
    links: [
      { label: "How It Works", href: "/#Howitworks" },
      { label: "Help Center", href: "https://help.automateNGB.com" },
      { label: "Community", href: "https://community.automateNG.com/" },
    ],
  },
  { label: "Pricing", type: "link", href: "/pricing" },
  { label: "About", type: "link", href: "/about-us" },
];

const loggedInNavConfig = [
  { label: "Dashboard", type: "link" as const, href: "/dashboard" },
  { label: "Billing", type: "link" as const, href: "/dashboard/billing" },
];

function NavDropdown({
  label,
  items,
  groups,
  close,
}: {
  label: string;
  items?: { label: string; href: string }[];
  groups?: { group: string; links: { label: string; href: string }[] }[];
  close: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const go = (href: string) => {
    close();
    setOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }
    if (href.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        document.querySelector(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 min-w-[200px]"
          >
            {items?.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.href)}
                className="w-full text-left px-4 py-2.5 text-sm text-[#4b5563] hover:text-[#37b24d] hover:bg-[#f0fdf4] rounded-xl transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            {groups?.map((g) => (
              <div key={g.group}>
                <div className="px-4 pt-3 pb-1 text-[10px] text-[#9ca3af] uppercase tracking-widest font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {g.group}
                </div>
                {g.links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => go(link.href)}
                    className="w-full text-left px-4 py-2 text-sm text-[#4b5563] hover:text-[#37b24d] hover:bg-[#f0fdf4] rounded-xl transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileDropdown({ close }: { close: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, logout, business } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleLogout = () => {
    logout();
    close();
    setOpen(false);
    navigate("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="w-7 h-7 rounded-full bg-[#37b24d]/10 flex items-center justify-center">
          <User size={14} className="text-[#37b24d]" />
        </div>
        <span className="hidden sm:inline">{user?.name || user?.email?.split("@")[0]}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 min-w-[200px]"
          >
            <div className="px-4 py-2 border-b border-gray-100 mb-1">
              <p className="text-sm font-medium text-[#1a1a2e] truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{user?.email}</p>
              {business && <p className="text-xs text-[#9ca3af] truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{business.name}</p>}
            </div>
            <button
              onClick={() => { navigate("/dashboard"); close(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-[#4b5563] hover:text-[#37b24d] hover:bg-[#f0fdf4] rounded-xl transition-all flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Settings size={14} /> Dashboard
            </button>
            <button
              onClick={() => { navigate("/dashboard/billing"); close(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-[#4b5563] hover:text-[#37b24d] hover:bg-[#f0fdf4] rounded-xl transition-all flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <CreditCard size={14} /> Billing
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2 mt-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <LogOut size={14} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        document.querySelector(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLoggedIn = !!user;
  const navItems = isLoggedIn ? loggedInNavConfig : publicNavConfig;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-2xl border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 flex items-center justify-between h-[64px]">
        <button onClick={() => go("/")} className="flex items-center gap-2.5">
          <div className="w-[32px] h-[32px] rounded-[10px] bg-[#37b24d] flex items-center justify-center">
            <svg width="14" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M0 1.5H12V7.5H6L0 1.5ZM0 7.5H6L12 13.5H6V19.5L0 13.5V7.5Z" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.55rem",
              color: "#1a1a2e",
              letterSpacing: "-0.02em",
            }}
          >
            Automate<span className="text-[#37b24d]">NG</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.type === "link" ? (
              <button
                key={item.label}
                onClick={() => go(item.href!)}
                className="text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </button>
            ) : (
              <NavDropdown
                key={item.label}
                label={item.label}
                items={"links" in item && !("groups" in item) ? item.links : undefined}
                groups={"groups" in item ? item.groups : undefined}
                close={() => setOpen(false)}
              />
            )
          )}

          {isLoggedIn ? (
            <ProfileDropdown close={() => setOpen(false)} />
          ) : (
            <>
              <button
                onClick={() => go("/signIn")}
                className="text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sign In
              </button>
              <Link
                to="/signin?redirect=/onboarding"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 bg-[#37b24d] text-white px-5 py-[10px] rounded-[14px] text-sm font-semibold relative"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="absolute inset-0 rounded-[14px] border-t border-[#69db7c] pointer-events-none" />
                Get Started
              </Link>
            </>
          )}
        </nav>

        <button className="md:hidden text-[#1a1a2e]" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/98 backdrop-blur-2xl border-t border-gray-200"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {isLoggedIn && user && (
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#37b24d]/10 flex items-center justify-center">
                    <User size={16} className="text-[#37b24d]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a1a2e]" style={{ fontFamily: "'Inter', sans-serif" }}>{user.name || user.email}</p>
                  </div>
                </div>
              )}

              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.label}>
                    <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.label}
                    </p>
                    <div className="flex flex-col gap-1 ml-2 mb-3">
                      {item.links.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => go(link.href)}
                          className="text-left text-[#4b5563] text-sm hover:text-[#37b24d] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => go(item.href!)}
                    className="text-left text-[#1a1a2e] font-semibold text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </button>
                )
              )}

              {isLoggedIn ? (
                <button
                  onClick={() => { logout(); setOpen(false); navigate("/"); }}
                  className="text-left text-sm text-red-500 font-semibold mt-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/auth?redirect=/onboarding"
                  className="flex items-center justify-center gap-2 bg-[#37b24d] text-white py-3 rounded-[14px] font-semibold mt-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Get Started
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
