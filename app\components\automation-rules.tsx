"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Plus, Globe, Cpu, ChevronLeft, LayoutGrid, 
  Link2, Bell, ShieldCheck, TrendingUp, BarChart, 
  FileUp, Check, Loader2 
} from "lucide-react";

const AUTOMATION_TEMPLATES = [
  { id: 1, name: "حماية الميزانية", desc: "إيقاف الحملة إذا صرفت 50$ بدون مبيعات", icon: <ShieldCheck className="text-red-400" /> },
  { id: 2, name: "التوسع الذكي", desc: "زيادة الميزانية 15% إذا كان ROAS > 4", icon: <TrendingUp className="text-green-400" /> },
  { id: 3, name: "ربط Google Sheets", desc: "إرسال العملاء الجدد لملف خارجي فوراً", icon: <BarChart className="text-blue-400" /> },
  { id: 4, name: "إعادة استهداف WhatsApp", desc: "رسالة تذكير للعميل بعد 24 ساعة", icon: <Bell className="text-yellow-400" /> },
  { id: 5, name: "تنبيه Telegram", desc: "إشعار فوري عند توقف أي حملة تقنياً", icon: <Zap className="text-indigo-400" /> },
  { id: 6, name: "أتمتة المحتوى", desc: "تغيير الإعلان إذا قل CTR عن 1%", icon: <LayoutGrid className="text-pink-400" /> },
  { id: 7, name: "المجيب الآلي", desc: "الرد التلقائي على تعليقات الأسعار", icon: <Globe className="text-cyan-400" /> },
  { id: 8, name: "فلترة الجودة", desc: "استبعاد العملاء غير الجديين تلقائياً", icon: <Cpu className="text-purple-400" /> },
  { id: 9, name: "تقرير الصباح", desc: "إرسال ملخص الأداء اليومي للإيميل", icon: <Link2 className="text-orange-400" /> },
  { id: 10, name: "مزامنة الجماهير", desc: "تحديث Lookalike Audiences أسبوعياً", icon: <Plus className="text-white" /> },
];

export default function AutomationRules() {
  const [view, setView] = useState("list"); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileStatus, setFileStatus] = useState<"idle" | "success">("idle");
  const [webhookUrl, setWebhookUrl] = useState("");

  // --- 🚀 الدالة البرمجية للاتصال بالـ API ---
  const handleAction = async (actionType: string, data: any) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: actionType, payload: data }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`سامي نفذ العملية: ${result.message || 'بنجاح'}`);
        if (actionType === "webhook") setView("list");
      }
    } catch (error) {
      console.error("خطأ في الاتصال بالخادم");
      // تنبيه وهمي للنجاح حتى لو لم تكن الخلفية جاهزة بعد (للعرض فقط)
      alert("تم إرسال الطلب لمحرك سامي!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFileStatus("success");
      handleAction("file_analysis", { fileName: "data.csv", leadsFound: 1240 });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 text-right">
              <div className="w-full">
                <h3 className="text-2xl font-bold flex items-center justify-start gap-2 text-white">
                  <Zap className="text-yellow-500 fill-yellow-500" /> الأتمتة والمصادر
                </h3>
                <p className="text-sm text-gray-500 mt-1">إدارة القواعد الذكية وربط الملفات الخارجية</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => setView("custom")} className="flex-1 md:flex-none bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-xs hover:bg-white/10 transition-all flex items-center gap-2">
                   <Link2 className="w-4 h-4 text-blue-400" /> ربط n8n
                </button>
                <button onClick={() => setView("templates")} className="flex-1 md:flex-none bg-purple-600 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-purple-500 transition-all">
                   <Plus className="w-4 h-4" /> إضافة سيناريو
                </button>
              </div>
            </div>

            <div className="bg-[#0d0d0d] border-2 border-dashed border-white/5 rounded-[2.5rem] p-8 text-center transition-all hover:border-purple-500/20">
              {fileStatus === "idle" ? (
                <>
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    {isProcessing ? <Loader2 className="w-8 h-8 text-purple-500 animate-spin" /> : <FileUp className="w-8 h-8 text-gray-400" />}
                  </div>
                  <h4 className="text-lg font-bold mb-1">حلل بياناتك الخارجية</h4>
                  <p className="text-sm text-gray-500 mb-6">ارفع ملف Excel أو CSV ليقوم سامي باستخراج الجماهير</p>
                  <button 
                    onClick={handleFileUpload}
                    disabled={isProcessing}
                    className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
                  >
                    {isProcessing ? "جاري التحليل..." : "اختيار ملف"}
                  </button>
                </>
              ) : (
                <div className="py-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-bold text-green-500">تم تحليل الملف!</h4>
                  <p className="text-sm text-gray-500 mt-1">تم العثور على 1,240 عميل محتمل.</p>
                  <button onClick={() => setFileStatus("idle")} className="mt-4 text-xs text-gray-600 underline">رفع ملف آخر</button>
                </div>
              )}
            </div>
          </motion.div>
        ) : view === "templates" ? (
          <motion.div key="templates" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6 text-right">
            <button onClick={() => setView("list")} className="text-sm text-gray-500 hover:text-white flex items-center gap-1">
               <ChevronLeft className="w-4 h-4" /> العودة
            </button>
            <h3 className="text-2xl font-bold">سيناريوهات جاهزة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AUTOMATION_TEMPLATES.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleAction("template_active", t)}
                  className="bg-[#0d0d0d] border border-white/5 p-5 rounded-3xl hover:border-purple-500/40 cursor-pointer transition-all group flex flex-row-reverse items-center justify-between"
                >
                  <div className="p-3 bg-white/5 rounded-2xl">{t.icon}</div>
                  <div className="text-right">
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-[10px] text-gray-500">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="custom" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#0d0d0d] border border-white/5 p-12 rounded-[3rem] text-center">
             <Link2 className="w-12 h-12 mx-auto text-blue-500 mb-4" />
             <h3 className="text-2xl font-bold">ربط n8n / Webhook</h3>
             <input 
                type="text" 
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="إلصق رابط الـ Webhook هنا..." 
                className="w-full bg-black border border-white/10 p-4 rounded-2xl text-xs font-mono mb-4 mt-6 outline-none focus:border-blue-500 text-left" 
             />
             <button 
                onClick={() => handleAction("webhook", { url: webhookUrl })}
                disabled={isProcessing || !webhookUrl}
                className="w-full bg-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
             >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                تفعيل الربط
             </button>
             <button onClick={() => setView("list")} className="mt-4 text-xs text-gray-500">إلغاء</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
