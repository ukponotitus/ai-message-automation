import { motion } from "motion/react";
import { MessageSquare, Users, Bot, Activity, BarChart3, TrendingUp } from "lucide-react";

export function Analytics() {
  const metrics = [
    { label: "Total Conversations", value: "2,847", icon: MessageSquare, change: "+18%", color: "#37b24d" },
    { label: "Active Contacts", value: "1,203", icon: Users, change: "+12%", color: "#3b82f6" },
    { label: "AI Reply Rate", value: "94%", icon: Bot, change: "+3%", color: "#8b5cf6" },
    { label: "Avg Response Time", value: "1.8s", icon: Activity, change: "-12%", color: "#f59e0b" },
  ];

  const channelHealth = [
    { channel: "WhatsApp", status: "Connected", messages: "1,892", health: 99 },
    { channel: "Instagram", status: "Connected", messages: "642", health: 97 },
    { channel: "Facebook", status: "Not Connected", messages: "0", health: 0 },
    { channel: "Telegram", status: "Connected", messages: "313", health: 100 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Analytics</h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Performance metrics and insights for your business.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-[#37b24d]" />
            <h2 className="text-[#1a1a2e] font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>Channel Health</h2>
          </div>
          <div className="space-y-3">
            {channelHealth.map((ch) => (
              <div key={ch.channel} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-[#1a1a2e] text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{ch.channel}</p>
                  <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{ch.messages} messages</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#37b24d]" style={{ width: `${ch.health}%` }} />
                  </div>
                  <span className={`text-xs font-medium ${
                    ch.status === "Connected" ? "text-[#37b24d]" : "text-[#9ca3af]"
                  }`} style={{ fontFamily: "'Inter', sans-serif" }}>
                    {ch.status === "Connected" ? `${ch.health}%` : ch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[#37b24d]" />
            <h2 className="text-[#1a1a2e] font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>Broadcast Performance</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: "March Newsletter", sent: "1,200", delivered: "1,150", rate: "95.8%" },
              { name: "Flash Sale", sent: "850", delivered: "820", rate: "96.5%" },
              { name: "Welcome Series", sent: "430", delivered: "425", rate: "98.8%" },
            ].map((b) => (
              <div key={b.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-[#1a1a2e] text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{b.name}</p>
                  <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Sent: {b.sent} · Delivered: {b.delivered}
                  </p>
                </div>
                <span className="text-[#37b24d] text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{b.rate}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
