"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Github } from "lucide-react";

export default function AuthView({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // محاكاة الاتصال بالخادم
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // تحويل المستخدم للداخل
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
    >
      {/* تأثير ضوء خلفي للمربع */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full" />
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black mb-2 tracking-tight">
          {mode === "signup" ? "انضم لذكاء سامي" : "مرحباً بك مجدداً"}
        </h2>
        <p className="text-gray-500 text-sm">ابدأ بإدارة حملاتك بشكل مختلف اليوم</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="relative">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input required type="text" placeholder="الاسم الكامل" className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pr-12 pl-4 outline-none focus:border-purple-500 transition-all text-sm" />
          </div>
        )}
        
        <div className="relative">
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input required type="email" placeholder="البريد الإلكتروني" className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pr-12 pl-4 outline-none focus:border-purple-500 transition-all text-sm" />
        </div>

        <div className="relative">
          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input required type="password" placeholder="كلمة المرور" className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pr-12 pl-4 outline-none focus:border-purple-500 transition-all text-sm" />
        </div>

        <button 
          disabled={isLoading}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all mt-6 shadow-xl shadow-white/5"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <> {mode === "signup" ? "إنشاء حساب" : "دخول"} <ArrowRight className="w-4 h-4 rotate-180" /> </>
          )}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4 text-gray-600 overflow-hidden">
        <div className="h-px bg-white/5 flex-1" />
        <span className="text-[10px] uppercase tracking-widest">أو عبر</span>
        <div className="h-px bg-white/5 flex-1" />
      </div>

      <button className="w-full mt-6 bg-white/5 border border-white/10 py-3 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold hover:bg-white/10 transition-all">
        <Github className="w-4 h-4" /> Google الحساب المرتبط بـ
      </button>

      <p className="text-center mt-8 text-xs text-gray-500">
        {mode === "signup" ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"} 
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-purple-500 mr-2 font-bold underline">
          {mode === "login" ? "سجل الآن" : "دخول"}
        </button>
      </p>
    </motion.div>
  );
}
