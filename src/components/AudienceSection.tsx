import { Check, X } from "lucide-react";

const idealAudience = [
  "Investe em conteúdo, SEO, webinars (inbound marketing)",
  "Gera 50+ leads por mês, mas qualifica menos de 30%",
  "Tem CRM (HubSpot, Pipedrive, RD Station, Salesforce...)",
  "Está cansado de SDR manual fazer trabalho repetitivo",
  "Tem faturamento entre R$2M-R$20M",
  "Quer escalar sem aumentar custo exponencialmente",
];

const notForYou = [
  "Você usa vendas 100% cold outbound (sem inbound)",
  "Gera menos de 30 leads por mês",
  "Não tem email ou está satisfeito com sua estrutura atual",
];

export const AudienceSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Quem Deve Assistir
            </h2>
            <p className="text-lg text-muted-foreground">
              Este webinar é perfeito para alguns perfis específicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ideal Audience */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Check className="w-7 h-7 text-accent-foreground" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Você é o público certo se:
                </h3>
              </div>

              <ul className="space-y-4">
                {idealAudience.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For You */}
            <div className="bg-gradient-to-br from-muted to-muted/50 border-2 border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                  <X className="w-7 h-7 text-muted-foreground" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Não é para você se:
                </h3>
              </div>

              <ul className="space-y-4">
                {notForYou.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-12 text-center bg-card border border-border rounded-xl p-8">
            <p className="text-lg text-card-foreground mb-4">
              <strong>Se você se identificou com o perfil ideal,</strong> este webinar pode ser 
              o divisor de águas para escalar sua operação comercial.
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
      </div>
    </section>
  );
};
