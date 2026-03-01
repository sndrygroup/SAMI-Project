// components/crm-table.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Calendar, ExternalLink, Search, Filter } from "lucide-react";

const dummyLeads = [
  { id: 1, name: "أحمد محمد", email: "ahmed@example.com", phone: "966500000000", source: "Snapchat", date: "2024-05-20" },
  { id: 2, name: "سارة العتيبي", email: "sara@example.com", phone: "966511111111", source: "TikTok", date: "2024-05-21" },
  { id: 3, name: "خالد عبدالله", email: "khaled@example.com", phone: "966522222222", source: "Meta", date: "2024-05-22" },
];

export default function CrmTable() {
  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0d0d0d] p-4 rounded-2xl border border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="بحث عن عميل..." 
            className="w-full bg-black border border-white/10 p-2 pr-10 rounded-xl outline-none focus:border-purple-500 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-sm">
          <Filter className="w-4 h-4" /> تصفية النتائج
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0d0d0d]">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-white/5 text-gray-500 text-sm">
              <th className="p-4 font-medium">العميل</th>
              <th className="p-4 font-medium">المنصة</th>
              <th className="p-4 font-medium">تاريخ التسجيل</th>
              <th className="p-4 font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dummyLeads.map((lead) => (
              <motion.tr 
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-200">{lead.name}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {lead.email}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    lead.source === 'Snapchat' ? 'bg-[#FFFC00] text-black' : 
                    lead.source === 'TikTok' ? 'bg-[#FE2C55] text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {lead.source}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {lead.date}
                  </div>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => openWhatsApp(lead.phone)}
                    className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#25D366] hover:text-white transition-all"
                  >
                    <Phone className="w-3 h-3" /> واتساب
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
