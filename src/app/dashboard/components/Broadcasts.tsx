import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Plus, Send, Loader2, Calendar, Search, UserPlus, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { api, Broadcast, Contact } from "../../../lib/api";

export function Broadcasts() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState("whatsapp");
  const [emailSubject, setEmailSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickName, setQuickName] = useState("");
  const [quickDetail, setQuickDetail] = useState("");
  const [quickError, setQuickError] = useState("");
  const [quickAdding, setQuickAdding] = useState(false);

  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Broadcast | null>(null);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api.get<Broadcast[]>("/broadcasts/")
      .then(setBroadcasts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const openForm = async (edit?: Broadcast) => {
    setShowForm(true);
    setShowQuickAdd(false);
    setSearchQuery("");
    try {
      const data = await api.get<Contact[]>("/contacts/");
      setAllContacts(data);
    } catch {
      setAllContacts([]);
    }
    if (edit) {
      setEditingId(edit.id);
      setName(edit.name);
      setContent(edit.content);
      setChannel(edit.channel);
      setEmailSubject(edit.email_subject ?? "");
      setSubjectError("");
      setScheduledAt(edit.scheduled_at ?? "");
      setSelectedIds(edit.contact_ids ?? []);
    } else {
      setEditingId(null);
      setName("");
      setContent("");
      setChannel("whatsapp");
      setEmailSubject("");
      setSubjectError("");
      setScheduledAt("");
      setSelectedIds([]);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const filteredContacts = allContacts.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (channel === "whatsapp" && !c.phone) return false;
    if (channel === "email" && !c.email) return false;
    return true;
  });

  const toggleContact = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const save = async () => {
    if (!name.trim() || !content.trim()) return;
    if (channel === "email" && !emailSubject.trim()) {
      setSubjectError("Email subject is required");
      return;
    }
    setSubjectError("");
    try {
      const payload: Record<string, unknown> = { name, content, channel };
      if (channel === "email") payload.email_subject = emailSubject;
      if (scheduledAt) payload.scheduled_at = scheduledAt;
      if (selectedIds.length > 0) payload.contact_ids = selectedIds;

      if (editingId) {
        const updated = await api.patch<Broadcast>(`/broadcasts/${editingId}/`, payload);
        setBroadcasts((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
        toast.success("Broadcast updated");
      } else {
        const created = await api.post<Broadcast>("/broadcasts/", { ...payload, status: "draft" });
        setBroadcasts((prev) => [...prev, created]);
        toast.success("Broadcast created");
      }
      closeForm();
    } catch {
      toast.error(editingId ? "Failed to update broadcast" : "Failed to create broadcast");
    }
  };

  const sendNow = async (b: Broadcast) => {
    setSending(true);
    try {
      const updated = await api.post<Broadcast>(`/broadcasts/${b.id}/send/`, {});
      setBroadcasts((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
      toast.success("Broadcast sent");
    } catch {
      toast.error("Failed to send broadcast");
    } finally {
      setSending(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/broadcasts/${deleteTarget.id}/`);
      setBroadcasts((prev) => prev.filter((x) => x.id !== deleteTarget.id));
      toast.success("Broadcast deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete broadcast");
    } finally {
      setDeleting(false);
    }
  };

  const addQuickContact = async () => {
    if (!quickName.trim() || !quickDetail.trim()) {
      setQuickError("Both fields are required");
      return;
    }
    setQuickAdding(true);
    setQuickError("");
    try {
      const payload: Record<string, unknown> = { name: quickName.trim() };
      if (channel === "whatsapp") payload.phone = quickDetail.trim();
      else payload.email = quickDetail.trim();
      const created = await api.post<Contact>("/contacts/", payload);
      setAllContacts((prev) => [...prev, created]);
      setSelectedIds((prev) => [...prev, created.id]);
      setQuickName("");
      setQuickDetail("");
      setShowQuickAdd(false);
      toast.success("Contact added");
    } catch {
      setQuickError("Failed to add contact. It may already exist.");
    } finally {
      setQuickAdding(false);
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
          <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Broadcasts</h1>
          <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Create and send targeted broadcasts to your audience.
          </p>
        </div>
        <motion.button
          onClick={() => openForm()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-[#37b24d] text-white px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <Plus size={16} /> New Broadcast
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#1a1a2e] font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {editingId ? "Edit Broadcast" : "Create Broadcast"}
            </h2>
            <button onClick={closeForm} className="text-[#9ca3af] hover:text-[#1a1a2e]">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Broadcast name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <select
              value={channel}
              onChange={(e) => { setChannel(e.target.value); setSubjectError(""); }}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
            {channel === "email" && (
              <div>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => { setEmailSubject(e.target.value); setSubjectError(""); }}
                  placeholder="Email Subject *"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                {subjectError && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{subjectError}</p>
                )}
              </div>
            )}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Message content"
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors resize-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />

            {/* Contact Selector */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="relative bg-gray-50 border-b border-gray-200">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipients..."
                  className="w-full bg-transparent pl-9 pr-3 py-2.5 text-xs outline-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div className="max-h-36 overflow-y-auto p-1">
                {filteredContacts.length === 0 && !searchQuery && !showQuickAdd && (
                  <div className="text-center py-4">
                    <p className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {channel === "whatsapp" ? "No contacts with phone numbers" : "No contacts with email addresses"}
                    </p>
                    <button
                      onClick={() => { setShowQuickAdd(true); setQuickError(""); }}
                      className="text-[#37b24d] text-xs font-medium mt-1 hover:underline"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      + Quick add a contact
                    </button>
                  </div>
                )}
                {filteredContacts.length === 0 && searchQuery && (
                  <p className="text-center text-[#9ca3af] text-xs py-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    No contacts match &quot;{searchQuery}&quot;
                  </p>
                )}
                {filteredContacts.map((contact) => (
                  <label
                    key={contact.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(contact.id)}
                      onChange={() => toggleContact(contact.id)}
                      className="accent-[#37b24d] w-3.5 h-3.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#1a1a2e] font-medium truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {contact.name || "Unnamed"}
                      </p>
                      <p className="text-[10px] text-[#9ca3af] truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {channel === "whatsapp" ? contact.phone : contact.email}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-200">
                <span className="text-[10px] text-[#6b7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {selectedIds.length} of {filteredContacts.length} selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setShowQuickAdd(!showQuickAdd); setQuickError(""); }}
                    className="text-[10px] text-[#37b24d] font-medium hover:underline flex items-center gap-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <UserPlus size={10} /> Quick Add
                  </button>
                  {filteredContacts.length > 0 && (
                    <button
                      onClick={() =>
                        setSelectedIds(
                          selectedIds.length === filteredContacts.length
                            ? []
                            : filteredContacts.map((c) => c.id)
                        )
                      }
                      className="text-[10px] text-[#37b24d] font-medium hover:underline"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {selectedIds.length === filteredContacts.length ? "Deselect all" : "Select all"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Add Inline Form */}
            {showQuickAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border border-green-200 bg-green-50/50 rounded-xl p-3 space-y-2"
              >
                <p className="text-xs font-medium text-[#1a1a2e]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Quick Add Contact
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="Name"
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#37b24d] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  <input
                    type={channel === "whatsapp" ? "tel" : "email"}
                    value={quickDetail}
                    onChange={(e) => setQuickDetail(e.target.value)}
                    placeholder={channel === "whatsapp" ? "Phone number" : "Email address"}
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#37b24d] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                {quickError && (
                  <p className="text-red-500 text-[10px]" style={{ fontFamily: "'Inter', sans-serif" }}>{quickError}</p>
                )}
                <div className="flex gap-2">
                  <motion.button
                    onClick={addQuickContact}
                    disabled={quickAdding}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 bg-[#37b24d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {quickAdding ? <Loader2 size={10} className="animate-spin" /> : <UserPlus size={10} />}
                    {quickAdding ? "Adding..." : "Add to List"}
                  </motion.button>
                  <button
                    onClick={() => { setShowQuickAdd(false); setQuickError(""); }}
                    className="px-3 py-1.5 rounded-lg text-xs bg-gray-200 text-[#6b7280]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <div className="flex gap-2">
              <motion.button
                onClick={save}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#37b24d] text-white px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {editingId ? "Save Changes" : "Save Draft"}
              </motion.button>
              <button
                onClick={closeForm}
                className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-[#6b7280]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {broadcasts.length === 0 ? (
        <div className="text-center py-20">
          <Send size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-[#9ca3af] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>No broadcasts yet</p>
          <p className="text-[#9ca3af] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Create your first broadcast campaign.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {broadcasts.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1a2e] text-sm font-medium truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{b.name}</p>
                  <p className="text-[#6b7280] text-xs mt-1 line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>{b.content}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      b.status === "sent" ? "bg-[#f0fdf4] text-[#37b24d]" :
                      b.status === "sending" ? "bg-blue-50 text-blue-600" :
                      b.status === "scheduled" ? "bg-yellow-50 text-yellow-600" :
                      "bg-gray-100 text-[#6b7280]"
                    }`} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {b.status}
                    </span>
                    {(b.contact_ids?.length ?? 0) > 0 && (
                      <span className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {b.contact_ids!.length} recipient{(b.contact_ids!.length ?? 0) > 1 ? "s" : ""}
                      </span>
                    )}
                    {b.delivered_count !== undefined && (
                      <span className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Sent: {b.sent_count ?? 0} · Delivered: {b.delivered_count}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {b.status === "draft" && (
                    <motion.button
                      onClick={() => sendNow(b)}
                      disabled={sending}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1 bg-[#37b24d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {sending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                      Send
                    </motion.button>
                  )}
                  {b.status === "scheduled" && (
                    <div className="flex items-center gap-1 text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <Calendar size={12} />
                      {b.scheduled_at ? new Date(b.scheduled_at).toLocaleDateString() : ""}
                    </div>
                  )}

                  {/* Kebab Menu */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen(menuOpen === b.id ? null : b.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-[#9ca3af] hover:text-[#1a1a2e] transition-colors"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                    {menuOpen === b.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 min-w-[140px]"
                      >
                        {b.status === "draft" && (
                          <button
                            onClick={() => { setMenuOpen(null); openForm(b); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#1a1a2e] hover:bg-gray-50"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            <Pencil size={12} /> Edit
                          </button>
                        )}
                        {b.status === "draft" && <div className="border-t border-gray-100 my-1" />}
                        <button
                          onClick={() => { setMenuOpen(null); setDeleteTarget(b); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h2 className="text-[#1a1a2e] font-bold text-center mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Delete Broadcast
            </h2>
            <p className="text-sm text-[#6b7280] text-center mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Are you sure you want to delete &quot;{deleteTarget.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-gray-100 text-[#6b7280] disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </button>
              <motion.button
                onClick={confirmDelete}
                disabled={deleting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {deleting ? "Deleting..." : "Delete"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
