"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Campaign } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { PlusCircle, Loader2 } from "lucide-react";

interface CampaignsClientProps {
  campaigns: Campaign[];
}

export function CampaignsClient({ campaigns }: CampaignsClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignPlatform, setNewCampaignPlatform] = useState("SNAPCHAT");
  const [newCampaignBudget, setNewCampaignBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCampaignName,
          platform: newCampaignPlatform,
          budget: newCampaignBudget,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create campaign");
      }
      
      setIsCreateModalOpen(false);
      router.refresh(); // Refresh server component data
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">مركز الحملات</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle size={20} className="ml-2" />
          إنشاء حملة جديدة
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>لم يتم العثور على حملات</CardTitle>
            <CardDescription>ابدأ بإنشاء حملتك الأولى.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>المنصة: {campaign.platform}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    campaign.status === "ACTIVE" ? "bg-green-500/20 text-green-400" :
                    campaign.status === "PAUSED" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    {campaign.status}
                  </span>
                  <div className="text-right">
                    <p className="text-lg font-bold">${campaign.spent.toFixed(2)} / ${campaign.budget.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">المصروف / الميزانية</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>إنشاء حملة جديدة</CardTitle>
              <CardDescription>املأ التفاصيل أدناه لبدء حملتك الجديدة.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCampaign} className="space-y-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Input
                  placeholder="اسم الحملة"
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  required
                />
                <select
                  value={newCampaignPlatform}
                  onChange={(e) => setNewCampaignPlatform(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                >
                  <option value="SNAPCHAT">Snapchat</option>
                  <option value="TIKTOK">TikTok</option>
                  <option value="META">Meta</option>
                  <option value="GOOGLE">Google</option>
                  <option value="LINKEDIN">LinkedIn</option>
                </select>
                <Input
                  type="number"
                  placeholder="الميزانية"
                  value={newCampaignBudget}
                  onChange={(e) => setNewCampaignBudget(e.target.value)}
                  required
                  min="1"
                />
                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="secondary" type="button" onClick={() => setIsCreateModalOpen(false)} disabled={isLoading}>
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    إنشاء الحملة
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

