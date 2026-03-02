export const createTikTokCampaign = async (campaignData: any) => {
  try {
    console.log("🚀 SAMI: جاري إرسال الحملة إلى TikTok...", campaignData);
    
    // محاكاة نجاح العملية
    return { success: true, platform: "TikTok", id: "TT-" + Math.random().toString(36).substr(2, 9) };
  } catch (error) {
    return { success: false, error: "فشل الربط مع تيك توك" };
  }
};
