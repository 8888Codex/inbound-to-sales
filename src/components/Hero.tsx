import { WebinarForm } from "./WebinarForm";
import leadsGapChart from "@/assets/leads-gap-chart.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary to-primary-light py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Do Inbound Tumultuado ao Comercial Qualificado
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
                Descubra por que 60% dos seus leads inbound estão virando ZERO e o framework 
                para escalar 3x sua qualificação (sem contratar mais SDRs)
              </p>
            </div>

            {/* Chart Image */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-white p-6">
              <img 
                src={leadsGapChart} 
                alt="Gráfico mostrando a diferença entre leads gerados e leads qualificados"
                className="w-full h-auto"
              />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">45 minutos</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:mt-0">
            <WebinarForm />
          </div>
        </div>
      </div>
    </section>
  );
};
