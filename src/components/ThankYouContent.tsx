import { CheckCircle2, MessageCircle, Sparkles, Calendar, Gift, Video, FileText, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { WEBINAR_CONFIG } from "@/config/webinar";

interface ThankYouContentProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const ThankYouContent = ({ isModal = false, onClose }: ThankYouContentProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Countdown para o webinar
  useEffect(() => {
    const updateCountdown = () => {
      const webinarDate = new Date(
        WEBINAR_CONFIG.ano,
        WEBINAR_CONFIG.mes - 1,
        WEBINAR_CONFIG.dia,
        WEBINAR_CONFIG.hora,
        WEBINAR_CONFIG.minuto
      );
      
      const now = new Date();
      const diff = webinarDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown("Evento iniciado!");
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown(`${days}d ${hours}h ${minutes}m`);
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Atualizar a cada minuto
    
    return () => clearInterval(interval);
  }, []);

  const webinarDate = new Date(
    WEBINAR_CONFIG.ano,
    WEBINAR_CONFIG.mes - 1,
    WEBINAR_CONFIG.dia,
    WEBINAR_CONFIG.hora,
    WEBINAR_CONFIG.minuto
  );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Success Icon with Apple-style Animation - Menor no mobile */}
      <div className="flex justify-center pt-1 sm:pt-2 md:pt-4">
        <div className="relative">
          {/* Outer Glow - Reduzido no mobile */}
          <div className={`absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-400 to-green-500 rounded-full blur-lg sm:blur-xl opacity-60 ${isAnimating ? 'animate-ping' : ''} transition-opacity duration-1000`}></div>
          
          {/* Icon Container - Compacto no mobile */}
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-3 sm:p-4 md:p-5 shadow-2xl transform transition-all duration-700 hover:scale-110">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white animate-scale-in" strokeWidth={2.5} />
          </div>
          
          {/* Sparkle Effects - Oculto no mobile */}
          {isAnimating && (
            <div className="hidden sm:block">
              <Sparkles className="absolute -top-2 -right-2 w-5 sm:w-6 h-5 sm:h-6 text-green-400 animate-bounce animate-delay-100" />
              <Sparkles className="absolute -bottom-2 -left-2 w-4 sm:w-5 h-4 sm:h-5 text-emerald-400 animate-bounce animate-delay-300" />
            </div>
          )}
        </div>
      </div>
      
      {/* Title - Compacto no mobile */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent tracking-tight">
          Parabéns! 🎉
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-light">
          Sua inscrição foi confirmada
        </p>
      </div>

      {/* Countdown Card - Compacto no mobile */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-primary/20 shadow-lg">
          <div className="text-center space-y-2 sm:space-y-3">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-primary" />
            <div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1">
                Webinar começa em:
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                {countdown}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-1 sm:mt-2">
                {webinarDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })} às {webinarDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Info Card - Compacto no mobile */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg sm:rounded-xl md:rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 border border-green-100/50 dark:border-green-900/30 shadow-lg">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="flex-1 space-y-1 sm:space-y-2">
              <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base leading-snug">
                📱 Verifique seu WhatsApp agora!
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Em alguns minutos você será adicionado ao grupo. Você receberá:
              </p>
              <ul className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-green-600 mt-0.5 text-xs">✓</span>
                  <span>Link de acesso ao vivo</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-600 mt-0.5 text-xs">✓</span>
                  <span>Materiais exclusivos</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-600 mt-0.5 text-xs">✓</span>
                  <span>Lembretes do evento</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps - Grid compacto no mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {/* Benefit 1 */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
                Acesso ao vivo + gravação
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                Participe ao vivo ou depois
              </p>
            </div>
          </div>
        </div>

        {/* Benefit 2 */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
                Planilha de ROI
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                Calcule o retorno
              </p>
            </div>
          </div>
        </div>

        {/* Benefit 3 */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-orange-500/10 rounded-lg">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
                Framework completo
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                Passo a passo
              </p>
            </div>
          </div>
        </div>

        {/* Benefit 4 */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
                Consultoria grátis
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                Primeiros inscritos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder - Compacto no mobile */}
      <div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 border border-amber-200/50 dark:border-amber-800/30">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="text-xl sm:text-2xl md:text-3xl">⏰</div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-amber-900 dark:text-amber-200 mb-1 sm:mb-2">
              Adicione à sua agenda!
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              Enviaremos lembretes via WhatsApp, mas adicione ao calendário para garantir.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons - Compacto no mobile */}
      <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
        {isModal && onClose && (
          <Button
            onClick={onClose}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Entendi, obrigado!
          </Button>
        )}
        
        {!isModal && (
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para a Página Inicial
          </Button>
        )}

        {/* Share Buttons - Ícones sem texto no mobile */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const text = `Acabei de me inscrever no webinar "Como Transformar Leads em Oportunidades Qualificadas"! 🚀`;
              const url = window.location.origin;
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            }}
            className="flex-1 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200/60 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 text-xs py-2"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="hidden sm:inline">Compartilhar</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const text = `Acabei de me inscrever no webinar sobre qualificação de leads! 🎯`;
              const url = window.location.origin;
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            }}
            className="flex-1 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200/60 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 text-xs py-2"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="hidden sm:inline">LinkedIn</span>
          </Button>
        </div>
      </div>

      {/* Additional Info - Menor no mobile */}
      <div className="text-center pt-2 sm:pt-4 border-t border-gray-200/50 dark:border-gray-700/30">
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          💡 Salve este link para acessar informações a qualquer momento
        </p>
      </div>
    </div>
  );
};

