import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsClient } from "@/app/components/settings-client";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      apiConfigs: true,
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return <SettingsClient user={user} apiConfigs={user.apiConfigs} />;
}

