"use client";
import { Bell, Zap, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      title: "ميزانية منخفضة!",
      desc: "رصيد محفظة الحملات أقل من 500 ريال. اشحن الآن لتجنب توقف الإعلانات.",
      type: "warning",
      time: "منذ 5 دقائق"
    },
    {
      id: 2,
      title: "أداء استثنائي لسامي",
      desc: "حملة سناب شات حققت ROAS (عائد استثمار) بنسبة 4.5x اليوم.",
      type: "success",
      time: "منذ ساعتين"
    },
    {
      id: 3,
      title: "ربط جديد",
      desc: "تم ربط حساب TikTok Ads بنجاح بمفتاح الربط الخاص بك.",
      type: "info",
      time: "منذ يوم"
    }
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto text-right" dir="rtl">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Bell className="text-purple-500" /> التنبيهات الذكية
      </h3>
      
      {notifications.map((n) => (
        <motion.div 
          key={n.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#080808] border border-white/5 p-5 rounded-[1.5rem] flex items-start gap-4 hover:border-purple-500/30 transition-all"
        >
          <div className={`p-3 rounded-xl ${
            n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
            n.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
          }`}>
            {n.type === 'warning' && <AlertTriangle size={20} />}
            {n.type === 'success' && <CheckCircle size={20} />}
            {n.type === 'info' && <Info size={20} />}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-bold text-sm">{n.title}</h4>
              <span className="text-[10px] text-gray-500">{n.time}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{n.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
