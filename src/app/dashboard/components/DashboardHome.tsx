import { useAuth } from "../../../context/AuthContext";
import { motion } from "motion/react";
import { MessageSquare, Users, Bot, Activity } from "lucide-react";

export function DashboardHome() {
  const { business } = useAuth();

  const metrics = [
    { label: "Total Chats Handled", value: "1,234", icon: MessageSquare, change: "+12%", color: "#37b24d" },
    { label: "Active Contacts", value: "567", icon: Users, change: "+8%", color: "#3b82f6" },
    { label: "Bot Status", value: "Active", icon: Bot, change: "99.9% uptime", color: "#37b24d" },
    { label: "Avg Response Time", value: "<2s", icon: Activity, change: "-5%", color: "#f59e0b" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
          Welcome back{business ? `, ${business.name}` : ""}
        </h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}10` }}>
                <m.icon size={18} style={{ color: m.color }} />
              </div>
              <span className="text-xs text-[#37b24d]" style={{ fontFamily: "'Inter', sans-serif" }}>{m.change}</span>
            </div>
            <p className="text-2xl text-[#1a1a2e] font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{m.value}</p>
            <p className="text-[#6b7280] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-[#1a1a2e] font-semibold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="w-2 h-2 rounded-full bg-[#37b24d]" />
              <p className="text-[#6b7280] text-sm flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                New message from <span className="text-[#1a1a2e]">Customer #{1000 + i}</span>
              </p>
              <span className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{i}h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
