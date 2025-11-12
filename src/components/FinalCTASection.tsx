import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Ícones SVG customizados sofisticados
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GiftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 6V16M6 6H14M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4V6M11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FinalCTASection = () => {
  const scrollToForm = () => {
    // No mobile, dispara evento para abrir o dialog
    if (window.innerWidth < 1024) {
      window.dispatchEvent(new CustomEvent('openWebinarFormDialog'));
    } else {
      // No desktop, faz scroll para o formulário
      const formElement = document.getElementById("webinar-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Badge
          variant="secondary"
          className="mb-4 sm:mb-5 md:mb-6 bg-urgency text-urgency-foreground border-urgency/30 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold animate-pulse shadow-lg flex items-center gap-1 sm:gap-1.5 mx-auto w-fit"
        >
          <AlertIcon />
          Vagas Limitadas
        </Badge>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight tracking-tight">
          Garanta Sua Vaga{" "}
          <span className="text-accent drop-shadow-lg">Agora</span>
        </h2>

        <p className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-5 md:mb-6 font-medium">
          Próxima turma <span className="font-bold text-accent">26 DE NOVEMBRO ÀS 19H</span>
        </p>

        <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 mb-6 sm:mb-8 md:mb-10 inline-block shadow-2xl hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-white mb-1.5 sm:mb-2">
            <div className="text-accent w-5 h-5 sm:w-6 sm:h-6">
              <GiftIcon />
            </div>
            <p className="font-bold text-base sm:text-lg md:text-xl">Bônus Exclusivo</p>
          </div>
          <p className="text-white/95 text-sm sm:text-base md:text-lg">
            1 vaga de consultoria gratuita para quem tomar ação
          </p>
        </div>

        <Button
          size="lg"
          onClick={scrollToForm}
          className="bg-gradient-to-r from-accent via-accent to-accent-hover hover:from-accent-hover hover:via-accent-hover hover:to-accent text-accent-foreground font-bold text-base sm:text-lg md:text-xl px-6 py-4 sm:px-8 sm:py-5 md:px-12 md:py-7 h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group mb-6 sm:mb-8 md:mb-10"
        >
          GARANTIR MINHA VAGA AGORA
          <ArrowRight className="ml-1.5 sm:ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
        </Button>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-white/90 text-xs sm:text-sm md:text-base">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20">
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              <ClockIcon />
            </div>
            <span className="font-medium">45 minutos + Q&A</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20">
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              <GiftIcon />
            </div>
            <span className="font-medium">100% Gratuito</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20">
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              <AlertIcon />
            </div>
            <span className="font-medium">Sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  );
};
