
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { PricingSection } from "@/components/landing/PricingSection";

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
        <div id="team">
          <TeamSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
      </main>
    </>
  );
}
