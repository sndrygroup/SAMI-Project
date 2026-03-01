"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Globe, Instagram, Facebook, 
  Linkedin, Search, ShoppingBag, Smartphone, 
  MessageCircle, Send, Lock
} from "lucide-react";

// قائمة المنصات الشاملة
const platforms = [
  { id: "snapchat", name: "Snapchat", icon: "👻", status: "active" },
  { id: "tiktok", name: "TikTok", icon: "🎵", status: "active" },
  { id: "google", name: "Google Ads", icon: "🔍", status: "active" },
  { id: "meta", name: "Meta (FB/IG/WA)", icon: "📱", status: "active" },
 { id: "linkedin", name: "LinkedIn", icon: "💼", status: "soon" },
  { id: "pinterest", name: "Pinterest", icon: "📌", status: "soon" },
  { id: "microsoft", name: "Microsoft Ads", icon: "💻", status: "soon" },
  { id: "appstore", name: "Apple Search Ads", icon: "🍎", status: "soon" },
  { id: "playstore", name: "Google Play", icon: "🤖", status: "active" },
  { id: "samsung", name: "Samsung Ads", icon: "🌌", status: "soon" },
  { id: "telegram", name: "Telegram Ads", icon: <Send className="w-5 h-5" />, status: "soon" },
];

export default function CampaignWizard() {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  return (
    <div className="space-y-10 text-right" dir="rtl">
      <div>
        <h2 className="text-3xl font-black mb-2">إنشاء حملة جديدة</h2>
        <p className="text-gray-500">اختر المنصة التي تود إطلاق حملتك عليها عبر ذكاء سامي</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {platforms.map((p) => (
          <button
            key={p.id}
            disabled={p.status === "soon"}
            onClick={() => setSelectedPlatform(p.id)}
            className={`relative p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 group ${
              selectedPlatform === p.id 
              ? "bg-purple-600 border-purple-500" 
              : "bg-[#080808] border-white/5 hover:border-white/20"
            } ${p.status === "soon" ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
          >
            {p.status === "soon" && (
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-1 rounded-lg border border-white/10">
                <Lock className="w-3 h-3 text-gray-400" />
              </div>
            )}
            
            <div className={`text-4xl ${selectedPlatform === p.id ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
              {p.icon}
            </div>
            
            <div className="text-center">
              <p className="font-bold text-sm">{p.name}</p>
              {p.status === "soon" && <p className="text-[10px] text-purple-400 mt-1 uppercase font-black">قريباً</p>}
            </div>

            {selectedPlatform === p.id && (
              <motion.div layoutId="check" className="absolute -top-2 -left-2 bg-white text-black rounded-full p-1 shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}
          </button>
        ))}
      </div>

      {/* نموذج إدخال بيانات الحملة (يظهر فقط للمنصات النشطة) */}
      {selectedPlatform && platforms.find(p => p.id === selectedPlatform)?.status === "active" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#080808] p-8 rounded-[2.5rem] border border-white/5 space-y-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="text-purple-500 w-5 h-5" /> تفاصيل حملة {selectedPlatform}
          </h3>
          {/* هنا تضع حقول الإدخال: الميزانية، المحتوى، الاستهداف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input placeholder="اسم الحملة" className="bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-purple-500" />
            <input type="number" placeholder="الميزانية اليومية (SAR)" className="bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-purple-500" />
          </div>
          <button className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-purple-500 hover:text-white transition-all">
            إطلاق الحملة عبر سامي 🚀
          </button>
        </motion.div>
      )}
    </div>
  );
}
