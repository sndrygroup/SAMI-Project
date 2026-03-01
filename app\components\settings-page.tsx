"use client";
import { useState } from "react";
import { 
  Settings, Link2, Bell, Lock, Save, 
  MessageCircle, Smartphone, CheckCircle2, Shield, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("integrations");
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-right" dir="rtl">
      {/* العناوين */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-purple-600/20 rounded-2xl">
          <Settings className="text-purple-500 w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-black">الإعدادات</h2>
          <p className="text-gray-500 text-sm">إدارة الربط، التنبيهات، وحسابك الشخصي</p>
        </div>
      </div>

      {/* التبويبات */}
      <div className="flex gap-2 border-b border-white/5 pb-4">
        <button 
          onClick={() => setActiveTab("integrations")} 
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all ${activeTab === "integrations" ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-white/5"}`}
        >
          <Link2 size={16} /> ربط المنصات
        </button>
        <button 
          onClick={() => setActiveTab("notifications")} 
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all ${activeTab === "notifications" ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-white/5"}`}
        >
          <Bell size={16} /> التنبيهات (واتساب)
        </button>
      </div>

      {/* --- محتوى تبويب ربط المنصات (الجزء الذي كان مفقوداً) --- */}
      {activeTab === "integrations" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3 text-amber-500 text-xs font-bold">
            <AlertCircle size={18} />
            تأكد من إدخال مفاتيح المطورين (Developer Tokens) بشكل صحيح لضمان عمل سامي بدقة.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IntegrationCard name="Snapchat Ads" icon="https://www.snapchat.com/favicon.ico" fields={["Client ID", "Client Secret"]} />
            <IntegrationCard name="Meta Ads" icon="https://www.facebook.com/favicon.ico" fields={["Access Token", "Ad Account ID"]} />
            <IntegrationCard name="TikTok Ads" icon="https://www.tiktok.com/favicon.ico" fields={["Developer Token", "App ID"]} />
            <IntegrationCard name="Google Ads" icon="https://www.google.com/favicon.ico" fields={["Developer Token", "Customer ID"]} />
          </div>
        </motion.div>
      )}

      {/* --- محتوى تبويب التنبيهات (واتساب) --- */}
      {activeTab === "notifications" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl transition-all"></div>
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-500/10 rounded-2xl text-green-500"><MessageCircle size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg text-white">تنبيهات واتساب الذكية</h4>
                  <p className="text-xs text-gray-500 mt-1">استلم تقارير الحملات مباشرة على جوالك</p>
                </div>
              </div>
              <button 
                onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                className={`w-14 h-8 rounded-full p-1 transition-all ${whatsappEnabled ? 'bg-green-600' : 'bg-white/10'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${whatsappEnabled ? 'translate-x-0' : '-translate-x-6'}`}></div>
              </button>
            </div>

            <AnimatePresence>
              {whatsappEnabled && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 relative z-10 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-500 mb-2 block mr-2">رقم الجوال (9665xxxxxxxx)</label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="9665xxxxxxxx" className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 pl-12 text-sm outline-none focus:border-green-500 transition-all text-left" dir="ltr" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <button className="bg-green-600/10 text-green-500 border border-green-600/20 py-4 rounded-2xl font-bold text-xs hover:bg-green-600/20 transition-all">إرسال رسالة تحقق (Test)</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-sm text-white">تشفير البيانات</h4>
                <p className="text-[10px] text-gray-500">بياناتك محمية بنظام AES-256</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">محمي</span>
          </div>
        </motion.div>
      )}

      {/* زر الحفظ الثابت */}
      <div className="flex justify-end pt-6">
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl transition-all">
          <Save size={20} /> حفظ الإعدادات
        </button>
      </div>
    </div>
  );
}

// مكون فرعي لبطاقات الربط (مهم جداً لكي لا يتكرر الكود)
function IntegrationCard({ name, icon, fields }: { name: string, icon: string, fields: string[] }) {
  return (
    <div className="bg-[#080808] border border-white/5 p-6 rounded-[2.5rem] hover:border-purple-500/30 transition-all group">
      <div className="flex items-center gap-3 mb-6">
        <img src={icon} className="w-6 h-6 rounded-md grayscale group-hover:grayscale-0 transition-all" alt={name} />
        <h4 className="font-bold text-sm text-white">{name}</h4>
        <span className="mr-auto text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded-full font-bold">غير متصل</span>
      </div>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field}>
            <label className="text-[10px] text-gray-500 mb-1 block mr-2">{field}</label>
            <input type="password" placeholder={`أدخل ${field}...`} className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs outline-none focus:border-purple-500 transition-all text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
