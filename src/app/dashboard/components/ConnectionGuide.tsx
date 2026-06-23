import { motion } from "motion/react";
import { 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Smartphone, 
  ShieldCheck, 
  Key,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";

export function ConnectionGuide() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const webhookUrl = "https://ai-message-be-service.vercel.app/webhook/";
  const verifyToken = "titus_whatsapp_123";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const steps = [
    {
      title: "Create a Meta Developer App",
      icon: <Layout className="text-blue-500" size={20} />,
      content: (
        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
          <li>Go to the <a href="https://developers.facebook.com/apps" target="_blank" className="text-[#37b24d] underline font-medium inline-flex items-center gap-1">Meta for Developers <ExternalLink size={12}/></a> portal.</li>
          <li>Click <b>Create App</b> and select <b>Other</b> {`>`} <b>Business</b>.</li>
          <li>Name your app (e.g. <i>"AutomateNG Connection"</i>).</li>
          <li>In the dashboard, find <b>WhatsApp</b> and click <b>Set Up</b>.</li>
        </ul>
      )
    },
    {
      title: "Get your Phone Number ID",
      icon: <Smartphone className="text-purple-500" size={20} />,
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>Navigate to <b>WhatsApp {`>`} API Setup</b> in the left sidebar.</p>
          <p>Under "Step 1: Select phone numbers", copy the <b>Phone Number ID</b> and paste it into your <b>Settings</b> page in this dashboard.</p>
        </div>
      )
    },
    {
      title: "Generate a Permanent Token",
      icon: <Key className="text-orange-500" size={20} />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Temporary tokens expire in 24 hours. To keep your AI running, you need a Permanent Token:</p>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex gap-3">
            <AlertCircle className="text-amber-600 shrink-0" size={18} />
            <p className="text-xs text-amber-800">
              Go to <b>Business Settings {`>`} Users {`>`} System Users</b>. Create a user, click <b>Generate New Token</b>, and select the <b>whatsapp_business_messaging</b> permission.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Configure the Webhook",
      icon: <Terminal className="text-green-600" size={20} />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">In Meta, go to <b>WhatsApp {`>`} Configuration</b> and paste these:</p>
          <div className="grid gap-2">
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl flex items-center justify-between">
              <code className="text-xs text-gray-700 truncate">{webhookUrl}</code>
              <button onClick={() => copyToClipboard(webhookUrl)} className="text-gray-400 hover:text-[#37b24d]">
                {copiedUrl ? <CheckCircle2 size={16} className="text-[#37b24d]"/> : <Copy size={16}/>}
              </button>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl flex items-center justify-between">
              <code className="text-xs text-gray-700 font-bold">{verifyToken}</code>
              <button onClick={() => copyToClipboard(verifyToken)} className="text-gray-400 hover:text-[#37b24d]">
                <Copy size={16}/>
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Subscribe to Messages",
      icon: <ShieldCheck className="text-indigo-500" size={20} />,
      content: (
        <p className="text-sm text-gray-600">
          After verifying, look for <b>Webhook fields</b> on the same page. Click <b>Manage</b> and click <b>Subscribe</b> for the <b>"messages"</b> row.
        </p>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 text-center">
        <h1 className="text-[#1a1a2e] text-3xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
          WhatsApp Connection Guide
        </h1>
        <p className="text-[#6b7280] text-lg max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Follow these 5 steps to link your official WhatsApp account to the AI Engine.
        </p>
      </div>

      <div className="relative">
        {/* The vertical line */}
        <div className="absolute left-6 top-4 bottom-0 w-px bg-gray-200 hidden sm:block" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Icon Circle */}
              <div className="z-10 w-12 h-12 rounded-full bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                {step.icon}
              </div>

              {/* Text Card */}
              <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#37b24d]/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-widest">Step {index + 1}</span>
                    <h3 className="text-[#1a1a2e] font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{step.title}</h3>
                </div>
                {step.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gray-900 rounded-3xl p-8 text-center text-white relative overflow-hidden">
         <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Need help with the setup?</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                If you're having trouble generating tokens or configuring webhooks, our technical team can help you for free.
            </p>
            <a 
                href="https://wa.me/2348121676394" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#37b24d] px-8 py-3 rounded-xl font-bold hover:bg-[#2d9a3e] transition-all"
            >
                Chat with Support
            </a>
         </div>
      </div>
    </div>
  );
}

function Layout({ children, className, size }: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <line x1="3" x2="21" y1="9" y2="9"/>
      <line x1="9" x2="9" y1="21" y2="9"/>
    </svg>
  );
}