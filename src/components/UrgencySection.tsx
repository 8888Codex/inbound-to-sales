import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
  const totalSpots = 33;
  const filledSpots = 25;
  const remainingSpots = totalSpots - filledSpots;
  const progressPercentage = (filledSpots / totalSpots) * 100;

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        {/* Urgency Alert */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-urgency/10 border-2 border-urgency rounded-2xl p-8 text-center">
            <Badge className="bg-urgency text-urgency-foreground mb-4 text-base px-4 py-2">
              ⚠️ Vagas Limitadas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Últimas {remainingSpots} vagas disponíveis
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Mantemos turmas pequenas para dar atenção individual. 
              <br className="hidden md:block" />
              {filledSpots} pessoas já confirmaram presença. Restam apenas {remainingSpots} vagas.
            </p>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-4" />
              <p className="text-sm font-medium text-muted-foreground">
                {filledSpots}/{totalSpots} participantes confirmados
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="max-w-5xl mx-auto">
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
          <p className="text-muted-foreground mb-4">
            Não perca essa oportunidade de transformar seus resultados
          </p>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Voltar ao formulário
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
