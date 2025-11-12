import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: "📊",
    title: "Como identificar exatamente quanto você está perdendo em leads",
    description: "Calculadora prática + diagnóstico ao vivo",
  },
  {
    icon: "🤖",
    title: "O framework que usa IA para qualificar automaticamente",
    description: "Enquanto você dorme, enquanto você atende cliente",
  },
  {
    icon: "📈",
    title: "Como triplicar leads qualificados SEM contratar mais SDR",
    description: "Case real: de 30 para 90 reuniões/semana em 60 dias",
  },
  {
    icon: "🛠️",
    title: "Integração com seu HubSpot/Pipedrive/RD Station",
    description: "Conecta em 10 min, começa hoje",
  },
  {
    icon: "⏱️",
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
                className="group bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Check Icon */}
                  <div className="flex-shrink-0 hidden md:block">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="#hero"
              className="inline-block bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Quero Garantir Minha Vaga
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
