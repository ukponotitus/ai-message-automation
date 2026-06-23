import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, BookOpen, MessageSquare, LogOut, Menu, ChevronLeft,
  Zap, Send, Users, BarChart3, Settings2, Link2, CreditCard,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const navItems = [
  { path: "/dashboard", label: "Home", icon: LayoutDashboard },
  { path: "/dashboard/inbox", label: "Inbox", icon: MessageSquare },
  { path: "/dashboard/automations", label: "Automations", icon: Zap },
  { path: "/dashboard/broadcasts", label: "Broadcasts", icon: Send },
  { path: "/dashboard/contacts", label: "Contacts", icon: Users },
  { path: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/dashboard/channels", label: "Channels", icon: Link2 },
  { path: "/dashboard/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { path: "/dashboard/connection-guide", label: "Connection Guide", icon: BookOpen }, // Add this
  { path: "/dashboard/settings", label: "Settings", icon: Settings2 },
];

export function DashboardSidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, subscription } = useAuth();

  const planBadge = subscription?.plan
    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)
    : "Free";

  const planBadgeColor = subscription?.complimentary ? "text-purple-600 border-purple-300 bg-purple-50" : "text-[#37b24d] border-[#37b24d]/20 bg-[#37b24d]/5";

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      <div className="flex items-center gap-2 px-4 h-16 border-b border-gray-200">
        <div className="w-7 h-7 rounded-lg bg-[#37b24d] flex items-center justify-center shrink-0">
          <svg width="10" height="14" viewBox="0 0 12 20" fill="none">
            <path d="M0 1.5H12V7.5H6L0 1.5ZM0 7.5H6L12 13.5H6V19.5L0 13.5V7.5Z" fill="white" />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-[#1a1a2e] font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
            Automate<span className="text-[#37b24d]">NG</span>
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-100">
          <button
            onClick={() => navigate(subscription?.complimentary ? "/dashboard/settings" : "/pricing")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${planBadgeColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <CreditCard size={14} />
            <span>{planBadge} Plan</span>
            {subscription?.complimentary ? (
              <span className="ml-auto text-[10px] font-semibold text-purple-600">Complimentary</span>
            ) : (
              <span className="ml-auto text-[10px] opacity-60">Upgrade</span>
            )}
          </button>
        </div>
      )}

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-[#37b24d]/10 text-[#37b24d]"
                  : "text-[#6b7280] hover:text-[#1a1a2e] hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: isActive ? 600 : 400 }}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="px-2 pb-4">
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6b7280] hover:text-red-500 hover:bg-red-50 transition-all"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:flex">
        <DashboardSidebar collapsed={sidebarCollapsed} />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="relative w-[260px] h-full">
              <DashboardSidebar collapsed={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-[#1a1a2e]"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex text-[#9ca3af] hover:text-[#1a1a2e] transition-colors"
            >
              <ChevronLeft size={18} className={`transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
