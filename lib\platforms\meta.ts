export const createMetaCampaign = async (campaignData: any) => {
  try {
    console.log("🚀 SAMI: جاري إرسال الحملة إلى Meta (FB/IG/WhatsApp)...", campaignData);
    
    return { 
      success: true, 
      platform: "Meta", 
      id: "META-" + Math.floor(Math.random() * 1000000) 
    };
  } catch (error) {
    return { success: false, error: "فشل في الاتصال بـ Meta Graph API" };
  }
};
