import { useState } from "react";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { billingService } from "../../services/billing";

interface Plan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  monthlyLabel: string;
  annualLabel: string;
  contacts: string;
  contactsLabel: string;
  tag?: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
  channels: number;
  channelList: string[];
  users: number;
  ai?: boolean;
  automateNGBranding?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    monthlyPrice: "$0",
    annualPrice: "$0",
    monthlyLabel: "",
    annualLabel: "",
    contacts: "20",
    contactsLabel: "Active Contacts per month",
    desc: "Explore basic automation for free",
    features: [
      "Connect any 1 channels",
      "Basic automations (up to 2 active automations)",
      "1 user",
      "Basic unified Inbox",
      "Self-serve Support",
    ],
    cta: "Start for free",
    highlight: false,
    channels: 1,
    channelList: ["instagram", "tiktok", "messenger", "telegram"],
    users: 1,
    automateNGBranding: true,
  },
  {
    name: "Essential",
    monthlyPrice: "$17",
    annualPrice: "$14",
    monthlyLabel: "/mo",
    annualLabel: "/mo, billed annually",
    contacts: "250",
    contactsLabel: "Active Contacts per month",
    tag: "",
    desc: "For creators and growing brands",
    features: [
      "Connect any 2 channels",
      "Unlimited custom automations",
      "2 users",
      "Basic Inbox + organization & reminders",
      "Email Support",
      "No Automate NG branding",
    ],
    cta: "Get started",
    highlight: false,
    channels: 2,
    channelList: ["instagram", "tiktok", "messenger", "telegram"],
    users: 2,
  },
  {
    name: "Pro",
    monthlyPrice: "$39",
    annualPrice: "$29",
    monthlyLabel: "/mo",
    annualLabel: "/mo, billed annually",
    contacts: "2500",
    contactsLabel: "Active Contacts per month",
    tag: "Most Popular",
    desc: "For scaling creators and growing businesses",
    features: [
      "Connect any 3 channels",
      "Advanced automations, broadcasts, and AI-powered convos",
      "3 users",
      "Custom Inbox labels & rules",
      "Email Support",
      "AI",
      "No Automate NG branding",
    ],
    cta: "Get started",
    highlight: true,
    channels: 3,
    channelList: ["instagram", "tiktok", "messenger", "sms", "telegram", "whatsapp"],
    users: 3,
    ai: true,
  },
  {
    name: "Business",
    monthlyPrice: "$99",
    annualPrice: "$69",
    monthlyLabel: "/mo",
    annualLabel: "/mo, billed annually",
    contacts: "7500",
    contactsLabel: "Active Contacts per month",
    tag: "",
    desc: "For scaling businesses and high-growth creators",
    features: [
      "Unlimited channels",
      "Advanced automations, broadcasts, and AI-powered convos",
      "5 users",
      "Shared team Inbox & assignments",
      "Priority Support",
      "AI",
      "No Automate NG branding",
    ],
    cta: "Get started",
    highlight: false,
    channels: 0,
    channelList: ["instagram", "tiktok", "messenger", "sms", "telegram", "whatsapp"],
    users: 5,
    ai: true,
  },
  {
    name: "Advanced",
    monthlyPrice: "$199",
    annualPrice: "$139",
    monthlyLabel: "/mo",
    annualLabel: "/mo, billed annually",
    contacts: "25000",
    contactsLabel: "Active Contacts per month",
    tag: "",
    desc: "For teams and high-volume operators",
    features: [
      "Unlimited channels",
      "Advanced automations, broadcasts, and AI-powered convos",
      "10 users",
      "Shared team Inbox & assignments",
      "Priority Support",
      "AI",
      "No Automate NG branding",
    ],
    cta: "Get started",
    highlight: false,
    channels: 0,
    channelList: ["instagram", "tiktok", "messenger", "sms", "telegram", "whatsapp"],
    users: 10,
    ai: true,
  },
];

const channelIcons: Record<string, string> = {
  instagram: "M12 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 10c3.9 0 7 3.1 7 7H5c0-3.9 3.1-7 7-7z",
  tiktok: "M19 6.5c-.9.5-2 1-3 1-1.5 0-2.8-.8-3.5-2v7c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.3 0 .7 0 1 .1V7.1c-.3-.1-.7-.1-1-.1-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V6.5z",
  messenger: "M12 2C6.5 2 2 6.3 2 11.3c0 2.7 1.1 5.1 3 6.8V22l4-2.2c1.4.4 2.9.6 4.4.6 5.5 0 10-4.3 10-9.3S17.5 2 12 2z",
  telegram: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 7.5l-1.5 7c-.1.5-.4.7-.8.4l-2-1.6-1 1c-.3.3-.5.4-.8.2l.4-2.5 4.5-4c.2-.1 0-.3-.3-.2l-5.5 3.5-2.5-.8c-.5-.2-.5-.5.1-.7l9.8-3.8c.4-.1.7.1.6.7z",
  whatsapp: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  sms: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
};

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { user, business, subscription } = useAuth();
  const navigate = useNavigate();

  const handleCta = async (plan: Plan) => {
    if (plan.name === "Free") {
      navigate(user ? "/dashboard" : "/signUp");
      return;
    }

    if (!user) {
      navigate("/signIn");
      return;
    }

    if (!business) {
      navigate("/onboarding");
      return;
    }

    const billingCycle = annual ? "annual" : "monthly";
    setLoadingPlan(plan.name);

    try {
      const res = await billingService.initializePayment(
        business.id,
        plan.name.toLowerCase(),
        billingCycle
      );
      window.location.href = res.authorization_url;
    } catch (err: any) {
      const message = err?.message || "Payment initialization failed";
      if (message.includes("Plan not found") || message.includes("Invalid plan")) {
        navigate("/dashboard");
      }
    } finally {
      setLoadingPlan(null);
    }
  };

