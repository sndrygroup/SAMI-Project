"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, Users, Target, Wallet, 
  ArrowUpRight, ArrowDownRight, Zap, Clock 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// بيانات افتراضية لأداء الحملات
const data = [
  { name: '1 Mar', spend: 400, roas: 2.4 },
  { name: '2 Mar', spend: 300, roas: 3.1 },
  { name: '3 Mar', spend: 600, roas: 4.5 },
  { name: '4 Mar', spend: 800, roas: 3.8 },
  { name: '5 Mar', spend: 500, roas: 5.2 },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-right" dir="rtl">
      
      {/* 1. الكروت العلوية (Quick Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "الميزانية المستهلكة", value: "SAR 12,450", change: "+14%", icon: <Wallet className="text-blue-400" />, up: true },
          { label: "إجمالي المبيعات", value: "SAR 45,200", change: "+22%", icon: <TrendingUp className="text-green-400" />, up: true },
          { label: "متوسط ROAS", value: "3.8x", change: "-5%", icon: <Target className="text-purple-400" />, up: false },
          { label: "العملاء الجدد", value: "1,120", change: "+18%", icon: <Users className="text-orange-400" />, up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-[#080808] border border-white/5 p-6 rounded-[2rem] hover:border-white/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-gray-500 text-xs mb-1 font-light">{stat.label}</p>
            <h4 className="text-2xl font-black">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. الرسم البياني الرئيسي (Main Analytics) */}
        <div className="lg:col-span-2 bg-[#080808] border border-white/5 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">تحليل الأداء الزمني</h3>
            <select className="bg-white/5 border border-white/10 text-xs p-2 rounded-xl outline-none">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="spend" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. توصيات سامي الذكية (AI Insights) */}
        <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
          <Zap className="absolute top-4 left-4 text-purple-500 w-12 h-12 opacity-10" />
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500 fill-purple-500" /> توصيات سامي
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-all cursor-pointer">
              <p className="text-xs text-purple-400 font-bold mb-1">فرصة تحسين</p>
              <p className="text-sm text-gray-300">حملة "رمضان 1" تحقق ROAS عالٍ. هل تريد زيادة الميزانية 20%؟</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-red-500/30 transition-all cursor-pointer">
              <p className="text-xs text-red-400 font-bold mb-1">تنبيه ميزانية</p>
              <p className="text-sm text-gray-300">معدل الصرف في تيك توك تجاوز المتوقع بـ 15% اليوم.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-[11px] text-gray-500">آخر تحديث للبيانات: منذ 5 دقائق</p>
            </div>
          </div>
          <button className="w-full mt-6 bg-white text-black py-3 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform">
            تطبيق كل التوصيات
          </button>
        </div>
      </div>
    </div>
  );
}
