// components/tiktok-interface.tsx
"use client";

import { motion } from "framer-motion";
import { Music, Video, Target, Zap } from "lucide-react";

export default function TiktokInterface() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 animate-in slide-in-from-right duration-500">
      {/* إعدادات حملة تيك توك */}
      <div className="flex-1 space-y-6 bg-[#010101] p-6 rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(255,0,80,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            <div className="w-1.5 h-6 bg-[#FE2C55] rounded-full" />
            <div className="w-1.5 h-6 bg-[#25F4EE] rounded-full" />
          </div>
          <h3 className="text-2xl font-bold italic">TikTok Business Manager</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Campaign Objective</label>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 rounded-xl border border-[#25F4EE]/30 bg-[#25F4EE]/5 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#25F4EE]" /> زيادة التحويل
              </button>
              <button className="p-3 rounded-xl border border-white/5 bg-white/5 text-sm flex items-center gap-2 opacity-50">
                <Video className="w-4 h-4" /> مشاهدات الفيديو
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">اسم المجموعة الإعلانية</label>
            <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-xl focus:ring-1 ring-[#FE2C55] outline-none transition-all" placeholder="Ad Group Name" />
          </div>

          <div className="p-6 border border-dashed border-white/10 rounded-2xl bg-gradient-to-b from-transparent to-white/[0.02]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FE2C55]/10 flex items-center justify-center mb-3">
                <Music className="w-6 h-6 text-[#FE2C55]" />
              </div>
              <p className="text-sm font-medium">أضف فيديو الإعلان (TikTok Creative)</p>
              <p className="text-[11px] text-gray-500 mt-1">نسبة العرض 9:16 هي الأفضل للنتائج</p>
              <button className="mt-4 px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200">
                رفع الملف
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview (TikTok Style) */}
      <div className="w-full lg:w-80">
        <div className="relative w-72 h-[580px] bg-black border-[10px] border-[#111] rounded-[2.5rem] shadow-2xl overflow-hidden mx-auto border-t-[12px]">
           {/* TikTok UI Overlay */}
           <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-4 pb-12">
              <div className="space-y-2">
                 <div className="h-3 w-24 bg-white/40 rounded" />
                 <div className="h-3 w-32 bg-white/20 rounded" />
                 <div className="flex items-center gap-2 mt-2">
                    <Music className="w-3 h-3 text-white" />
                    <div className="h-2 w-20 bg-white/10 rounded animate-pulse" />
                 </div>
              </div>
           </div>
           
           <div className="absolute right-2 bottom-24 z-20 flex flex-col gap-5 items-center">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-800" />
              <div className="w-8 h-8 rounded-full bg-white/10" />
              <div className="w-8 h-8 rounded-full bg-white/10" />
           </div>

           <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#FE2C55] flex items-center justify-center text-white text-xs font-black z-20">
              LEARN MORE
           </div>

           {/* Video Placeholder */}
           <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
              <div className="text-[#FE2C55] opacity-20 scale-150 font-black italic">TIKTOK</div>
           </div>
        </div>
      </div>
    </div>
  );
}
