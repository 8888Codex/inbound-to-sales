import { ArrowRight, Clock, Gift, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FinalCTASection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById("webinar-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Badge
          variant="secondary"
          className="mb-6 bg-urgency text-urgency-foreground border-urgency/20 animate-pulse"
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          Vagas Limitadas
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Garanta Sua Vaga Agora
        </h2>

        <p className="text-white/90 text-xl mb-4">
          Próxima turma sai HOJE À NOITE (19h)
        </p>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 inline-block">
          <div className="flex items-center justify-center gap-2 text-white mb-2">
            <Gift className="w-5 h-5" />
            <p className="font-semibold text-lg">Bônus Exclusivo</p>
          </div>
          <p className="text-white/90">
            1 vaga de consultoria gratuita para quem tomar ação
          </p>
        </div>

        <Button
          size="lg"
          onClick={scrollToForm}
          className="bg-accent hover:bg-accent-hover text-accent-foreground font-bold text-lg px-12 py-6 h-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          GARANTIR MINHA VAGA AGORA
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>45 minutos + Q&A</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            <span>100% Gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  );
};
