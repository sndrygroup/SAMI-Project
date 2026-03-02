// استيراد المحركات الجاهزة (MVP)
import { createSnapchatCampaign } from "./snapchat";
import { createTikTokCampaign } from "./tiktok";
import { createGoogleAdsCampaign } from "./google-ads";
import { createGooglePlayCampaign } from "./google-play";
import { createMetaCampaign } from "./meta";
import { createAppleAdsCampaign } from "./apple";
import { createSamsungAdsCampaign } from "./samsung";
import { createMicrosoftAdsCampaign } from "./microsoft";
import { createLinkedInCampaign } from "./linkedin";
import { createPinterestCampaign } from "./pinterest";
import { createTelegramCampaign } from "./telegram";

export const executeCampaign = async (platformId: string, data: any) => {
  switch (platformId) {
    case "snapchat":
      return await createSnapchatCampaign(data);
    
    case "tiktok":
      return await createTikTokCampaign(data);
    
    case "google":
      return await createGoogleAdsCampaign(data);
    
    case "playstore":
      return await createGooglePlayCampaign(data);
    
    case "meta":
      return await createMetaCampaign(data);

    case "appstore":
      return await createAppleAdsCampaign(data);

    case "samsung":
      return await createSamsungAdsCampaign(data);

    case "microsoft":
      return await createMicrosoftAdsCampaign(data);

    case "linkedin":
      return await createLinkedInCampaign(data);

    case "pinterest":
      return await createPinterestCampaign(data);

    case "telegram":
      return await createTelegramCampaign(data);

    // الـ default دائماً في الأخير للتعامل مع أي منصة غير معروفة
    default:
      return { 
        success: false, 
        message: `المنصة ذات المعرف (${platformId}) غير مدعومة برمجياً حالياً.` 
      };
  }
};
