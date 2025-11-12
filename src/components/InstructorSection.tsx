import instructorPhoto from "@/assets/instructor-photo.png";
import { Award, Building2, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "34",
    label: "Empresas transformadas",
  },
  {
    icon: TrendingUp,
    value: "250%",
    label: "Aumento médio em reuniões",
  },
  {
    icon: Users,
    value: "R$2-20M",
    label: "Faturamento dos clientes",
  },
  {
    icon: Award,
    value: "60%",
    label: "Redução de custo operacional",
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
              Aprenda com quem já fez isso 34 vezes
            </p>
          </div>

          {/* Instructor Card */}
          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Photo */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary-light to-primary p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={instructorPhoto}
                      alt="Instrutor do webinar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg">
                    ✓
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 md:p-12">
                <h3 className="text-3xl font-bold text-card-foreground mb-2">
                  Rafael Oliveira
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">
                  Especialista em Automação de Vendas com IA
                </p>

                <div className="space-y-4 mb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-card-foreground">Ex-SDR</strong> que entendeu na pele 
                    o problema da qualificação manual
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos últimos 2 anos, focou 100% na transformação de times comerciais através 
                    de <strong className="text-card-foreground">IA + SDR Híbrido</strong>
                  </p>
                  <p className="text-card-foreground leading-relaxed font-medium">
                    Implementou o framework em 34 empresas com faturamento entre R$2M-R$20M
                  </p>
                </div>

                {/* Credentials Badge */}
                <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-4 mb-8">
                  <p className="text-card-foreground font-semibold">
                    📊 Resultado médio comprovado:
                  </p>
                  <p className="text-accent font-bold text-lg">
                    250% mais reuniões | 60% menos custo operacional
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-secondary/50 rounded-lg p-4 text-center border border-border"
                    >
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-card-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">
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
              href="#hero"
              className="inline-block bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 shadow-2xl hover:shadow-accent/50"
            >
              Garantir Minha Vaga Agora
            </a>
            <p className="text-white/80 mt-4 text-sm">
              Transforme seu comercial como estas 34 empresas fizeram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
