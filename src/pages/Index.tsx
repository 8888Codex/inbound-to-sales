import { Hero } from "@/components/Hero";
import { UrgencySection } from "@/components/UrgencySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { AudienceSection } from "@/components/AudienceSection";
import { InstructorSection } from "@/components/InstructorSection";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { FloatingCTA } from "@/components/FloatingCTA";
import { InscricaoNotification } from "@/components/InscricaoNotification";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <UrgencySection />
      <BenefitsSection />
      <AudienceSection />
      <InstructorSection />
      <FAQSection />
      <TestimonialsSection />
      <FinalCTASection />
      <FloatingCTA />
      <InscricaoNotification />
    </main>
  );
};

export default Index;
