"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SidebarLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className={cn(
      "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300",
      active 
        ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-900/20" 
        : "text-gray-400 hover:bg-white/10 hover:text-white"
    )}>
      {icon} <span>{label}</span>
    </Link>
  );
}
