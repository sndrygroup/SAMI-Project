"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Send, MessageSquare, BarChart3, Palette, 
  PenTool, MousePointerClick, Settings, LogOut, Rocket, Users, ChevronLeft 
} from "lucide-react";

// ملاحظة: تأكدي من وجود هذه الملفات داخل مجلد app/components
// @ts-ignore
import AuthPage from "./components/auth-view"; 
// @ts-ignore
import Dashboard from "./components/client-dashboard";

const BrandGradient = "bg-gradient-to-br from-orange-500 to-amber-600";
const BrandTextGradient = "text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500";

export default function Home() {
  const [view, setView] = useState("landing");
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  const handleHeroChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() === "مرحبا" || chatInput.trim() === "مرحباً") {
      setChatReply("أهلاً بك في سامي! مساعدك التسويقي الذكي. كيف يمكنني أن أساعدك اليوم؟ 🚀");
    } else {
      setChatReply("مرحباً بك! أنا سامي. لتحليل بياناتك وبناء خطط تسويقية، يرجى تسجيل الدخول.");
    }
  };

  if (view === "auth") return <AuthPage onLogin={() => setView("dashboard")} />;

  if (view === "dashboard") {
    return (
      <div className="flex h-screen bg-[#0A090C] text-[#EAEAEB] overflow-hidden" dir="rtl">
        <aside className="w-72 bg-[#111015] border-l border-white/5 flex flex-col shrink-0">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <span className="text-2xl font-bold italic text-white">SAM<span className="text-orange-500">I</span></span>
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
          </div>
          <nav className="flex-1 p-4 space-y-2">
             <SidebarLink active={true} icon={<MessageSquare size={18}/>} label="محادثة سامي" />
             <SidebarLink active={false} icon={<Rocket size={18}/>} label="مركز الحملات" />
             <SidebarLink active={false} icon={<BarChart3 size={18}/>} label="التحليلات" />
          </nav>
          <button onClick={() => setView("landing")} className="p-6 border-t border-white/5 text-gray-500 hover:text-orange-400 flex items-center gap-3 text-sm font-bold transition-all"><LogOut size={18}/> خروج</button>
        </aside>
        <main className="flex-1 flex flex-col bg-[#0A090C]">
          <header className="h-20 border-b border-white/5 flex items-center px-8 bg-[#111015]/50 backdrop-blur-xl">
            <span className={`${BrandTextGradient} ml-2 text-lg`}>#</span><span className="font-bold">محادثة_سامي</span>
          </header>
          <div className="flex-1 overflow-y-auto p-8"><Dashboard /></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A090C] text-[#D1D1D6] overflow-x-hidden font-sans" dir="rtl">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full h-[800px] bg-orange-900/10 rounded-full blur-[200px]" />
      </div>

      <header className="relative z-20 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-3xl font-bold italic">SAM<span className="text-orange-500">I</span></div>
        <button onClick={() => setView("auth")} className={`px-8 py-3 rounded-full font-bold text-sm text-white transition-all ${BrandGradient} shadow-lg shadow-orange-900/20 hover:scale-105`}>
            تسجيل الدخول
        </button>
      </header>

      <section className="relative z-10 flex flex-col items-center text-center pt-20 px-6 max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-extrabold mb-12">
          مستقبلك الرقمي،<br />بذكاء <span className={BrandTextGradient}>SAMI</span>
        </motion.h1>

        {/* Chat Box */}
        <div className="w-full max-w-3xl rounded-[32px] p-1.5 bg-gradient-to-br from-[#1a1921] to-[#0f0e13] shadow-2xl shadow-black/50">
            <div className="w-full bg-[#0A090C] rounded-[26px] p-3">
                <form onSubmit={handleHeroChat} className="flex items-center gap-3">
                    <input 
                        value={chatInput} 
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="أخبر سامي عن هدفك التسويقي اليوم..." 
                        className="flex-1 bg-transparent px-5 py-4 outline-none font-medium text-lg placeholder:text-gray-700 focus:placeholder:text-orange-400"
                    />
                    <button type="submit" className={`w-14 h-14 rounded-2xl ${BrandGradient} flex items-center justify-center text-white shadow-lg shadow-orange-900/40 hover:scale-105 transition-all`}>
                        <Send size={22}/>
                    </button>
                </form>
                <AnimatePresence>
                    {chatReply && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 border-t border-white/5 text-right mt-4">
                        <p className="text-orange-300 font-medium text-lg leading-relaxed">{chatReply}</p>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Features Section - تحت المربع مباشرة */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 py-32 space-y-32">
        <section className="text-center">
          <h2 className="text-4xl font-extrabold mb-16 italic">منظومة أدوات متكاملة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ToolCard icon={<Rocket size={28}/>} title="مولّد الحملات الذكي" desc="يصمم وينفذ حملات تسويقية بناءً على بيانات السوق الحية." />
                <ToolCard icon={<PenTool size={28}/>} title="استوديو المحتوى" desc="ينشئ نصوصاً وأفكاراً للسوشيال ميديا بلمسة زر." />
                <ToolCard icon={<Users size={28}/>} title="محلل الجمهور" desc="يحلل سلوك العملاء ويقدم رؤى دقيقة لتحسين الاستهداف." />
                <ToolCard icon={<MousePointerClick size={28}/>} title="لوحة تحكم تفاعلية" desc="تجربة استخدام سلسة ومركزة لإدارة مشاريعك." />
          </div>
        </section>
      </div>
    </div>
  );
}

function SidebarLink({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) {
  return (
    <button className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
      active ? "bg-orange-500 text-white shadow-lg shadow-orange-900/20" : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}>
      {icon} <span>{label}</span>
    </button>
  );
}

function ToolCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 bg-[#111015] border border-white/5 rounded-[40px] flex flex-col items-start hover:border-orange-500/30 transition-all group text-right">
      <div className={`w-16 h-16 rounded-2xl ${BrandGradient} flex items-center justify-center mb-8 shadow-lg shadow-orange-900/20 text-white group-hover:scale-110 transition-transform`}>{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
