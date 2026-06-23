import { motion } from "motion/react";

interface Channel {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const channels: Channel[] = [
  { id: "whatsapp", name: "WhatsApp", icon: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z", color: "#37b24d" },
  { id: "instagram", name: "Instagram", icon: "M12 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 10c3.9 0 7 3.1 7 7H5c0-3.9 3.1-7 7-7z", color: "#E4405F" },
  { id: "tiktok", name: "TikTok", icon: "M19 6.5c-.9.5-2 1-3 1-1.5 0-2.8-.8-3.5-2v7c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.3 0 .7 0 1 .1V7.1c-.3-.1-.7-.1-1-.1-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V6.5z", color: "#000000" },
  { id: "messenger", name: "Messenger", icon: "M12 2C6.5 2 2 6.3 2 11.3c0 2.7 1.1 5.1 3 6.8V22l4-2.2c1.4.4 2.9.6 4.4.6 5.5 0 10-4.3 10-9.3S17.5 2 12 2z", color: "#0084FF" },
  { id: "telegram", name: "Telegram", icon: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 7.5l-1.5 7c-.1.5-.4.7-.8.4l-2-1.6-1 1c-.3.3-.5.4-.8.2l.4-2.5 4.5-4c.2-.1 0-.3-.3-.2l-5.5 3.5-2.5-.8c-.5-.2-.5-.5.1-.7l9.8-3.8c.4-.1.7.1.6.7z", color: "#26A5E4" },
  { id: "sms", name: "SMS", icon: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z", color: "#FF6B35" },
];

interface ChannelSelectorProps {
  selected: string[];
  onChange: (channels: string[]) => void;
  max?: number;
}

export function ChannelSelector({ selected, onChange, max }: ChannelSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {channels.map((ch) => {
        const isSelected = selected.includes(ch.id);
        const disabled = !isSelected && max ? selected.length >= max : false;
        return (
          <motion.button
            key={ch.id}
            type="button"
            onClick={() => toggle(ch.id)}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
              isSelected
              ? "bg-[#f0fdf4] border-2 border-[#37b24d]"
              : "bg-white border border-gray-200 hover:border-[#37b24d]"
            } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#37b24d] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${ch.color}20` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d={ch.icon} fill={ch.color} />
              </svg>
            </div>
            <span className="text-[#6b7280] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              {ch.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export { channels };
