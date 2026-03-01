"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, AlertCircle, Sparkles } from "lucide-react";

const tasks = [
  { id: 1, title: "الرد على عملاء حملة سناب شات", priority: "high", time: "منذ ساعتين", status: "pending" },
  { id: 2, title: "تجديد ميزانية إعلان تيك توك", priority: "urgent", time: "الآن", status: "alert" },
  { id: 3, title: "تحميل تقرير أداء شهر مايو", priority: "medium", time: "اليوم", status: "completed" },
  { id: 4, title: "متابعة العميل 'أحمد محمد' على واتساب", priority: "high", time: "غداً", status: "pending" },
];

export default function SamiTasks() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-white">مهام اقترحها سامي</h3>
      </div>
      <div className="grid gap-3">
        {tasks.map((task, i) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0d0d0d] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-4 text-right">
              {task.status === "completed" ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : task.status === "alert" ? (
                <AlertCircle className="w-6 h-6 text-red-500 animate-pulse" />
              ) : (
                <Circle className="w-6 h-6 text-gray-600" />
              )}
              <div>
                <p className={`font-medium ${task.status === "completed" ? "line-through text-gray-600" : "text-gray-200"}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-gray-500 italic">{task.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
