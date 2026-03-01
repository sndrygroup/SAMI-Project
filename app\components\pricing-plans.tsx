export const PricingPlans = () => {
  const plans = [
    { name: "الباقة الأساسية", price: "299", features: ["5 منصات", "دعم فني إيميل", "تقارير شهرية"] },
    { name: "باقة النمو", price: "599", features: ["كل المنصات", "دعم فني 24/7", "ذكاء اصطناعي متقدم"], popular: true },
    { name: "باقة الشركات", price: "1299", features: ["إدارة حسابات متعددة", "API خاص", "مستشار تسويقي"] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
      {plans.map((plan) => (
        <div key={plan.name} className={`p-8 rounded-[3rem] border ${plan.popular ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-black'} relative`}>
          {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs">الأكثر طلباً</span>}
          <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
          <div className="text-4xl font-black mb-6">{plan.price} <span className="text-sm font-normal text-gray-500">SAR/شهر</span></div>
          <ul className="space-y-4 mb-8">
            {plan.features.map(f => <li key={f} className="text-sm text-gray-400 flex items-center gap-2">✅ {f}</li>)}
          </ul>
          <button className={`w-full py-4 rounded-2xl font-bold ${plan.popular ? 'bg-purple-600' : 'bg-white text-black'}`}>اشترك الآن</button>
        </div>
      ))}
    </div>
  );
}
