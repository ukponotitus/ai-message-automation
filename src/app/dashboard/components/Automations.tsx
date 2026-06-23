import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Zap, ToggleLeft, ToggleRight, Loader2, Trash2, Link2, X } from "lucide-react";
import { api, AutomationFlow, ChannelConnection } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export function Automations() {
  const [flows, setFlows] = useState<AutomationFlow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState<AutomationFlow["trigger"]>("new_message");
  const [channelModal, setChannelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<AutomationFlow[]>("/automations/")
      .then(setFlows)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleNewClick = async () => {
    try {
      const channels = await api.get<ChannelConnection[]>("/channels/");
      if (channels.filter((c) => c.is_connected).length === 0) {
        setChannelModal(true);
      } else {
        setShowForm(true);
      }
    } catch {
      setShowForm(true);
    }
  };

  const create = async () => {
    if (!name.trim()) return;
    try {
      const created = await api.post<AutomationFlow>("/automations/", { name, trigger });
      setFlows((prev) => [...prev, created]);
      setName("");
      setTrigger("new_message");
      setShowForm(false);
    } catch {
    }
  };

  const toggleActive = async (flow: AutomationFlow) => {
    try {
      const updated = await api.patch<AutomationFlow>(`/automations/${flow.id}/`, { is_active: !flow.is_active });
      setFlows((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    } catch {
    }
  };

  const remove = async (id: number) => {
    try {
      await api.delete(`/automations/${id}/`);
      setFlows((prev) => prev.filter((f) => f.id !== id));
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Automations</h1>
          <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Create and manage AI-powered automation flows.
          </p>
        </div>
        <motion.button
          onClick={handleNewClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-[#37b24d] text-white px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <Plus size={16} /> New Automation
        </motion.button>
      </div>

      {/* Channel Required Modal */}
      {channelModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setChannelModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#1a1a2e] font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>No Channels Connected</h2>
              <button onClick={() => setChannelModal(false)} className="text-[#9ca3af] hover:text-[#1a1a2e]">
                <X size={18} />
              </button>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4">
              <Link2 size={20} className="text-yellow-600" />
            </div>
            <p className="text-sm text-[#6b7280] text-center mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              You need to connect at least one channel (e.g. WhatsApp) before creating automations.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setChannelModal(false); navigate("/dashboard/channels"); }}
                className="flex-1 bg-[#37b24d] text-white py-2.5 rounded-xl text-sm font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Connect Channel
              </button>
              <button
                onClick={() => setChannelModal(false)}
                className="px-4 py-2.5 rounded-xl text-sm bg-gray-100 text-[#6b7280]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
        >
          <h2 className="text-[#1a1a2e] font-semibold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Create Automation</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Automation name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value as AutomationFlow["trigger"])}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <option value="new_message">New Message</option>
              <option value="keyword">Keyword Match</option>
              <option value="ad_click">Ad Click</option>
              <option value="webhook">Webhook</option>
              <option value="schedule">Schedule</option>
            </select>
            <div className="flex gap-2">
              <motion.button
                onClick={create}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#37b24d] text-white px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Create
              </motion.button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-[#6b7280]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {flows.length === 0 ? (
        <div className="text-center py-20">
          <Zap size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-[#9ca3af] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>No automations yet</p>
          <p className="text-[#9ca3af] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Create your first automation to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {flows.map((flow) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
                  <Zap size={16} className="text-[#37b24d]" />
                </div>
                <div>
                  <p className="text-[#1a1a2e] text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{flow.name}</p>
                  <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Trigger: {flow.trigger} · {flow.steps?.length || 0} steps
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(flow)}
                  className="text-[#9ca3af] hover:text-[#37b24d] transition-colors"
                >
                  {flow.is_active ? <ToggleRight size={20} className="text-[#37b24d]" /> : <ToggleLeft size={20} />}
                </button>
                <button
                  onClick={() => remove(flow.id)}
                  className="text-[#9ca3af] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
