"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Key, Globe, Smartphone, Save, ExternalLink, CheckCircle2 } from "lucide-react";

export default function SettingsView() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* قسم ربط المنصات */}
      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Key className="text-purple-500" /> ربط منصات الإعلانات (API)
        </h3>
        
        <div className="space-y-6">
          <div className="group">
            <label className="text-xs text-gray-500 mb-2 block mr-2">Snapchat Pixel / API Key</label>
            <input 
              type="password" 
              placeholder="••••••••••••••••••••••••••••"
              className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm font-mono focus:border-yellow-500/50 outline-none transition-all"
            />
          </div>

          <div className="group">
            <label className="text-xs text-gray-500 mb-2 block mr-2">TikTok Access Token</label>
            <input 
              type="password" 
              placeholder="••••••••••••••••••••••••••••"
              className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm font-mono focus:border-[#FE2C55]/50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* إعدادات المظهر واللغة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem]">
          <Globe className="text-blue-500 mb-4" />
          <h4 className="font-bold mb-4">اللغة والمنطقة</h4>
          <select className="w-full bg-black border border-white/10 p-3 rounded-xl text-sm outline-none">
            <option>العربية (السعودية)</option>
            <option>English (US)</option>
          </select>
        </div>

        <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem]">
          <Shield className="text-green-500 mb-4" />
          <h4 className="font-bold mb-4">أمان الحساب</h4>
          <button className="text-xs bg-white/5 hover:bg-white/10 py-2 px-4 rounded-lg transition-all">
            تفعيل التحقق الثنائي (2FA)
          </button>
        </div>
      </div>

      {/* زر الحفظ العائم */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
        >
          {saved ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Save className="w-5 h-5" />}
          {saved ? "تم الحفظ بنجاح" : "حفظ التغييرات"}
        </button>
      </div>
    </div>
  );
}
