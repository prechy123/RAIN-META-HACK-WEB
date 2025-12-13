// import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AllProvider from "@/providers/AllProvider";

// Font configurations
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Viewport configuration (Next.js 14+ way)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>RAIN HACK PROJECT</title>
      </head>

      <body
        className={`${poppins.className} antialiased bg-black text-white selection:bg-purple-500/20 selection:text-purple-100`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>

        <AllProvider>
          <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </AllProvider>
      </body>
    </html>
  );
}
