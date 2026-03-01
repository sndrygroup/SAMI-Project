"use client";
import { 
  Users, DollarSign, Activity, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Search, Filter,
  CheckCircle, XCircle, MoreVertical, ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { title: "إجمالي المشتركين", value: "1,254", icon: <Users />, color: "text-blue-500", trend: "+12%" },
    { title: "إجمالي الرصيد (المحافظ)", value: "450,000 SAR", icon: <DollarSign />, color: "text-green-500", trend: "+25%" },
    { title: "حملات نشطة حالياً", value: "342", icon: <Activity />, color: "text-purple-500", trend: "+5%" },
    { title: "صافي الأرباح (الاشتراكات)", value: "85,200 SAR", icon: <TrendingUp />, color: "text-amber-500", trend: "+18%" },
  ];

  const users = [
    { name: "أحمد العتيبي", plan: "Expert", balance: "12,450 SAR", status: "Active", joinDate: "2026-02-01" },
    { name: "سارة الشمري", plan: "Professional", balance: "3,200 SAR", status: "Active", joinDate: "2026-02-15" },
    { name: "مؤسسة الحلول", plan: "Expert", balance: "0 SAR", status: "Inactive", joinDate: "2026-01-10" },
    { name: "خالد بن محمد", plan: "Basic", balance: "550 SAR", status: "Active", joinDate: "2026-02-28" },
  ];

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* هيدر الإدارة */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3">
            <ShieldCheck className="text-purple-500" size={32} /> لوحة إدارة سامي
          </h2>
          <p className="text-gray-500 text-sm mt-1">مرحباً بك في غرفة التحكم، إليك نظرة على أداء المنصة اليوم.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input type="text" placeholder="بحث عن مستخدم..." className="bg-white/5 border border-white/10 rounded-2xl py-3 pr-12 pl-4 text-xs outline-none focus:border-purple-500 w-64" />
          </div>
          <button className="bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#080808] border border-white/5 p-6 rounded-[2rem] hover:border-purple-500/20 transition-all"
          >
            <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-xs font-bold">{stat.title}</p>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-2xl font-black">{stat.value}</h3>
              <span className="text-green-500 text-[10px] font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                {stat.trend} <ArrowUpRight size={12} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* جدول إدارة المستخدمين */}
      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h4 className="font-bold">قائمة المستخدمين النشطين</h4>
          <button className="text-purple-500 text-xs font-bold hover:underline">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-white/5 text-gray-500 font-bold">
              <tr>
                <th className="p-6">المستخدم</th>
                <th className="p-6">الباقة</th>
                <th className="p-6">رصيد المحفظة</th>
                <th className="p-6">الحالة</th>
                <th className="p-6">تاريخ الانضمام</th>
                <th className="p-6">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-all group">
                  <td className="p-6 font-bold">{user.name}</td>
                  <td className="p-6">
                    <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-[10px] font-black">
                      {user.plan}
                    </span>
                  </td>
                  <td className="p-6 font-black text-green-500">{user.balance}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      {user.status === "Active" ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-gray-500" />}
                      <span className={user.status === "Active" ? "text-white" : "text-gray-500"}>{user.status === "Active" ? "نشط" : "غير نشط"}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-500 font-mono text-xs">{user.joinDate}</td>
                  <td className="p-6">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
