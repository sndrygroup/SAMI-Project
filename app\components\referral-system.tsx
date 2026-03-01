// components/referral-system.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Gift, Users, Trophy, Check } from "lucide-react";

export default function ReferralSystem() {
  const [copied, setCopied] = useState(false);
  const referralCode = "SAMI-777-XYZ"; // هذا سيتغير لاحقاً ليكون كود المستخدم الحقيقي

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://sami-ads.com/signup?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      {/* بطاقة المكافأة الكبيرة */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 p-8 rounded-[3rem] text-center">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy className="w-32 h-32" />
        </div>
        
        <Gift className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <h3 className="text-3xl font-extrabold mb-2">شارك سامي واربح!</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8 font-light italic">
          مقابل كل صديق يسجل عن طريقك، ستحصل على **50 نقطة** صالحة لاستخدامها في حملاتك القادمة.
        </p>

        {/* حقل الرابط */}
        <div className="max-w-md mx-auto flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
          <input 
            type="text" 
            readOnly 
            value={`sami-ads.com/ref=${referralCode}`}
            className="flex-1 bg-transparent border-none outline-none p-2 text-sm text-gray-300"
          />
          <button 
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-bold ${
              copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "تم النسخ" : "نسخ الرابط"}
          </button>
        </div>
      </div>

      {/* إحصائيات الإحالة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "إجمالي الأصدقاء", value: "12", icon: <Users className="text-blue-400" /> },
          { label: "النقاط المكتسبة", value: "600", icon: <Trophy className="text-yellow-400" /> },
          { label: "ترتيبك الحالي", value: "#42", icon: <Share2 className="text-pink-400" /> },
        ].map((item, i) => (
          <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1 tracking-widest">{item.label}</p>
              <p className="text-2xl font-black">{item.value}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
