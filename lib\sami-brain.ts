// lib/sami-brain.ts
export const generateCampaignPlan = async (userPrompt: string, platform: string) => {
  // هنا سيتم الربط مع OpenAI API مستقبلاً
  // حالياً سنقوم بعمل محاكاة ذكية (Mockup)
  
  const plans: any = {
    snapchat: {
      headline: "خصم حصري لمتابعي سناب! 👻",
      description: "احصل على أفضل المنتجات بخصم 20% لفترة محدودة.",
      cta: "تسوق الآن"
    },
    google: {
      headline: "أفضل شركة خدمات في الرياض | جودة وضمان",
      description: "نقدم لك أفضل الحلول التقنية بأسعار تنافسية. اتصل بنا اليوم.",
      cta: "احصل على عرض سعر"
    },
    meta: {
      headline: "انضم لعالم التميز 📱",
      description: "تجربة فريدة تنتظرك مع منتجاتنا الجديدة. شحن مجاني لأول طلب.",
      cta: "ارسل رسالة"
    }
  };

  return plans[platform] || plans['google'];
};
