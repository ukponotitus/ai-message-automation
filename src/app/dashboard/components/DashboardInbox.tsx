import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Loader2, MessageCircle, Send, Bot, User, Search, Plus, X,
  Phone, Mail, Tag as TagIcon, MessageSquare, 
} from "lucide-react";
import { api, Conversation, Message, Contact, Tag, ContactTag } from "../../../lib/api";

function ChannelIcon({ channel }: { channel: string }) {
  if (channel === "whatsapp") {
    return (
      <div className="w-6 h-6 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
        <MessageSquare size={12} className="text-[#25D366]" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <MessageSquare size={12} className="text-[#6b7280]" />
    </div>
  );
}

export function DashboardInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Record<number, Contact>>({});
  const [loading, setLoading] = useState(true);
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [contactTags, setContactTags] = useState<ContactTag[]>([]);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConv = conversations.find((c) => c.id === selectedConvId);
  const selectedContact = selectedConv ? contacts[selectedConv.contact.id] : null;
  const selectedMessages = selectedConvId
    ? messages.filter((m) => m.conversation === selectedConvId)
    : [];

  const fetchConversations = useCallback(async () => {
    try {
      const params = search ? `?search=${encodeURIComponent(search)}` : "";
      const data = await api.get<Conversation[]>(`/conversations/${params}`);
      setConversations(data);
    } catch {}
  }, [search]);

  const fetchMessages = useCallback(async (convId: number) => {
    try {
      const data = await api.get<Message[]>(`/conversations/${convId}/messages/`);
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.conversation !== convId);
        return [...filtered, ...data];
      });
    } catch {}
  }, []);

  const fetchContactTags = useCallback(async (contactId: number) => {
    try {
      const data = await api.get<ContactTag[]>(`/contacts/${contactId}/tags/`);
      setContactTags(data);
    } catch {
      setContactTags([]);
    }
  }, []);

  const fetchContactDetail = useCallback(async (contactId: number) => {
    try {
      const data = await api.get<Contact>(`/contacts/${contactId}/`);
      setContacts((prev) => ({ ...prev, [contactId]: data }));
      setNotes(data.notes || "");
    } catch {}
  }, []);

  const fetchAllTags = useCallback(async () => {
    try {
      const data = await api.get<Tag[]>("/tags/");
      setAllTags(data);
    } catch {}
  }, []);

  useEffect(() => {
    Promise.all([fetchConversations(), fetchAllTags()]).finally(() => setLoading(false));
  }, [fetchConversations, fetchAllTags]);

  useEffect(() => {
    if (selectedConvId) {
      fetchMessages(selectedConvId);
      const contactId = conversations.find((c) => c.id === selectedConvId)?.contact.id;
      if (contactId) {
        fetchContactTags(contactId);
        fetchContactDetail(contactId);
      }
    }
  }, [selectedConvId, fetchMessages, conversations, fetchContactTags, fetchContactDetail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = (convId: number) => {
    setSelectedConvId(convId);
    setMessages([]);
  };

  const sendReply = async () => {
    if (!reply.trim() || !selectedConvId) return;
    setSending(true);
    try {
      const sent = await api.post<Message>(`/conversations/${selectedConvId}/reply/`, {
        content: reply,
      });
      setMessages((prev) => [...prev, sent]);
      setReply("");
      if (replyRef.current) replyRef.current.style.height = "auto";
    } catch {
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  };

  const toggleAiEnabled = async () => {
    if (!selectedConvId || !selectedConv) return;
    try {
      const data = await api.patch<{ is_ai_enabled: boolean }>(`/conversations/${selectedConvId}/`, {
        is_ai_enabled: !selectedConv.is_ai_enabled,
      });
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedConvId ? { ...c, is_ai_enabled: data.is_ai_enabled } : c))
      );
    } catch {}
  };

  const addTag = async (tagName: string) => {
    if (!selectedContact) return;
    try {
      await api.post(`/contacts/${selectedContact.id}/tags/`, { tag_name: tagName });
      fetchContactTags(selectedContact.id);
    } catch {}
  };

  const removeTag = async (tagId: number) => {
    if (!selectedContact) return;
    try {
      await api.delete(`/contacts/${selectedContact.id}/tags/?tag_id=${tagId}`);
      fetchContactTags(selectedContact.id);
    } catch {}
  };

  const saveNotes = async () => {
    if (!selectedContact) return;
    setSavingNotes(true);
    try {
      await api.patch(`/contacts/${selectedContact.id}/`, { notes });
    } catch {}
    setSavingNotes(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#37b24d]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Inbox</h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Manage conversations across all your channels.
        </p>
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* Left Pane — Conversation List */}
        <div className="w-72 shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm outline-none focus:border-[#37b24d] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>No conversations yet</p>
              </div>
            ) : (
              conversations.map((conv) => {
                const contact = conv.contact;
                return (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      selectedConvId === conv.id ? "bg-[#f0fdf4]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[#1a1a2e] text-sm font-medium truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {contact?.name || `Contact #${contact?.id}`}
                          </p>
                          {conv.unread_count > 0 && (
                            <span className="bg-[#37b24d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                        <p className="text-[#9ca3af] text-xs truncate mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {conv.last_message?.content || "No messages"}
                        </p>
                      </div>
                      <ChannelIcon channel={conv.channel_name} />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Middle Pane — Chat */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col min-w-0">
          {!selectedConv ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-[#9ca3af] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Select a conversation to view messages
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-[#1a1a2e] font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {selectedContact?.name || `Contact #${selectedConv.contact.id}`}
                  </h2>
                  {selectedContact?.phone && (
                    <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {selectedContact.phone}
                    </p>
                  )}
                </div>
                <label className="flex items-center gap-2 text-xs text-[#6b7280] cursor-pointer" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <Bot size={14} />
                  <span>AI Assistant</span>
                  <button
                    onClick={toggleAiEnabled}
                    className={`relative w-9 h-5 rounded-full transition-colors ${
                      selectedConv.is_ai_enabled ? "bg-[#37b24d]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                        selectedConv.is_ai_enabled ? "translate-x-4" : ""
                      }`}
                    />
                  </button>
                </label>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === "user" ? "" : "flex-row-reverse"}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user" ? "bg-gray-100" : "bg-[#37b24d]/10"
                    }`}>
                      {msg.role === "user" ? (
                        <User size={14} className="text-[#6b7280]" />
                      ) : (
                        <Bot size={14} className="text-[#37b24d]" />
                      )}
                    </div>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-gray-100 rounded-bl-sm"
                        : "bg-[#37b24d] text-white rounded-br-sm"
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {msg.content}
                      </p>
                      <p className={`text-[10px] mt-1 ${
                        msg.role === "user" ? "text-[#9ca3af]" : "text-white/60"
                      }`} style={{ fontFamily: "'Inter', sans-serif" }}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 shrink-0">
                <div className="flex gap-2">
                  <textarea
                    ref={replyRef}
                    value={reply}
                    onChange={(e) => {
                      setReply(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a reply... (Enter to send, Shift+Enter for new line)"
                    rows={1}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#37b24d] transition-colors resize-none"
                    style={{ fontFamily: "'Inter', sans-serif", maxHeight: "120px" }}
                  />
                  <motion.button
                    onClick={sendReply}
                    disabled={!reply.trim() || sending}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="h-fit bg-[#37b24d] text-white p-2.5 rounded-xl disabled:opacity-30"
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Pane — Contact Details */}
        <div className="w-72 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {!selectedContact ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <p className="text-[#9ca3af] text-xs text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                Select a conversation to view contact details
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {/* Profile */}
              <div className="p-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#37b24d]/10 flex items-center justify-center mx-auto mb-2">
                  <User size={20} className="text-[#37b24d]" />
                </div>
                <h3 className="text-center text-[#1a1a2e] font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {selectedContact.name || "Unknown"}
                </h3>
              </div>

              {/* Contact Info */}
              <div className="p-4 border-b border-gray-100 space-y-3">
                {selectedContact.phone && (
                  <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                    <Phone size={12} />
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>{selectedContact.phone}</span>
                  </div>
                )}
                {selectedContact.email && (
                  <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                    <Mail size={12} />
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>{selectedContact.email}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <TagIcon size={12} className="inline mr-1" />Tags
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {contactTags.map((ct) => (
                    <span
                      key={ct.id}
                      className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#37b24d] text-xs px-2 py-1 rounded-full"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {ct.tag.name}
                      <button onClick={() => removeTag(ct.tag.id)} className="hover:text-red-500">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <select
                    onChange={(e) => { if (e.target.value) addTag(e.target.value); e.target.value = ""; }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#37b24d] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    value=""
                  >
                    <option value="">Add tag...</option>
                    {allTags
                      .filter((t) => !contactTags.some((ct) => ct.tag.id === t.id))
                      .map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="p-4">
                <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Notes
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes about this customer..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#37b24d] transition-colors resize-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  onBlur={saveNotes}
                />
                {savingNotes && (
                  <p className="text-[#9ca3af] text-[10px] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Saving...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
