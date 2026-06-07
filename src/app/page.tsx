import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <div className="bg-white">
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
      </div>

      {/* Floating Chat Button */}
      <Link
        href="/main/chatbot"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-0 rounded-full bg-brand text-ink shadow-lg transition-all duration-300 hover:bg-brand-hover hover:shadow-2xl"
      >
        <span className="flex size-14 items-center justify-center md:size-16">
          <MessageCircle className="size-6 md:size-7" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[140px] group-hover:pr-5">
          Chat with us
        </span>
        <span className="sr-only">Open chat</span>
      </Link>
    </>
  );
}
