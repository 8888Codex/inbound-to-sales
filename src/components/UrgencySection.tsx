import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { WEBINAR_CONFIG, calcularTempoRestante } from "@/config/webinar";

const testimonials = [
  {
    company: "TechSales Pro",
    result: "3x em qualificação de leads",
    logo: "🚀",
  },
  {
    company: "Growth Masters",
    result: "60 leads/semana qualificados",
    logo: "📈",
  },
  {
    company: "Sales Velocity",
    result: "R$150k economizados/mês",
    logo: "💰",
  },
];

export const UrgencySection = () => {
  const totalSpots = WEBINAR_CONFIG.totalVagas;
  const [filledSpots, setFilledSpots] = useState(WEBINAR_CONFIG.vagasPreenchidas);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const remainingSpots = totalSpots - filledSpots;
  const progressPercentage = (filledSpots / totalSpots) * 100;

  // Countdown timer baseado na configuração real
  useEffect(() => {
    const updateTimer = () => {
      const tempo = calcularTempoRestante();
      setTimeLeft(tempo);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulador de vagas sendo preenchidas (diminui a cada 45-90 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setFilledSpots(prev => {
        // Só diminui vagas se ainda houver vagas disponíveis
        if (prev < totalSpots - 2) {
          return prev + 1;
        }
        return prev;
      });
    }, Math.random() * 45000 + 45000); // Entre 45 e 90 segundos
    
    return () => clearInterval(interval);
  }, [totalSpots]);

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        {/* Urgency Alert */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-urgency/15 via-urgency/10 to-urgency/5 border-2 border-urgency/50 rounded-3xl p-8 md:p-10 text-center shadow-xl relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-urgency/5 via-transparent to-urgency/5 opacity-50"></div>
            
            <div className="relative z-10">
              <Badge className="bg-urgency text-urgency-foreground mb-4 text-base px-5 py-2.5 font-bold shadow-lg animate-pulse">
                {remainingSpots <= 3 ? "🚨 ÚLTIMAS VAGAS!" : "⚠️ Vagas Limitadas"}
              </Badge>
              
              {/* Countdown Timer */}
              <div className="mb-6">
                <p className="text-sm md:text-base text-muted-foreground mb-2 font-medium">
                  {timeLeft.days > 0 ? "Webinar começa em:" : "Inscrições encerram em:"}
                </p>
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  {timeLeft.days > 0 && (
                    <>
                      <div className="bg-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px]">
                        <div className="text-xl md:text-3xl font-bold text-urgency">{String(timeLeft.days).padStart(2, '0')}</div>
                        <div className="text-[10px] md:text-xs text-muted-foreground uppercase">Dias</div>
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-muted-foreground">:</div>
                    </>
                  )}
                  <div className="bg-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px]">
                    <div className="text-xl md:text-3xl font-bold text-urgency">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase">Horas</div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-muted-foreground">:</div>
                  <div className="bg-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px]">
                    <div className="text-xl md:text-3xl font-bold text-urgency">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase">Min</div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-muted-foreground">:</div>
                  <div className="bg-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px]">
                    <div className="text-xl md:text-3xl font-bold text-urgency">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase">Seg</div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {remainingSpots <= 3 ? (
                  <>Apenas <span className="text-urgency animate-pulse">{remainingSpots}</span> vagas restantes!</>
                ) : (
                  <>Últimas <span className="text-urgency">{remainingSpots}</span> vagas disponíveis</>
                )}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 font-medium">
                Mantemos turmas pequenas para dar atenção individual. 
                <br className="hidden md:block" />
                <span className="text-foreground font-bold">{filledSpots} pessoas</span> já confirmaram presença. Restam apenas <span className="text-urgency font-bold">{remainingSpots} vagas</span>.
              </p>
              
              {/* Progress Bar */}
              <div className="space-y-3 max-w-2xl mx-auto">
                <Progress value={progressPercentage} className="h-5 bg-urgency/20 transition-all duration-500" />
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {filledSpots}/{totalSpots} participantes confirmados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="max-w-5xl mx-auto">
          {/* Números Agregados */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 rounded-full px-6 py-3 mb-4">
              <span className="text-3xl">🚀</span>
              <span className="font-bold text-primary text-lg">500+ empresas já participaram</span>
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Empresas que já transformaram seus resultados
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{testimonial.logo}</div>
                <h4 className="font-bold text-lg mb-2 text-card-foreground">
                  {testimonial.company}
                </h4>
                <p className="text-accent font-semibold text-lg">
                  {testimonial.result}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4 text-lg font-medium">
            ⚡ Não perca essa oportunidade de transformar seus resultados
          </p>
          <a
            href="#webinar-form"
            onClick={(e) => {
              e.preventDefault();
              const formElement = document.getElementById("webinar-form");
              if (formElement) {
                formElement.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-10 py-5 rounded-xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
          >
            🎯 Garantir Minha Vaga Agora
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
