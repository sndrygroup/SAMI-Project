import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AnalyticsClient } from "@/app/components/analytics-client";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const campaigns = await prisma.campaign.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const platformData = campaigns.reduce((acc, campaign) => {
    const platform = campaign.platform;
    if (!acc[platform]) {
      acc[platform] = { name: platform, budget: 0, spent: 0 };
    }
    acc[platform].budget += campaign.budget;
    acc[platform].spent += campaign.spent;
    return acc;
  }, {} as Record<string, { name: string, budget: number, spent: number }>);

  return <AnalyticsClient campaigns={campaigns} platformData={Object.values(platformData)} />;
}

