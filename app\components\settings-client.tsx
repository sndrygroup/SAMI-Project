"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ApiConfig } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Loader2, Trash2 } from "lucide-react";

interface SettingsClientProps {
  user: User;
  apiConfigs: ApiConfig[];
}

export function SettingsClient({ user, apiConfigs: initialApiConfigs }: SettingsClientProps) {
  const [name, setName] = useState(user.name || "");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const router = useRouter();
  
  const [apiConfigs, setApiConfigs] = useState(initialApiConfigs);
  const [newApiKey, setNewApiKey] = useState("");
  const [newApiPlatform, setNewApiPlatform] = useState("SNAPCHAT");
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);
    setProfileError("");
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to update profile.");
      router.refresh();
    } catch (err: any) {
      setProfileError(err.message);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleAddApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApiLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/settings/apikeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: newApiPlatform, apiKey: newApiKey }),
      });
      if (!response.ok) throw new Error("Failed to add API key.");
      const newConfig = await response.json();
      setApiConfigs([...apiConfigs, newConfig]);
      setNewApiKey("");
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsApiLoading(false);
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    try {
      await fetch("/api/settings/apikeys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setApiConfigs(apiConfigs.filter((config) => config.id !== id));
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">الإعدادات</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>الملف الشخصي</CardTitle>
            <CardDescription>قم بتحديث معلوماتك الشخصية.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              {profileError && <p className="text-red-500 text-center">{profileError}</p>}
              <Input value={user.email || ""} readOnly disabled className="text-gray-400" />
              <Input
                placeholder="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" disabled={isProfileLoading}>
                {isProfileLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                حفظ التغييرات
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* API Keys Card */}
        <Card>
          <CardHeader>
            <CardTitle>إدارة مفاتيح الربط (API)</CardTitle>
            <CardDescription>أضف أو احذف مفاتيح الربط مع المنصات الإعلانية.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddApiKey} className="space-y-4 mb-6">
              {apiError && <p className="text-red-500 text-center">{apiError}</p>}
              <select
                value={newApiPlatform}
                onChange={(e) => setNewApiPlatform(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white"
              >
                <option value="SNAPCHAT">Snapchat</option>
                <option value="TIKTOK">TikTok</option>
                <option value="META">Meta</option>
              </select>
              <Input
                placeholder="مفتاح API"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
              />
              <Button type="submit" disabled={isApiLoading} className="w-full">
                {isApiLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                إضافة مفتاح جديد
              </Button>
            </form>
            <div className="space-y-3">
              {apiConfigs.map((config) => (
                <div key={config.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-bold">{config.platform}</p>
                    <p className="text-xs text-gray-400">****{config.apiKey.slice(-4)}</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteApiKey(config.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

