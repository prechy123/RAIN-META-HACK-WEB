"use client";

import { Bell, Menu, ChevronDown } from "lucide-react";
import { useBusiness } from "@/providers/BusinessProvider";

export default function DashboardTopbar({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  const { business } = useBusiness();
  const initial = business.businessName?.trim()?.[0]?.toUpperCase() || "B";

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-1 text-ink md:hidden"
        >
          <Menu className="size-6" />
        </button>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-ink-soft transition-colors hover:text-ink"
        >
          <Bell className="size-6" />
          <span className="absolute right-0.5 top-0.5 size-2 rounded-full bg-brand" />
        </button>
        <div className="flex items-center gap-1">
          <span className="flex size-9 items-center justify-center rounded-full border border-ink/20 text-sm font-semibold text-ink">
            {initial}
          </span>
          <ChevronDown className="size-4 text-ink-soft" />
        </div>
      </div>
    </header>
  );
}
