import { Hero } from "@/components/Hero";
import { UrgencySection } from "@/components/UrgencySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { AudienceSection } from "@/components/AudienceSection";
import { InstructorSection } from "@/components/InstructorSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <UrgencySection />
      <BenefitsSection />
      <AudienceSection />
      <InstructorSection />
    </main>
  );
};

export default Index;
