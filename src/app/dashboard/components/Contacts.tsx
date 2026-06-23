import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Loader2, Search, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api, Contact } from "../../../lib/api";

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Contact[]>("/contacts/")
      .then(setContacts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = contacts.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="text-[#1a1a2e] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Contacts</h1>
        <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          View and manage your contacts across all channels.
        </p>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contacts..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#37b24d] transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Users size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-[#9ca3af] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>No contacts yet</p>
          <p className="text-[#9ca3af] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Contacts from your conversations will appear here.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-[#6b7280] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Name</th>
                  <th className="text-left px-4 py-3 text-[#6b7280] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Phone</th>
                  <th className="text-left px-4 py-3 text-[#6b7280] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Email</th>
                  <th className="text-left px-4 py-3 text-[#6b7280] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Tags</th>
                  <th className="text-right px-4 py-3 text-[#6b7280] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-[#1a1a2e]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {contact.name || "Unnamed"}
                    </td>
                    <td className="px-4 py-3 text-[#6b7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {contact.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-[#6b7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {contact.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {contact.tags?.length ? contact.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-[#6b7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {t}
                          </span>
                        )) : (
                          <span className="text-[#9ca3af] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => navigate("/dashboard/inbox")}
                        className="text-[#37b24d] hover:text-[#2d9a3e] transition-colors"
                      >
                        <MessageSquare size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
