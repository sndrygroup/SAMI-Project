"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Zap, Target } from "lucide-react";

const performanceData = [
  { name: 'سناب شات', spend: 4000, revenue: 9500, leads: 120 },
  { name: 'تيك توك', spend: 3000, revenue: 12000, leads: 250 },
];

const COLORS = ['#FFFC00', '#FE2C55'];

export default function AdvancedReports() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* ملخص الأداء السريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl">
          <Award className="w-8 h-8 text-yellow-500 mb-2" />
          <p className="text-gray-500 text-xs">أفضل منصة أداءً</p>
          <p className="text-xl font-bold">تيك توك</p>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl">
          <Zap className="w-8 h-8 text-purple-500 mb-2" />
          <p className="text-gray-500 text-xs">متوسط $ROAS$</p>
          <p className="text-xl font-bold">3.2x</p>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl">
          <Target className="w-8 h-8 text-green-500 mb-2" />
          <p className="text-gray-500 text-xs">إجمالي العملاء</p>
          <p className="text-xl font-bold">370 عميل</p>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-3xl">
          <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-gray-500 text-xs">نمو المبيعات</p>
          <p className="text-xl font-bold">+24%</p>
        </div>
      </div>

      {/* مقارنة المصروفات مقابل الأرباح */}
      <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem]">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
          <div className="w-2 h-6 bg-purple-600 rounded-full" />
          مقارنة العوائد بين المنصات
        </h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
              <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '15px' }}
                cursor={{fill: '#ffffff05'}}
              />
              <Legend iconType="circle" />
              <Bar dataKey="spend" name="الميزانية ($)" fill="#444" radius={[10, 10, 0, 0]} />
              <Bar dataKey="revenue" name="الأرباح ($)" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
