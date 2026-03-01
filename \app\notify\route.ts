// app/api/notify/route.ts
export async function POST(req: Request) {
  const { phone, message } = await req.json();

  const response = await fetch(`https://api.ultramsg.com/your_instance/messages/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      "token": "your_token",
      "to": phone, // رقم جوال العميل
      "body": `SAMI 🤖: ${message}` // نص التنبيه من سامي
    })
  });

  return Response.json({ success: true });
}
