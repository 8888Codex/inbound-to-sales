import { useEffect, useState } from "react";
import { WebinarForm } from "./WebinarForm";
import leadsGapChart from "@/assets/leads-gap-chart.png";
import { ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LetterGlitch from "./LetterGlitch";
import { trackCTAClick } from "@/utils/eventTracking";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Ícones SVG customizados sofisticados
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 6V16M6 6H14M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4V6M11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Listener para links que apontam para #webinar-form - no mobile abre o dialog
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="#webinar-form"]');
      
      if (link) {
        // Rastrear clique no CTA
        const linkText = link.textContent?.trim() || 'CTA Link';
        trackCTAClick(linkText, 'Page');
        
        if (window.innerWidth < 1024) { // lg breakpoint
          e.preventDefault();
          e.stopPropagation();
          setIsFormDialogOpen(true);
        }
      }
    };

    // Listener para evento customizado do FloatingCTA
    const handleCustomEvent = () => {
      trackCTAClick('Floating CTA', 'Floating Button');
      setIsFormDialogOpen(true);
    };

    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener('openWebinarFormDialog', handleCustomEvent);
    
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener('openWebinarFormDialog', handleCustomEvent);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary-light py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Letter Glitch Effect - Background decorativo */}
      <LetterGlitch 
        glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
        glitchSpeed={60}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      {/* Decorative background elements com animação */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float animate-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float animate-delay-400"></div>
      </div>

      {/* Grid pattern sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 z-[1]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start lg:items-center">
          {/* Left Side - Content */}
          <div className={`space-y-4 sm:space-y-6 md:space-y-8 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge com animação */}
            <div className="flex flex-col gap-2 sm:gap-3 animate-fade-in-down">
              <Badge className="bg-accent/20 text-accent-foreground border-accent/30 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold backdrop-blur-sm hover:scale-105 transition-transform shadow-lg inline-block w-fit">
                🎯 Webinar Gratuito • 26 de Novembro às 19h
              </Badge>
              <Badge className="bg-primary/20 text-primary-foreground border-primary/30 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold backdrop-blur-sm inline-block w-fit">
                ⭐ 243 pessoas já participaram • 4.9/5.0
              </Badge>
            </div>

            <div className="space-y-4 sm:space-y-6 animate-fade-in-up animate-delay-100">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Do Inbound Tumultuado ao{" "}
                <span className="text-accent drop-shadow-lg bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                  Comercial Qualificado
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/95 leading-relaxed font-medium">
                Descubra por que <span className="font-bold text-white bg-primary/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-sm sm:text-base md:text-lg lg:text-xl">60% dos seus leads inbound</span> estão virando ZERO e o framework 
                para escalar <span className="font-bold text-accent bg-accent/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-sm sm:text-base md:text-lg lg:text-xl">3x sua qualificação</span> (sem contratar mais SDRs)
              </p>
            </div>

            {/* CTA Button para Mobile - Aparece antes do gráfico */}
            <div className="lg:hidden animate-fade-in-up animate-delay-200">
              <Button
                onClick={() => setIsFormDialogOpen(true)}
                className="w-full bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-accent-foreground font-bold py-6 text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02] relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10">🎯 GARANTIR MINHA VAGA GRATUITA</span>
              </Button>
              <p className="text-center text-xs text-white/80 mt-2">
                🔒 Seus dados estão seguros • ✅ 100% gratuito • ❌ Sem cartão de crédito
              </p>
            </div>

            {/* Chart Image com animação */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white/95 backdrop-blur-sm p-3 sm:p-4 md:p-6 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-scale-in animate-delay-200 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <img 
                src={leadsGapChart} 
                alt="Gráfico mostrando a diferença entre leads gerados e leads qualificados"
                className="w-full h-auto relative z-10"
              />
            </div>

            {/* Trust Badges com animação sequencial */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-up animate-delay-300">
                  <div className="text-accent flex-shrink-0">
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">Sem compromisso</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-up animate-delay-400">
                  <div className="text-accent flex-shrink-0">
                    <GiftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">100% Gratuito</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-up animate-delay-500">
                  <div className="text-accent flex-shrink-0">
                    <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">45 minutos</span>
                </div>
              </div>
              
              {/* ROI e Garantias */}
              <div className="bg-white/10 backdrop-blur-sm border-2 border-accent/30 rounded-lg sm:rounded-xl p-3 sm:p-4 animate-fade-in-up animate-delay-600">
                <p className="text-white font-bold text-sm sm:text-base mb-1.5 sm:mb-2">💰 Potencial de Economia:</p>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                  Empresas economizam em média <span className="text-accent font-bold">R$8-15k/mês</span> em custos de SDR após implementar o framework apresentado.
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-xs text-white/80">
                  <span>🔒 Dados seguros</span>
                  <span className="hidden sm:inline">•</span>
                  <span>❌ Sem cartão</span>
                  <span className="hidden sm:inline">•</span>
                  <span>✅ Cancele quando quiser</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form com animação (apenas desktop - OCULTO NO MOBILE) */}
          <div id="webinar-form" className={`hidden lg:block lg:order-last lg:mt-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <WebinarForm />
          </div>
        </div>

        {/* Dialog para formulário no Mobile */}
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto sm:max-w-lg p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
                Garantir meu lugar no webinar
              </DialogTitle>
              <DialogDescription className="text-center text-sm">
                Preencha os dados abaixo para se inscrever
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 sm:mt-4">
              <WebinarForm onSuccess={() => setIsFormDialogOpen(false)} hideHeader={true} />
            </div>
          </DialogContent>
        </Dialog>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group">
            <span className="text-sm font-medium">Role para ver mais</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};
