"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Send, MessageSquare, BarChart3, Palette, 
  PenTool, MousePointerClick, Settings, LogOut, Rocket, Users, ChevronLeft 
} from "lucide-react";

// @ts-ignore
import AuthPage from "./components/auth-page";
// @ts-ignore
import Dashboard from "./components/client-dashboard";

const BrandGradient = "bg-gradient-to-br from-violet-500 to-purple-600";
const BrandTextGradient = "text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-purple-500";

export default function Home() {
  const [view, setView] = useState("landing");
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  const handleHeroChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() === "مرحبا" || chatInput.trim() === "مرحباً") {
      setChatReply("أهلاً بك في سامي! مساعدك التسويقي الذكي. كيف يمكنني أن أساعدك اليوم في تحقيق أهدافك؟ دعنا نبدأ رحلتنا نحو النجاح. 🚀");
    } else {
      setChatReply("مرحباً بك! أنا سامي. لتحليل بياناتك وبناء خطط تسويقية مخصصة، يرجى تسجيل الدخول. أنا هنا لأكون شريكك في النمو.");
    }
  };

  if (view === "auth") return <AuthPage onLogin={() => setView("dashboard")} />;

  if (view === "dashboard") {
    return (
      <div className="flex h-screen bg-[#111015] text-[#EAEAEB] overflow-hidden" dir="rtl">
        <aside className="w-72 bg-gradient-to-b from-[#16151C] to-[#111015] border-l border-white/5 flex flex-col shrink-0 relative z-20">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <span className="text-2xl font-bold italic tracking-tighter text-white">SAM<span className="text-violet-500">I</span></span>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e] border border-green-300/50" />
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-4 mt-2 px-3 text-right italic">القائمة الرئيسية</p>
             <SidebarLink active={true} icon={<MessageSquare size={18}/>} label="محادثة سامي" />
             <SidebarLink active={false} icon={<Rocket size={18}/>} label="مركز الحملات" />
             <SidebarLink active={false} icon={<BarChart3 size={18}/>} label="التحليلات الذكية" />
             <SidebarLink active={false} icon={<Palette size={18}/>} label="استوديو المحتوى" />
          </nav>
          <button onClick={() => setView("landing")} className="p-6 border-t border-white/5 text-gray-500 hover:text-red-400 flex items-center gap-3 text-sm font-bold transition-all"><LogOut size={18}/> تسجيل الخروج</button>
        </aside>
        <main className="flex-1 flex flex-col relative bg-[#0A090C]">
          <header className="h-20 border-b border-white/5 flex items-center px-8 bg-[#111015]/50 backdrop-blur-xl">
            <span className={`${BrandTextGradient} ml-2 text-lg`}>#</span><span className="font-bold text-base tracking-wide">محادثة_سامي</span>
          </header>
          <div className="flex-1 overflow-y-auto p-8"><Dashboard /></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A090C] text-[#D1D1D6] overflow-x-hidden font-sans" dir="rtl">
      {/* Soft Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-purple-900/20 rounded-full blur-[200px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-8 max-w-7xl mx-auto w-full">
        <div className="text-3xl font-bold italic tracking-tighter">SAM<span className="text-violet-500">I</span></div>
        <button 
            onClick={() => setView("auth")} 
            className="px-8 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-gradient-to-br from-violet-500 to-purple-600 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
        >
            تسجيل الدخول
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-20 md:pt-28 px-6 max-w-5xl mx-auto">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-7xl font-extrabold mb-12 leading-tight tracking-tight"
        >
          مستقبلك الرقمي،<br />بذكاء <span className={BrandTextGradient}>SAMI</span>
        </motion.h1>

        {/* Neumorphic Chat Box */}
        <div className="w-full max-w-3xl rounded-[32px] p-1.5 shadow-inner-soft-top-left bg-gradient-to-br from-[#14131a] to-[#0f0e13] shadow-lg shadow-black/30">
            <div className="w-full h-full bg-[#0A090C] rounded-[26px] p-3">
                <form onSubmit={handleHeroChat} className="flex items-center gap-3">
                    <input 
                        value={chatInput} 
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="أخبر سامي عن هدفك التسويقي اليوم..." 
                        className="flex-1 bg-transparent px-5 py-4 outline-none font-medium text-lg placeholder:text-gray-600 transition-all focus:placeholder:text-violet-400"
                    />
                    <button 
                        type="submit" 
                        className="w-14 h-14 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-gradient-to-br from-violet-500 to-purple-600 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center"
                    >
                        <Send size={22}/>
                    </button>
                </form>
                <AnimatePresence>
                    {chatReply && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                        animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 border-t border-white/10 text-right bg-white/[0.02] rounded-xl">
                            <p className="text-violet-300 font-medium text-lg leading-relaxed">{chatReply}</p>
                            <button onClick={() => setView("auth")} className="mt-5 text-xs font-bold flex items-center gap-2 hover:text-violet-300 transition-colors uppercase tracking-widest text-white/70">
                                لنبدأ الآن <ChevronLeft size={14}/>
                            </button>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 py-40 md:py-48 space-y-40 md:space-y-48">
        
        {/* About Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center text-right">
          <div className="order-2 md:order-1">
            <span className={`${BrandTextGradient} font-bold text-sm uppercase mb-5 block italic tracking-[2px]`}>وكالتك الذكية</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">SAMI: شريكك الاستراتيجي للنمو الرقمي</h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
              SAMI ليس مجرد أداة، بل هو منظومة تسويق متكاملة تجمع بين قوة الذكاء الاصطناعي، التحليل الدقيق للبيانات، والإبداع. نحن نمكّنك من بناء حملات مؤثرة، وتصميم محتوى جذاب، وفهم جمهورك بعمق لتحقيق نتائج استثنائية.
            </p>
          </div>
          <div className="order-1 md:order-2 h-[400px] bg-gradient-to-br from-white/[0.02] to-transparent rounded-[48px] border border-white/5 flex items-center justify-center shadow-lg shadow-black/20">
             <Sparkles size={100} className="text-purple-900/20" />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-20 tracking-tight">كيف يعمل <span className={BrandTextGradient}>SAMI</span>؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard num="01" title="ابدأ الحوار" desc="صف فكرتك أو هدفك التسويقي بكلمات بسيطة." />
            <StepCard num="02" title="تحليل فوري" desc="يقوم سامي بفهم متطلباتك ويقترح الحلول." />
            <StepCard num="03" title="اختر أدواتك" desc="من التسويق، التصميم، أو التحليل المتقدم." />
            <StepCard num="04" title="انطلق نحو النمو" desc="نفّذ استراتيجيتك من لوحة تحكم موحدة وذكية." />
          </div>
        </section>

        {/* Tools Section */}
        <section className="pb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-20 text-center tracking-tight">منظومة أدوات متكاملة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ToolCard icon={<Rocket size={28}/>} title="مولّد الحملات الذكي" desc="يصمم وينفذ حملات تسويقية بناءً على بيانات السوق الحية." />
                <ToolCard icon={<PenTool size={28}/>} title="استوديو المحتوى الإبداعي" desc="ينشئ نصوصاً، أفكاراً، وتصاميم للسوشيال ميديا بلمسة زر." />
                <ToolCard icon={<Users size={28}/>} title="محلل الجمهور المتقدم" desc="يحلل سلوك العملاء ويقدم رؤى دقيقة لتحسين الاستهداف." />
                <ToolCard icon={<MousePointerClick size={28}/>} title="لوحة تحكم تفاعلية" desc="تصميم عصري وهادئ يوفر تجربة استخدام سلسة ومركزة." />
            </div>
        </section>

      </div>
    </div>
  );
}

// --- Helper Components ---

function SidebarLink({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
      active
        ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-900/20"
        : "text-gray-400 hover:bg-white/10 hover:text-white"
    }`}>
      {icon} <span>{label}</span>
    </button>
  );
}

function StepCard({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="p-8 bg-gradient-to-br from-[#14131a] to-[#0f0e13] rounded-[32px] text-right group transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-2 border border-white/5">
      <div className="text-4xl font-extrabold text-white/10 mb-6 tracking-tighter transition-colors group-hover:text-violet-500/40">{num}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-500 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ToolCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 bg-gradient-to-br from-[#14131a] to-[#0f0e13] border border-white/5 rounded-[40px] flex flex-col items-start hover:bg-white/[0.02] transition-all duration-300 group text-right hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-2">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 text-white shadow-lg shadow-purple-900/20">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 font-medium text-base leading-relaxed">{desc}</p>
    </div>
  );
}

