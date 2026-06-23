import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../lib/api";
import { Copy, Check, ExternalLink, ShieldCheck, Key, Phone, CreditCard, ArrowUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const { business, setBusiness, subscription } = useAuth();
  const navigate = useNavigate();
  
  // Local states for the form
  const [name, setName] = useState(business?.name || "");
  const [waId, setWaId] = useState(business?.whatsapp_phone_number_id || "");
  const [waToken, setWaToken] = useState(""); // We keep the token empty for security
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Re-sync name/ID if the business context updates
  useEffect(() => {
    if (business) {
        setName(business.name);
        setWaId(business.whatsapp_phone_number_id || "");
    }
  }, [business]);

  const saveWorkspace = async () => {
    if (!business || !name.trim()) return;
    setSaving(true);
    setMessage("");
    try {
      const payload: any = { 
        name, 
        whatsapp_phone_number_id: waId 
      };
      
      // Only include the token if the user actually typed a new one
      if (waToken.trim()) {
        payload.whatsapp_access_token = waToken;
      }

      const updated = await api.patch<typeof business>(`/business/${business.id}/`, payload);
      setBusiness(updated);
      setMessage("Settings updated successfully.");
      setWaToken(""); // Clear the token field after saving
    } catch (err) {
      setMessage("Failed to update settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string, type: 'url' | 'token') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
    } else {
        setCopiedToken(true);
        setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  // Replace with your actual production backend URL when you deploy
  const webhookUrl = "https://ai-message-be-service.vercel.app/webhook/";
  const verifyToken = "titus_whatsapp_123";

  const labelClass = "text-[#6b7280] text-sm mb-1.5 block font-medium";
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors";

  return (
    <div className="max-w-3xl pb-20">
      <div className="mb-8">
        <h1 className="text-[#1a1a2e] text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Settings</h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Configure your business profile and connect your WhatsApp channel.
        </p>
      </div>

      <div className="grid gap-6">
        
        {/* Workspace Profile */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-[#1a1a2e] font-semibold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
             Workspace Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Workspace Slug (Read-only)</label>
              <input
                type="text"
                value={business?.slug || ""}
                disabled
                className={`${inputClass} bg-gray-100 text-gray-400 cursor-not-allowed`}
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Credentials */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm border-l-4 border-l-[#37b24d]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#1a1a2e] font-semibold flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
               <Phone size={18} className="text-[#37b24d]"/> WhatsApp API Credentials
            </h2>
            <a 
                href="https://developers.facebook.com/apps/" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-[#37b24d] flex items-center gap-1 hover:underline"
            >
                Meta Developer Console <ExternalLink size={12}/>
            </a>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>WhatsApp Phone Number ID</label>
              <input
                type="text"
                value={waId}
                onChange={(e) => setWaId(e.target.value)}
                placeholder="e.g. 1074917665712364"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Permanent Access Token</label>
              <div className="relative">
                <input
                    type="password"
                    value={waToken}
                    onChange={(e) => setWaToken(e.target.value)}
                    placeholder={business?.whatsapp_access_token ? "••••••••••••••••••••••••••••••" : "Paste your token here"}
                    className={inputClass}
                />
                <Key size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Go to Meta Business Settings {`>`} Users {`>`} System Users to generate a <b>Permanent Token</b>.
              </p>
            </div>
          </div>
        </div>

        {/* Billing & Subscription */}
        <div className={`bg-white border rounded-2xl p-6 shadow-sm border-l-4 ${subscription?.complimentary ? "border-l-purple-500 border-gray-200" : "border-l-[#37b24d] border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#1a1a2e] font-semibold flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <CreditCard size={18} className="text-[#37b24d]" /> Subscription & Billing
            </h2>
            {subscription?.complimentary ? (
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200" style={{ fontFamily: "'Inter', sans-serif" }}>
                Complimentary Access
              </span>
            ) : (
              <button
                onClick={() => navigate("/pricing")}
                className="text-xs text-[#37b24d] flex items-center gap-1 hover:underline font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <ArrowUp size={12} /> Upgrade Plan
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[#9ca3af] text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Current Plan</p>
              <p className="text-[#1a1a2e] font-bold capitalize" style={{ fontFamily: "'Syne', sans-serif" }}>
                {subscription?.plan || "Free"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[#9ca3af] text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Billing Cycle</p>
              <p className="text-[#1a1a2e] font-bold capitalize" style={{ fontFamily: "'Syne', sans-serif" }}>
                {subscription?.billing_cycle || "Monthly"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[#9ca3af] text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Contacts</p>
              <p className="text-[#1a1a2e] font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                {subscription ? `${subscription.usage.contacts.used} / ${subscription.usage.contacts.limit === 999999 ? "Unlimited" : subscription.usage.contacts.limit}` : "-"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[#9ca3af] text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Status</p>
              <p className={`font-bold flex items-center gap-1.5 ${subscription?.is_active ? "text-[#37b24d]" : "text-red-500"}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                <span className={`w-2 h-2 rounded-full ${subscription?.is_active ? "bg-[#37b24d]" : "bg-red-500"}`} />
                {subscription?.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {subscription?.expires_at && !subscription?.complimentary && (
            <p className="text-[#9ca3af] text-xs mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              Expires: {new Date(subscription.expires_at).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-end gap-3">
            <motion.button
              onClick={saveWorkspace}
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#37b24d] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2d9a3e] transition-all disabled:opacity-50 shadow-md"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {saving ? "Saving Changes..." : "Save Configuration"}
            </motion.button>

            {message && (
              <p className={`text-sm font-medium ${message.includes("success") ? "text-[#37b24d]" : "text-red-500"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                {message}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}