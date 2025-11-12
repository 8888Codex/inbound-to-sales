import instructorPhoto from "@/assets/Marcello foto.png";

// URL da imagem do instrutor
const instructorImageUrl = instructorPhoto;

// Ícones SVG customizados sofisticados
const BuildingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 24H24M8 8V20M12 8V20M16 8V20M20 8V20M6 24V6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20L12 12L18 16L24 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 6H24V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 14C16.7614 14 19 11.7614 19 9C19 6.23858 16.7614 4 14 4C11.2386 4 9 6.23858 9 9C9 11.7614 11.2386 14 14 14Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 24C6 20.134 9.13401 17 13 17H15C18.866 17 22 20.134 22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AwardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 18C16.7614 18 19 15.7614 19 13C19 10.2386 16.7614 8 14 8C11.2386 8 9 10.2386 9 13C9 15.7614 11.2386 18 14 18Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 22L12 24L18 18M18 8L12 2L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const stats = [
  {
    icon: BuildingIcon,
    value: "6",
    label: "Empresas no ecossistema",
  },
  {
    icon: TrendingIcon,
    value: "20+",
    label: "Anos de experiência",
  },
  {
    icon: UsersIcon,
    value: "3M+",
    label: "Comunidade orgânica",
  },
  {
    icon: AwardIcon,
    value: "3",
    label: "Empresas focadas em IA",
  },
];

export const InstructorSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Quem Está Apresentando
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Aprenda com um dos principais especialistas em IA aplicada a negócios
            </p>
          </div>

          {/* Instructor Card */}
          <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-white/20 hover:shadow-3xl transition-all duration-300">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Photo */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary-light via-primary to-primary-dark p-6 md:p-10 flex items-center justify-center relative overflow-visible min-h-[450px] md:min-h-[550px]">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-accent/10"></div>
                <div className="relative z-10 w-full flex items-center justify-center">
                  <div className="relative w-[300px] h-[380px] md:w-[380px] md:h-[480px] flex-shrink-0">
                    <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300 bg-white/10">
                      <img
                        src={instructorImageUrl}
                        alt="Marcello Nicolielo - Especialista em Inteligência Artificial Aplicada a Negócios"
                        className="w-full h-full object-contain object-center"
                        loading="eager"
                        style={{ display: 'block', width: '100%', height: '100%' }}
                        onError={(e) => {
                          console.error("Erro ao carregar imagem do instrutor:", instructorImageUrl);
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white/50 text-sm bg-white/10 rounded-3xl">Foto não disponível</div>';
                          }
                        }}
                      />
                    </div>
                    {/* Badge de verificação posicionado no canto da foto */}
                    <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 bg-gradient-to-br from-accent to-accent-hover text-accent-foreground rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center font-bold text-2xl md:text-3xl shadow-2xl border-4 border-white animate-pulse z-20">
                      ✓
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-card-foreground mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Marcello Nicolielo
                </h3>
                <p className="text-xl md:text-2xl text-primary font-bold mb-6">
                  Especialista em Inteligência Artificial Aplicada a Negócios
                </p>

                {/* Formação */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-card-foreground font-bold text-base md:text-lg mb-2">
                      Formação e Especializações:
                    </p>
                    <ul className="text-muted-foreground text-sm md:text-base space-y-1.5 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Gestor de Tecnologia pela Universidade Anhembi Morumbi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>MBA em Ciência de Dados e Inteligência Artificial pela FIAP</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Especialista em Expansão de Negócios com foco em Inovação tecnológica, Comunicação Estratégica e IA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>+ de 10 anos em Economia Criativa e Cultura Digital</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-card-foreground font-bold text-base md:text-lg mb-2">
                      Experiência Profissional:
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      <strong className="text-card-foreground font-bold">+ de 20 anos</strong> de atuação em projetos digitais para empresas como <strong className="text-card-foreground">Bradesco, Cushman&Wakefield, Mosaic, deWalt, Black'n'Decker, Sabesp e Metrô SP</strong>.
                    </p>
                  </div>

                  <div>
                    <p className="text-card-foreground font-bold text-base md:text-lg mb-2">
                      Ecossistema de Empresas em IA:
                    </p>
                    <ul className="text-muted-foreground text-sm md:text-base space-y-1.5 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-card-foreground">Codex.ai</strong> – Consultoria em Inteligência Artificial para negócios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-card-foreground">ai.Minds</strong> – Mentoria para C-Levels, diretores e líderes com abordagem AI-First</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-card-foreground">Cognit.ai</strong> – Aceleradora de I.A. para médias e grandes empresas</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-card-foreground font-bold text-base md:text-lg mb-2">
                      Projetos e Iniciativas:
                    </p>
                    <ul className="text-muted-foreground text-sm md:text-base space-y-1.5 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Head de Inovação na <strong className="text-card-foreground">GoshenLand</strong>, liderando aceleradores de IA e Studio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Fundador do <strong className="text-card-foreground">Positivamente Podcast</strong>, com mais de 3 Milhões em comunidade orgânica</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Criador da <strong className="text-card-foreground">3LO</strong>, uma das primeiras agências brasileiras a integrar Google/YouTube e Facebook/Instagram como parceiros oficiais</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Sócio em projetos com <strong className="text-card-foreground">Washington Olivetto e Galvão Bueno</strong>, incluindo propriedades intelectuais nos podcasts W/Cast e Pod, Falar Galvão</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Credentials Badge */}
                <div className="bg-gradient-to-r from-accent/15 via-accent/10 to-accent/5 border-l-4 border-accent rounded-xl p-5 md:p-6 mb-8 shadow-lg">
                  <p className="text-card-foreground font-bold text-base md:text-lg mb-2">
                    Reconhecimento:
                  </p>
                  <p className="text-accent font-bold text-lg md:text-xl">
                    Reconhecido como um dos principais nomes em Inteligência Artificial aplicada a negócios, liderança e carreiras
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-secondary/80 to-secondary/50 rounded-xl p-5 text-center border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-primary mx-auto mb-3 flex justify-center">
                        <stat.icon />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-card-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground leading-tight font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
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
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-12 py-6 rounded-xl text-xl transition-all duration-300 shadow-2xl hover:shadow-accent/50 hover:scale-105 group"
            >
              🎯 Aprender com o Especialista
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className="text-white/90 mt-4 text-base font-medium">
              ⭐ Aprenda com quem lidera o ecossistema de IA no Brasil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
