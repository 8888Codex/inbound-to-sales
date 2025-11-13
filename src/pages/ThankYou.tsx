import { ThankYouContent } from "@/components/ThankYouContent";
import LightRays from "@/components/LightRays";
import LetterGlitch from "@/components/LetterGlitch";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary-light relative overflow-hidden">
      {/* Letter Glitch Effect - Background decorativo */}
      <LetterGlitch 
        glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
        glitchSpeed={60}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      {/* Light Rays Effect */}
      <LightRays 
        raysOrigin="top-center"
        raysColor="#61dca3"
        raysSpeed={0.8}
        lightSpread={1.2}
        rayLength={2.5}
        pulsating={true}
        fadeDistance={1.5}
        saturation={0.9}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.05}
        distortion={0.1}
      />

      {/* Content Container - Padding reduzido no mobile */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-3xl">
          {/* Glassmorphism Container - Compacto no mobile */}
          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/50 to-blue-50/50 dark:from-green-950/20 dark:via-gray-900/50 dark:to-blue-950/20 pointer-events-none"></div>
            
            {/* Animated Background Particles - Oculto no mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse animate-delay-400"></div>
            </div>

            {/* Content - Padding reduzido no mobile */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
              <ThankYouContent isModal={false} />
            </div>
          </div>

          {/* Footer Note - Menor no mobile */}
          <div className="text-center mt-3 sm:mt-4 md:mt-6 text-white/80 text-xs sm:text-sm">
            <p>
              Dúvidas? Entre em contato pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

