// import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AllProvider from "@/providers/AllProvider";
import LayoutChrome from "@/components/shared/LayoutChrome";

// Font configurations
const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
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
          <meta name="description" content="AlatChat AI replies to your customers on WhatsApp instantly — even when you're busy or offline. WhatsApp automation built for artisans and small businesses." />
          <meta name="keywords" content="AlatChat, WhatsApp automation, WhatsApp AI, customer support automation, small business, AI chat assistant" />
          <meta name="author" content="AlatChat AI" />
          <link rel="canonical" href="https://alatchat.com" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://alatchat.com" />
          <meta property="og:title" content="AlatChat AI — Reply to every customer on WhatsApp" />
          <meta property="og:description" content="AI WhatsApp automation that answers your customers instantly, escalates the hard questions to you, and never goes offline." />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://alatchat.com" />
          <meta name="twitter:title" content="AlatChat AI — Reply to every customer on WhatsApp" />
          <meta name="twitter:description" content="AI WhatsApp automation that answers your customers instantly, escalates the hard questions to you, and never goes offline." />

          {/* Additional SEO */}
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
        <title>AlatChat AI — WhatsApp automation for small businesses</title>
      </head>

      <body
        className={`${inter.className} antialiased bg-white text-ink selection:bg-brand/30 selection:text-ink`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>

        <AllProvider>
          <LayoutChrome>{children}</LayoutChrome>
        </AllProvider>
      </body>
    </html>
  );
}
