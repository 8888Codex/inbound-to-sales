import { Hero } from "@/components/Hero";
import { UrgencySection } from "@/components/UrgencySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { AudienceSection } from "@/components/AudienceSection";
import { InstructorSection } from "@/components/InstructorSection";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCTASection } from "@/components/FinalCTASection";

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
    </main>
  );
};

export default Index;
