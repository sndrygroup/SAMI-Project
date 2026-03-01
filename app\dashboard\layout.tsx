import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SidebarLink } from "@/app/components/sidebar-link";
import { MessageSquare, Rocket, BarChart3, Palette, LogOut, Wallet, Settings } from "lucide-react";
import { DashboardHeader } from "@/app/components/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen bg-[#111015] text-[#EAEAEB] overflow-hidden" dir="rtl">
      <aside className="w-72 bg-gradient-to-b from-[#16151C] to-[#111015] border-l border-white/5 flex flex-col shrink-0 relative z-20">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <span className="text-2xl font-bold italic tracking-tighter text-white">SAM<span className="text-violet-500">I</span></span>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e] border border-green-300/50" />
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-4 mt-2 px-3 text-right italic">القائمة الرئيسية</p>
           <SidebarLink href="/dashboard" icon={<MessageSquare size={18}/>} label="محادثة سامي" />
           <SidebarLink href="/dashboard/campaigns" icon={<Rocket size={18}/>} label="مركز الحملات" />
           <SidebarLink href="/dashboard/analytics" icon={<BarChart3 size={18}/>} label="التحليلات الذكية" />
           <SidebarLink href="/dashboard/billing" icon={<Wallet size={18}/>} label="المحفظة والفواتير" />
           <SidebarLink href="/dashboard/settings" icon={<Settings size={18}/>} label="الإعدادات" />
        </nav>
        {/* The logout button will be in the header */}
      </aside>
      <main className="flex-1 flex flex-col relative bg-[#0A090C]">
        <DashboardHeader user={session.user} />
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}

