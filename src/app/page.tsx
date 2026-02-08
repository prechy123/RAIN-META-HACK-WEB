import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { PricingSection } from "@/components/landing/PricingSection";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        {/* <div id="team">
          <TeamSection />
        </div> */}
        {/* <div id="pricing">
          <PricingSection />
        </div> */}
      </main>

      {/* Floating Chat Button */}
      <Link
        href="/main/chatbot"
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-[#7DD3C0] hover:bg-[#6BC2AF] text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 group"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7  transition-transform duration-300" />
        <span className="sr-only">Open Chat</span>
      </Link>
    </>
  );
}
