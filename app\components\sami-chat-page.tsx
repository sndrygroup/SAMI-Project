"use client";
import { useState } from "react";
// تأكد من أن المسار هنا يبدأ بـ .. للرجوع لمجلد app
import { askSami } from "../actions/sami"; 

export default function SamiChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: "user" | "assistant", content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await askSami(input); // استدعاء الدالة من الملف الآخر
      setMessages(prev => [...prev, { role: "assistant" as const, content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "المعذرة، واجهت مشكلة في الاتصال." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
       {/* كود الواجهة الخاص بك هنا */}
    </div>
  );
}
