"use client";
import { useState } from "react";
import { CreditCard, History, Plus, Receipt, CircleDollarSign, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WalletBilling() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-8 text-right" dir="rtl">
      
      {/* القسم العلوي: بطاقات الرصيد */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* محفظة تمويل الحملات */}
        <div className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
          <CircleDollarSign className="absolute -left-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
          <p className="text-sm opacity-80 mb-2">رصيد تمويل الحملات (Ad Spend)</p>
          <h3 className="text-4xl font-black mb-6">12,450.00 SAR</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-green-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform relative z-10"
          >
            <Plus size={18} /> شحن رصيد الحملات
          </button>
        </div>

        {/* اشتراك سامي */}
        <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between">
          <div>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-400">
              <Receipt size={18}/> اشتراك منصة سامي
            </h4>
            <p className="text-xl font-bold">باقة الاحتراف (Premium)</p>
            <p className="text-xs text-gray-500 mt-2 text-left" dir="ltr">Next billing: 12 Mar 2026</p>
          </div>
          <button className="text-purple-400 text-xs font-bold underline hover:text-purple-300 text-right mt-4">
            تحميل الفاتورة القادمة
          </button>
        </div>
      </div>

      {/* --- نافذة شحن الرصيد (Modal) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 relative z-10 shadow-2xl"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute left-6 top-6 text-gray-500 hover:text-white">
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold mb-6 text-center">شحن محفظة الحملات</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">حدد مبلغ الشحن (SAR)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="مثال: 5000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-green-500 transition-all text-xl font-black text-center"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 5000].map(val => (
                    <button 
                      key={val} 
                      onClick={() => setAmount(val.toString())}
                      className="py-2 bg-white/5 rounded-xl text-xs hover:bg-white/10 border border-transparent hover:border-green-500/50"
                    >
                      +{val}
                    </button>
                  ))}
                </div>

                <button className="w-full bg-green-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-500 transition-all">
                   التوجه للدفع الآمن <CreditCard size={18} />
                </button>

                <p className="text-[10px] text-gray-600 text-center leading-relaxed">
                  بمجرد الشحن، سيتم إضافة الرصيد لمحفظتك فوراً لتتمكن من تمويل حملاتك الإعلانية.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* سجل العمليات (كما هو سابقاً) */}
      <div className="bg-[#080808] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
         {/* ... كود الجدول الذي وضعناه سابقاً ... */}
      </div>
    </div>
  );
}