const currentPlan = user ? (subscription?.plan || "free") : null;

  return (
    <section id="pricing" className="relative bg-gray-50 py-[112px] px-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-[#37b24d] text-sm font-medium tracking-[2.8px] uppercase"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            PRICING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[#1a1a2e]"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Choose the right plan for your business
          </motion.h2>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className={`text-sm ${!annual ? "text-[#1a1a2e]" : "text-[#9ca3af]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-[#37b24d]" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${annual ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
            <span className={`text-sm ${annual ? "text-[#1a1a2e]" : "text-[#9ca3af]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
              Annual
              <span className="ml-1 text-[#37b24d] text-xs font-medium">Save up to 30%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
          {plans.map((plan, i) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const label = annual ? plan.annualLabel : plan.monthlyLabel;
const isCurrentPlan = currentPlan !== null && currentPlan === plan.name.toLowerCase();
            const isLoading = loadingPlan === plan.name;

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="relative rounded-[20px] overflow-hidden flex flex-col"
                style={{
                  background: plan.highlight ? "linear-gradient(160deg, #f0fdf4 0%, #ffffff 60%)" : "#ffffff",
                  border: plan.highlight ? "1.5px solid #37b24d" : "1.5px solid #e2e8f0",
                  boxShadow: plan.highlight ? "0 4px 20px rgba(55, 178, 77, 0.1)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {plan.highlight && (
                  <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ boxShadow: "inset 0 2px 0 rgba(55, 178, 77, 0.3)" }} />
                )}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: -65, left: -110, width: 286, height: 294, borderRadius: 24,
                    background: "linear-gradient(to bottom, rgba(55, 178, 77, 0), rgba(55, 178, 77, 0.08))",
                    filter: "blur(42px)", opacity: plan.highlight ? 0.9 : 0.3,
                  }}
                />

                <div className="relative z-10 p-5 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "1rem", color: plan.highlight ? "#37b24d" : "#6b7280" }}>
                        {isCurrentPlan ? `${plan.name} (Current)` : plan.name}
                    </span>
                    {plan.tag && (
                      <span
                        className="px-3 py-1 rounded-full text-[0.6rem] font-semibold tracking-wider uppercase"
                        style={{ background: "rgba(55, 178, 77, 0.1)", color: "#37b24d", fontFamily: "'Inter', sans-serif" }}
                      >
                        {plan.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-[#1a1a2e]" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {price}
                      </span>
                      {label && (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#9ca3af", marginBottom: 3 }}>{label}</span>
                      )}
                    </div>
                    <p className="mt-2 text-[#6b7280]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.4 }}>{plan.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[#1a1a2e]" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "1.5rem" }}>
                    {plan.contacts}
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.7rem", color: "#9ca3af" }}>{plan.contactsLabel}</span>
                  </div>

                  {plan.channels > 0 && (
                    <div>
                      <p className="text-[#9ca3af] text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Connect any {plan.channels} channels
                      </p>
                      <div className="flex gap-1.5">
                        {plan.channelList.slice(0, 6).map((ch) => (
                          <div key={ch} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center" title={ch}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d={channelIcons[ch] || ""} fill="#6b7280" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="h-px bg-gray-200" />

                  <ul className="flex flex-col gap-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(55, 178, 77, 0.1)" }}>
                          <Check size={9} style={{ color: "#37b24d" }} />
                        </span>
                        <span className="text-[#4b5563] text-xs" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handleCta(plan)}
                    disabled={isLoading || isCurrentPlan}
                    whileHover={{ scale: isLoading || isCurrentPlan ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center justify-center gap-2 py-3 rounded-[12px] text-sm mt-auto font-semibold"
                    style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 600,
                      background: isCurrentPlan ? "#e2e8f0" : plan.highlight ? "#37b24d" : "#f3f4f6",
                      border: isCurrentPlan ? "1.5px solid #cbd5e1" : plan.highlight ? "none" : "1.5px solid #e2e8f0",
                      color: isCurrentPlan ? "#94a3b8" : plan.highlight ? "white" : "#1a1a2e",
                      cursor: isLoading || isCurrentPlan ? "not-allowed" : "pointer",
                    }}
                  >
                    {plan.highlight && <span className="absolute inset-0 rounded-[12px] border-t border-[#69db7c] pointer-events-none" />}
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                    {isCurrentPlan ? "Current Plan" : (user ? plan.cta : "Get started")}
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8 text-[#9ca3af] text-xs"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          All plans include a free 7-day trial. Cancel any time.
        </motion.p>
      </div>
    </section>
  );
}
