"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Business } from "@/services/authService";
import { BusinessProvider } from "@/providers/BusinessProvider";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

function titleFor(pathname: string): string {
  if (pathname.startsWith("/main/dashboard/hours")) return "Business Hours";
  if (pathname.startsWith("/main/dashboard/faqs")) return "FAQ Management";
  if (pathname.startsWith("/main/dashboard/products"))
    return "Product/Services Management";
  if (pathname.startsWith("/main/dashboard/settings")) return "Settings";
  return "Dashboard";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [business, setBusiness] = useState<Business | null>(null);
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Legacy edit route keeps its own standalone layout.
  const isEditRoute = pathname.startsWith("/main/dashboard/edit");

  useEffect(() => {
    if (isEditRoute) {
      setReady(true);
      return;
    }
    const stored = localStorage.getItem("businessData");
    if (!stored) {
      router.replace("/main/signin");
      return;
    }
    try {
      setBusiness(JSON.parse(stored));
      setReady(true);
    } catch {
      router.replace("/main/signin");
    }
  }, [router, isEditRoute]);

  if (isEditRoute) return <>{children}</>;

  if (!ready || !business) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-soft/40">
        <p className="text-ink-soft">Loading...</p>
      </div>
    );
  }

  return (
    <BusinessProvider initialBusiness={business}>
      <div className="min-h-screen bg-brand-soft/40 p-3 sm:p-4">
        <div className="mx-auto flex max-w-7xl gap-4">
          {/* Desktop sidebar */}
          <aside className="hidden w-[260px] shrink-0 md:block">
            <div className="sticky top-4 h-[calc(100vh-2rem)]">
              <DashboardSidebar />
            </div>
          </aside>

          {/* Mobile sidebar */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" className="w-[280px] p-3">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Main */}
          <div className="min-w-0 flex-1">
            <DashboardTopbar
              title={titleFor(pathname)}
              onMenuClick={() => setMobileOpen(true)}
            />
            <main className="pb-10">{children}</main>
          </div>
        </div>
      </div>
    </BusinessProvider>
  );
}
