import { HelpCircle, ShieldCheck, LifeBuoy } from "lucide-react";

export default function SupportPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 text-right" dir="rtl">
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><LifeBuoy className="text-purple-500"/> مركز المساعدة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-[#080808] border border-white/5 rounded-3xl hover:border-purple-500/50 transition-colors cursor-pointer">
            <h4 className="font-bold mb-2">تواصل مع الدعم الفني</h4>
            <p className="text-sm text-gray-500">نحن هنا لمساعدتك عبر الشات المباشر أو التذاكر.</p>
          </div>
          <div className="p-6 bg-[#080808] border border-white/5 rounded-3xl hover:border-purple-500/50 transition-colors cursor-pointer">
            <h4 className="font-bold mb-2">الأسئلة الشائعة</h4>
            <p className="text-sm text-gray-500">إجابات سريعة على تساؤلات الربط والدفع.</p>
          </div>
        </div>
      </section>

      <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-3"><ShieldCheck className="text-green-500"/> الشروط والخصوصية</h2>
        <div className="prose prose-invert max-w-none text-gray-400 text-sm leading-loose">
          <p>باستخدامك لمنصة سامي، أنت توافق على سياسة معالجة البيانات الإعلانية المتبعة لدى المنصات العالمية...</p>
          <ul className="list-disc pr-5">
            <li>يلتزم العميل بصحة البيانات المالية المدخلة.</li>
            <li>سامي وسيط تقني ولا يتحمل مسؤولية سياسات المنصات الخارجية.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
