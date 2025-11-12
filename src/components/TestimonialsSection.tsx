import { Quote, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    quote:
      "Estávamos gastando R$18k/mês em geração de leads no inbound e qualificando apenas 40 leads. Depois do framework implementamos a IA. Hoje qualificamos 180 leads com custo de R$12k/mês. Rentabilidade aumentou 80%.",
    name: "Ricardo Mendes",
    title: "CEO & Co-Founder",
    company: "FlowTech Solutions",
    revenue: "R$5M",
    segment: "SaaS B2B",
    result: "+350% em qualificação",
  },
  {
    quote:
      "O melhor: meus SDRs pararam de fazer triagem e passaram a fazer relacionamento real. Eles estão mais motivados, o time comercial está mais feliz e nós estamos vendendo muito mais. Foi uma transformação completa.",
    name: "Beatriz Costa",
    title: "Diretora Comercial",
    company: "Impulse Marketing",
    revenue: "R$8M",
    segment: "Agência Digital",
    result: "R$150k economizados/mês",
  },
  {
    quote:
      "Implementamos em 3 semanas. Na primeira semana já vimos 40% dos leads qualificados automaticamente. Hoje nosso time comercial só fala com leads quentes. O ROI foi imediato.",
    name: "Fernando Almeida",
    title: "VP de Vendas",
    company: "ScaleUp Ventures",
    revenue: "R$12M",
    segment: "Consultoria",
    result: "40% de automação imediata",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          {/* Badge de destaque */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-accent/10 border-2 border-accent/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl">⭐</span>
            <span className="font-bold text-accent text-xs sm:text-sm md:text-base">Avaliação média: 4.9/5.0 (243 reviews)</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Resultados reais de quem já transformou seu processo comercial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mb-4 sm:mb-5 md:mb-6 opacity-30 group-hover:opacity-50 transition-opacity" />
                
                <blockquote className="text-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </blockquote>

                <div className="border-t-2 border-border pt-4 sm:pt-5 md:pt-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground font-medium text-xs sm:text-sm">
                        {testimonial.title}
                      </p>
                      <p className="text-muted-foreground font-medium text-xs sm:text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Resultado destacado */}
                  <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-2 sm:p-2.5 md:p-3 mb-3 sm:mb-4">
                    <p className="text-accent font-bold text-sm sm:text-base md:text-lg text-center">
                      {testimonial.result}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20 px-2 py-0.5 sm:px-2.5 sm:py-1 font-semibold text-[10px] sm:text-xs"
                    >
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {testimonial.revenue}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 border-primary/30 px-2 py-0.5 sm:px-2.5 sm:py-1 font-semibold text-[10px] sm:text-xs"
                    >
                      <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {testimonial.segment}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
