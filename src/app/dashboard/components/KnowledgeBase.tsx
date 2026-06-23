import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { api, CompanyInfo } from "../../../lib/api";

export function KnowledgeBase() {
  const [items, setItems] = useState<CompanyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CompanyInfo | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    api.get<CompanyInfo[]>("/company-info/")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!question.trim()) return;
    if (editing) {
      const updated = await api.patch<CompanyInfo>(`/company-info/${editing.id}/`, { question, answer });
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } else {
      const created = await api.post<CompanyInfo>("/company-info/", { question, answer });
      setItems((prev) => [...prev, created]);
    }
    setEditing(null);
    setQuestion("");
    setAnswer("");
  };

  const remove = async (id: number) => {
    await api.delete(`/company-info/${id}/`);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const startEdit = (item: CompanyInfo) => {
    setEditing(item);
    setQuestion(item.question);
    setAnswer(item.answer);
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
        <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Knowledge Base</h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Manage FAQs and information your AI agent uses to answer customers.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-[#1a1a2e] font-semibold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          {editing ? "Edit Entry" : "Add New Entry"}
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] text-sm outline-none focus:border-[#37b24d] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] text-sm outline-none focus:border-[#37b24d] transition-colors resize-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <div className="flex gap-2">
            <motion.button
              onClick={save}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[#37b24d] text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-[#2d9a3e] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Plus size={16} />
              {editing ? "Update" : "Add"}
            </motion.button>
            {editing && (
              <motion.button
                onClick={() => { setEditing(null); setQuestion(""); setAnswer(""); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-[#6b7280] border border-gray-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-[#9ca3af] text-sm text-center py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            No entries yet. Add your first FAQ above.
          </p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[#1a1a2e] text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{item.question}</p>
                  {item.answer && (
                    <p className="text-[#6b7280] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{item.answer}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(item)} className="text-[#9ca3af] hover:text-[#37b24d] transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => remove(item.id)} className="text-[#9ca3af] hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
