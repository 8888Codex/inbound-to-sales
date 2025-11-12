import { Quote, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    quote:
      "Estávamos gastando R$18k/mês em geração de leads no inbound e qualificando apenas 40 leads. Depois do framework implementamos a IA. Hoje qualificamos 180 leads com custo de R$12k/mês. Rentabilidade aumentou 80%.",
    name: "João Silva",
    title: "CEO",
    company: "TechSolutions Ltda",
    revenue: "R$5M",
    segment: "SaaS",
  },
  {
    quote:
      "O melhor: meus SDRs pararam de fazer triagem e passaram a fazer relacionamento real. Eles tão mais motivados. Nós estamos vendendo mais. Win-win.",
    name: "Maria Oliveira",
    title: "Head de Vendas",
    company: "Digital Agency XYZ",
    revenue: "R$8M",
    segment: "Agência Digital",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Resultados reais de quem já transformou seu processo comercial
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-primary mb-6 opacity-50" />
              
              <blockquote className="text-foreground text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="border-t border-border pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonial.title} | {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <TrendingUp className="w-3 h-3" />
                    Faturamento: {testimonial.revenue}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Building2 className="w-3 h-3" />
                    {testimonial.segment}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
