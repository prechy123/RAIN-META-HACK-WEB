"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Store,
  Clock,
  MessageCircleQuestion,
  Boxes,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/main/dashboard", label: "Dashboard", icon: Store },
  { href: "/main/dashboard/hours", label: "Business Hours", icon: Clock },
  { href: "/main/dashboard/faqs", label: "FAQs", icon: MessageCircleQuestion },
  {
    href: "/main/dashboard/products",
    label: "Products/Services",
    icon: Boxes,
  },
  { href: "/main/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("businessData");
    router.push("/main/signin");
  };

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-6 flex items-center gap-2 px-2 pt-2">
        <Image
          src="/logo2.jpeg"
          alt="AlatChat AI"
          width={36}
          height={36}
          className="rounded-md"
        />
        <span className="text-sm font-bold tracking-tight text-ink">
          AlatChat AI
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/main/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                active
                  ? "border border-brand bg-white text-ink shadow-sm"
                  : "text-ink-soft hover:bg-brand-soft/60 hover:text-ink",
              )}
            >
              <Icon
                className={cn("size-5", active ? "text-brand-ink" : "")}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-ink/10 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut className="size-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
