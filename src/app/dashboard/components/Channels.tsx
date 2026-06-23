import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Loader2, Link2, CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { api, ChannelConnection } from "../../../lib/api";

const channelMeta: Record<string, { name: string; color: string; bg: string }> = {
  whatsapp: { name: "WhatsApp", color: "#25D366", bg: "#f0fdf4" },
  instagram: { name: "Instagram", color: "#E4405F", bg: "#fdf2f4" },
  facebook: { name: "Facebook Messenger", color: "#0084FF", bg: "#f0f7ff" },
  telegram: { name: "Telegram", color: "#26A5E4", bg: "#f0f9ff" },
};

export function Channels() {
  const [channels, setChannels] = useState<ChannelConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectModal, setConnectModal] = useState<string | null>(null);
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    api.get<ChannelConnection[]>("/channels/")
      .then(setChannels)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openConnectModal = (channelType: string) => {
    setConnectModal(channelType);
    setPhoneNumberId("");
    setAccessToken("");
  };

  const connect = async () => {
    if (!connectModal) return;
    setConnecting(true);
    try {
      const payload: Record<string, unknown> = { channel: connectModal };
      if (phoneNumberId.trim()) payload.phone_number_id = phoneNumberId.trim();
      if (accessToken.trim()) payload.access_token = accessToken.trim();
      const result = await api.post<ChannelConnection>("/channels/", payload);
      setChannels((prev) => {
        const idx = prev.findIndex((c) => c.channel === result.channel);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = result;
          return next;
        }
        return [...prev, result];
      });
      setConnectModal(null);
    } catch {
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async (id: number) => {
    try {
      await api.delete(`/channels/${id}/`);
      setChannels((prev) => prev.filter((c) => c.id !== id));
    } catch {
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#37b24d]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Channels</h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Connect and manage your messaging channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(channelMeta).map(([key, meta]) => {
          const conn = channels.find((c) => c.channel === key);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: meta.bg }}>
                  <Link2 size={18} style={{ color: meta.color }} />
                </div>
                <div>
                  <h3 className="text-[#1a1a2e] font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{meta.name}</h3>
                  {conn?.is_connected ? (
                    <span className="text-[#37b24d] text-xs flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <CheckCircle size={12} /> Connected
                    </span>
                  ) : (
                    <span className="text-[#9ca3af] text-xs flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <XCircle size={12} /> Not connected
                    </span>
                  )}
                </div>
              </div>

              {conn?.is_connected ? (
                <button
                  onClick={() => disconnect(conn.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <XCircle size={16} /> Disconnect
                </button>
              ) : (
                <button
                  onClick={() => openConnectModal(key)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm bg-[#37b24d] text-white font-semibold hover:bg-[#2d9a3e] transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Link2 size={16} /> Connect
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {channels.length === 0 && (
        <div className="text-center py-16 mt-6">
          <AlertCircle size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-[#9ca3af] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>No channels connected yet</p>
          <p className="text-[#9ca3af] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Connect a channel above to start receiving messages.</p>
        </div>
      )}

      {/* Connect Modal - Credential Input */}
      {connectModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => !connecting && setConnectModal(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#1a1a2e] font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                Connect {channelMeta[connectModal]?.name || connectModal}
              </h2>
              <button onClick={() => setConnectModal(null)} className="text-[#9ca3af] hover:text-[#1a1a2e]">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#6b7280] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Enter your {channelMeta[connectModal]?.name || connectModal} API credentials to connect this channel.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#6b7280] font-medium mb-1 block" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Phone Number ID
                </label>
                <input
                  type="text"
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  placeholder="e.g. 123456789012345"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label className="text-xs text-[#6b7280] font-medium mb-1 block" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Access Token
                </label>
                <input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Paste your permanent access token"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setConnectModal(null)}
                disabled={connecting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-gray-100 text-[#6b7280] disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </button>
              <motion.button
                onClick={connect}
                disabled={connecting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#37b24d] text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {connecting ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
                {connecting ? "Connecting..." : "Connect"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
