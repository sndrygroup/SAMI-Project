// lib/sami-engine.ts
export async function getSamiResponse(userMessage: string, campaignData: any) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `أنت "سامي"، خبير تسويق رقمي ذكي جداً. 
          لديك صلاحية الوصول لبيانات الحملات التالية: ${JSON.stringify(campaignData)}.
          أجب باختصار، بلهجة سعودية بيضاء مهنية، وركز على الأرقام والحلول.`
        },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}
