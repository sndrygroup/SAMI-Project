// components/snapchat-interface.tsx
"use client";

import { motion } from "framer-motion";
import { Upload, Smartphone, Users, DollarSign } from "lucide-react";

export default function SnapchatInterface() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 animate-in fade-in duration-500">
      {/* قسم الإعدادات (Settings) */}
      <div className="flex-1 space-y-6 bg-[#111] p-6 rounded-3xl border border-white/5">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-8 bg-[#FFFC00] rounded-full" />
          إعدادات حملة سناب شات
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">اسم الحملة</label>
            <input type="text" className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-[#FFFC00] outline-none" placeholder="مثلاً: عرض رمضان 2026" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">الميزانية اليومية</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input type="number" className="w-full bg-black border border-white/10 p-3 pl-10 rounded-xl outline-none focus:border-[#FFFC00]" placeholder="50" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">الجمهور المستهدف</label>
              <select className="w-full bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-[#FFFC00]">
                <option>السعودية - 18-35 سنة</option>
                <option>الإمارات - جميع الأعمار</option>
                <option>الكويت - مهتمين بالتسويق</option>
              </select>
            </div>
          </div>

          <div className="border-2 border-dashed border-white/10 p-10 rounded-2xl text-center hover:border-[#FFFC00]/50 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 mx-auto mb-4 text-gray-500" />
            <p className="text-sm text-gray-400">اسحب فيديو الإعلان هنا أو اضغط للرفع</p>
            <p className="text-[10px] text-gray-600 mt-2 text-wrap">الحد الأقصى: 32MB (MP4/MOV)</p>
          </div>
        </div>
      </div>

      {/* قسم المعاينة (Mobile Preview) */}
      <div className="w-full lg:w-80 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Smartphone className="w-4 h-4" /> معاينة مباشرة
        </p>
        <div className="relative w-72 h-[550px] bg-black border-[8px] border-[#222] rounded-[3rem] shadow-2xl overflow-hidden ring-4 ring-[#FFFC00]/20">
          {/* محاكاة واجهة سناب شات داخل الجوال */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10 p-4">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse" />
                <div className="h-3 w-20 bg-white/20 rounded" />
             </div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 p-4 z-10">
             <div className="h-4 w-3/4 bg-white/30 rounded mb-2" />
             <div className="h-10 w-full bg-[#FFFC00] rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                تسوق الآن
             </div>
          </div>
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center italic text-gray-700">
            محتوى الإعلان يظهر هنا
          </div>
        </div>
      </div>
    </div>
  );
}
