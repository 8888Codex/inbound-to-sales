// Ícones SVG customizados sofisticados
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 12L20 20M20 12L12 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Quem Deve Assistir
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Este webinar é perfeito para alguns perfis específicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Ideal Audience */}
            <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-accent/10 border-2 border-accent/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center shadow-lg text-accent-foreground flex-shrink-0">
                    <CheckCircleIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                    Você é o público certo se:
                  </h3>
                </div>

                <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                  {idealAudience.map((item, index) => (
                    <li key={index} className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                      <div className="text-accent flex-shrink-0 mt-0.5">
                        <CheckIcon />
                      </div>
                      <span className="text-foreground text-sm sm:text-base md:text-lg font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Not For You */}
            <div className="bg-gradient-to-br from-muted via-muted/80 to-muted/60 border-2 border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-muted-foreground/20 rounded-full flex items-center justify-center border-2 border-muted-foreground/30 text-muted-foreground flex-shrink-0">
                  <XCircleIcon />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  Não é para você se:
                </h3>
              </div>

              <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {notForYou.map((item, index) => (
                  <li key={index} className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                    <div className="text-muted-foreground flex-shrink-0 mt-0.5">
                      <XIcon />
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-8 sm:mt-10 md:mt-12 text-center bg-gradient-to-br from-card to-secondary/50 border-2 border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
            <p className="text-base sm:text-lg md:text-xl text-card-foreground mb-4 sm:mb-5 md:mb-6 font-medium leading-relaxed">
              <strong className="text-primary font-bold">Se você se identificou com o perfil ideal,</strong> este webinar pode ser 
              o divisor de águas para escalar sua operação comercial.
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
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              🎯 Sim, Quero Participar do Webinar
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className="text-muted-foreground text-xs sm:text-sm mt-2 sm:mt-3">
              ⏱️ Restam poucas vagas para esta turma
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
