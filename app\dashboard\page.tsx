"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.sender, content: m.text })) }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiMessage: Message | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        
        if (!aiMessage) {
          aiMessage = { id: (Date.now() + 1).toString(), text: chunk, sender: "ai" };
          setMessages((prev) => [...prev, aiMessage as Message]);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage!.id ? { ...msg, text: msg.text + chunk } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I'm having trouble connecting. Please try again later.", sender: "ai" };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-10rem)]">
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">محادثة سامي</h1>
      
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-start gap-4",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "ai" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Bot size={22} className="text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-lg p-4 rounded-2xl",
                    message.sender === "user"
                      ? "bg-white/10 text-white rounded-br-none"
                      : "bg-[#1f1e25] text-gray-300 rounded-bl-none"
                  )}
                >
                  <p className="text-base leading-relaxed">{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                    <User size={22} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 justify-start"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Bot size={22} className="text-white" />
                </div>
                <div className="max-w-lg p-4 rounded-2xl bg-[#1f1e25] text-gray-300 rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <div className="p-4 border-t border-white/10">
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل سامي أي شيء عن التسويق..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send size={20} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
