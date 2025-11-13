import { useEffect } from "react";
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
import { TrackingScripts } from "@/components/TrackingScripts";
import { usePageTracking } from "@/hooks/usePageTracking";

const Index = () => {
  const visitId = usePageTracking();

  // Armazenar visitId no sessionStorage para uso no formulário
  useEffect(() => {
    if (visitId) {
      sessionStorage.setItem('current_visit_id', visitId);
    }
  }, [visitId]);

  return (
    <main className="min-h-screen">
      <TrackingScripts />
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
