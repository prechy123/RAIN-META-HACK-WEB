"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

// Routes that render their own full-screen layout (auth + onboarding + dashboard)
// and should not show the global marketing Header/Footer.
const BARE_ROUTES = new Set(["/main", "/main/signin", "/main/onboarding"]);

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (BARE_ROUTES.has(pathname) || pathname.startsWith("/main/dashboard")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
