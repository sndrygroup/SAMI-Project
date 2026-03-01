// components/analytics-view.tsx
"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, MousePointer2, Target, DollarSign } from "lucide-react";

const data = [
  { name: 'Sat', clicks: 400, conv: 24 },
  { name: 'Sun', clicks: 300, conv: 13 },
  { name: 'Mon', clicks: 900, conv: 98 },
  { name: 'Tue', clicks: 1400, conv: 120 },
  { name: 'Wed', clicks: 1100, conv: 80 },
  { name: 'Thu', clicks: 1800, conv: 150 },
  { name: 'Fri', clicks: 2100, conv: 190 },
];

export default function AnalyticsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي النقرات", value: "8,432", icon: <MousePointer2 />, color: "text-blue-400" },
          { label: "التحويلات", value: "642", icon: <Target />, color: "text-green-400" },
          { label: "نسبة النمو", value: "+12.5%", icon: <TrendingUp />, color: "text-purple-400" },
          { label: "الميزانية المصروفة", value: "$1,240", icon: <DollarSign />, color: "text-yellow-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0d0d0d] border border-white/5 p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>{stat.icon}</div>
              <span className="text-[10px] text-gray-500 uppercase font-bold">Real-time</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* الرسم البياني الرئيسي */}
      <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl h-[400px]">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <div className="w-1 h-4 bg-purple-500 rounded-full" />
          أداء الحملات الأسبوعي
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
            <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
