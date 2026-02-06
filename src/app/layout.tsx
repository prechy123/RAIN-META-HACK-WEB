// import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AllProvider from "@/providers/AllProvider";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

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
        {/* SEO Meta Tags */}
          <meta name="description" content="AlatChat - AI-powered chat assistant for intelligent conversations and real-time assistance" />
          <meta name="keywords" content="AlatChat, AI chat, chat assistant, artificial intelligence, conversational AI" />
          <meta name="author" content="AlatChat" />
          <link rel="canonical" href="https://alatchat.com" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://alatchat.com" />
          <meta property="og:title" content="AlatChat - AI-Powered Chat Assistant" />
          <meta property="og:description" content="Experience intelligent conversations with AlatChat's AI-powered chat assistant" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://alatchat.com" />
          <meta name="twitter:title" content="AlatChat - AI-Powered Chat Assistant" />
          <meta name="twitter:description" content="Experience intelligent conversations with AlatChat's AI-powered chat assistant" />
          
          {/* Additional SEO */}
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
        <title>AlatChat</title>
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
          <Header />
          <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
          <Footer />
        </AllProvider>
      </body>
    </html>
  );
}
