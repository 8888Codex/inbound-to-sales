import { CheckCircle2 } from "lucide-react";

// Ícones SVG customizados sofisticados
const AnalyticsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 24L12 18L18 22L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 14H20V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="24" r="2" fill="currentColor"/>
    <circle cx="12" cy="18" r="2" fill="currentColor"/>
    <circle cx="18" cy="22" r="2" fill="currentColor"/>
    <circle cx="26" cy="14" r="2" fill="currentColor"/>
  </svg>
);

const AIIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 6L20 12L28 14L20 16L16 22L12 16L4 14L12 12L16 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="14" r="2" fill="currentColor"/>
    <path d="M8 20C8 20 10 22 16 22C22 22 24 20 24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GrowthIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M4 24L12 16L18 20L28 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 8H28V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="4" cy="24" r="2" fill="currentColor"/>
    <circle cx="12" cy="16" r="2" fill="currentColor"/>
    <circle cx="18" cy="20" r="2" fill="currentColor"/>
    <circle cx="28" cy="8" r="2" fill="currentColor"/>
  </svg>
);

const IntegrationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="8" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="18" y="8" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="4" y="18" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="18" y="18" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 11H18M14 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ActionPlanIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 10H22M10 16H22M10 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="22" r="2" fill="currentColor"/>
  </svg>
);

const benefits = [
  {
    icon: AnalyticsIcon,
    title: "Como identificar exatamente quanto você está perdendo em leads",
    description: "Calculadora prática + diagnóstico ao vivo",
  },
  {
    icon: AIIcon,
    title: "O framework que usa IA para qualificar automaticamente",
    description: "Enquanto você dorme, enquanto você atende cliente",
  },
  {
    icon: GrowthIcon,
    title: "Como triplicar leads qualificados SEM contratar mais SDR",
    description: "Case real: de 30 para 90 reuniões/semana em 60 dias",
  },
  {
    icon: IntegrationIcon,
    title: "Integração com seu HubSpot/Pipedrive/RD Station",
    description: "Conecta em 10 min, começa hoje",
  },
  {
    icon: ActionPlanIcon,
    title: "Plano de ação de 30 dias para implementar",
    description: "Saiba por onde começar",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              O Que Você Vai Aprender
            </h2>
            <p className="text-lg text-muted-foreground">
              Conteúdo prático e direto ao ponto para transformar seus resultados
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-card border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex gap-4 md:gap-6 relative z-10">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl text-primary">
                      <benefit.icon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Check Icon */}
                  <div className="flex-shrink-0 hidden md:block">
                    <CheckCircle2 className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
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
            <p className="text-muted-foreground text-sm mt-3">
              ✅ Sem compromisso • 100% gratuito
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
