import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft, Building2, MessageSquare, Brain, ArrowRight, Loader2 } from "lucide-react";
import { ChannelSelector } from "./ChannelSelector";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const bgGreen = "#37b24d";

const steps = [
  { id: 1, label: "Business Profile", icon: Building2 },
  { id: 2, label: "Channels", icon: MessageSquare },
  { id: 3, label: "The Brain", icon: Brain },
];

export function OnboardingStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [whatsappPhoneNumberId, setWhatsappPhoneNumberId] = useState("");
  const [whatsappAccessToken, setWhatsappAccessToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{phoneId?: string; token?: string}>({});
  const [faqs, setFaqs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshBusinesses } = useAuth();

  const validateWhatsAppFields = () => {
    if (!selectedChannels.includes("whatsapp")) return { valid: true };
    const errors: {phoneId?: string; token?: string} = {};
    if (!whatsappPhoneNumberId.trim()) {
      errors.phoneId = "Phone Number ID is required when WhatsApp is selected";
    } else if (!/^\d+$/.test(whatsappPhoneNumberId.trim())) {
      errors.phoneId = "Phone Number ID must be numeric (digits only)";
    }
    if (!whatsappAccessToken.trim()) {
      errors.token = "Access Token is required when WhatsApp is selected";
    } else if (whatsappAccessToken.trim().length < 20) {
      errors.token = "Access Token looks too short";
    }
    setFieldErrors(errors);
    return { valid: Object.keys(errors).length === 0, errors };
  };

  const canProceed = () => {
    if (currentStep === 1) return businessName.trim().length > 0 && industry.trim().length > 0;
    if (currentStep === 2) {
      const hasChannels = selectedChannels.length > 0;
      if (!selectedChannels.includes("whatsapp")) return hasChannels;
      const hasWhatsAppCreds = whatsappPhoneNumberId.trim().length > 0 && whatsappAccessToken.trim().length > 0;
      return hasChannels && hasWhatsAppCreds;
    }
    if (currentStep === 3) return faqs.trim().length > 0;
    return false;
  };

  const handleChannelChange = (channels: string[]) => {
    setSelectedChannels(channels);
    setFieldErrors({});
  };

  const handleStep2Next = () => {
    const { valid } = validateWhatsAppFields();
    if (valid) {
      setFieldErrors({});
      setCurrentStep((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    setError("");
    try {
      const faqList = faqs
        .split("\n")
        .filter((l) => l.includes("?"))
        .map((l) => l.trim());

      const business = await api.post<{ id: number }>("/business/", {
        name: businessName,
        industry,
        channels: selectedChannels,
        whatsapp_phone_number_id: whatsappPhoneNumberId || undefined,
        whatsapp_access_token: whatsappAccessToken || undefined,
      });

      for (const faq of faqList) {
        await api.post(`/business/${business.id}/company-info/`, {
          question: faq,
          answer: "",
        });
      }

      await refreshBusinesses();
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] text-sm outline-none focus:border-[#37b24d] transition-colors";
  const labelClass = "text-[#6b7280] text-sm mb-1.5 block";

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step.id < currentStep
                    ? "bg-[#37b24d] text-white"
                    : step.id === currentStep
                    ? "bg-[#37b24d] text-white ring-2 ring-[#37b24d]/30"
                    : "bg-gray-200 text-[#9ca3af]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {step.id < currentStep ? <Check size={14} /> : <step.icon size={14} />}
              </div>
              <span
                className={`text-xs hidden sm:block ${
                  step.id <= currentStep ? "text-[#1a1a2e]" : "text-[#9ca3af]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  step.id < currentStep ? "bg-[#37b24d]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-gray-200 rounded-2xl p-6"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              {error}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-[#1a1a2e] text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Business Profile</h2>
                <p className="text-[#6b7280] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Tell us about your business</p>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Inter', sans-serif" }}>Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. My Shop NG"
                  className={inputClass}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Inter', sans-serif" }}>Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <option value="">Select industry</option>
                  <option value="retail">Retail / E-commerce</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="automation">AI Automation</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="realestate">Real Estate</option>
                  <option value="tech">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-[#1a1a2e] text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Choose Your Channels</h2>
                <p className="text-[#6b7280] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Select the channels you want to connect</p>
              </div>
              <ChannelSelector
                selected={selectedChannels}
                onChange={handleChannelChange}
              />
              {selectedChannels.includes("whatsapp") && (
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <p className="text-xs text-[#6b7280] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>WhatsApp Credentials</p>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Inter', sans-serif" }}>Phone Number ID</label>
                    <input
                      type="text"
                      value={whatsappPhoneNumberId}
                      onChange={(e) => { setWhatsappPhoneNumberId(e.target.value); setFieldErrors((p) => ({...p, phoneId: undefined})); }}
                      placeholder="e.g. 123456789012345"
                      className={inputClass}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {fieldErrors.phoneId && <p className="text-red-500 text-xs mt-1">{fieldErrors.phoneId}</p>}
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Inter', sans-serif" }}>Access Token</label>
                    <input
                      type="password"
                      value={whatsappAccessToken}
                      onChange={(e) => { setWhatsappAccessToken(e.target.value); setFieldErrors((p) => ({...p, token: undefined})); }}
                      placeholder="Paste your Meta WhatsApp token"
                      className={inputClass}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {fieldErrors.token && <p className="text-red-500 text-xs mt-1">{fieldErrors.token}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-[#1a1a2e] text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Prime Your AI Agent</h2>
                <p className="text-[#6b7280] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Paste your first 5 FAQs to train your AI immediately</p>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Inter', sans-serif" }}>Frequently Asked Questions</label>
                <textarea
                  value={faqs}
                  onChange={(e) => setFaqs(e.target.value)}
                  placeholder={`What are your business hours?\nDo you deliver to Lagos?\nWhat payment methods do you accept?\nHow long does shipping take?\nCan I return an item?`}
                  rows={8}
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <p className="text-[#9ca3af] text-xs mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  One question per line. Add a ? at the end of each.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6">
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
            currentStep === 1 ? "invisible" : "bg-gray-100 text-[#1a1a2e] border border-gray-200"
          }`}
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {currentStep < 3 ? (
          <motion.button
            onClick={currentStep === 2 ? handleStep2Next : handleNext}
            disabled={!canProceed()}
            whileHover={{ scale: canProceed() ? 1.03 : 1 }}
            whileTap={{ scale: canProceed() ? 0.97 : 1 }}
            className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm bg-[#37b24d] text-white font-semibold disabled:opacity-30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Continue
            <ArrowRight size={16} />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleFinish}
            disabled={!canProceed() || loading}
            whileHover={{ scale: canProceed() ? 1.03 : 1 }}
            whileTap={{ scale: canProceed() ? 0.97 : 1 }}
            className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm bg-[#37b24d] text-white font-semibold disabled:opacity-30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Complete Setup
                <Check size={16} />
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
