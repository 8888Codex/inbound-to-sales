import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuccessModal = ({ open, onOpenChange }: SuccessModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden border-0 bg-transparent shadow-none">
        {/* Glassmorphism Container - Estilo Apple */}
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/50 to-blue-50/50 dark:from-green-950/20 dark:via-gray-900/50 dark:to-blue-950/20 pointer-events-none"></div>
          
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse animate-delay-400"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-10">
            <DialogHeader className="text-center space-y-6 pb-4">
              {/* Success Icon with Apple-style Animation */}
              <div className="flex justify-center pt-4">
                <div className="relative">
                  {/* Outer Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-400 to-green-500 rounded-full blur-2xl opacity-60 ${isAnimating ? 'animate-ping' : ''} transition-opacity duration-1000`}></div>
                  
                  {/* Middle Ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-xl"></div>
                  
                  {/* Icon Container */}
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-4 shadow-2xl transform transition-all duration-700 hover:scale-110">
                    <CheckCircle2 className="w-12 h-12 text-white animate-scale-in" strokeWidth={2.5} />
                  </div>
                  
                  {/* Sparkle Effects */}
                  {isAnimating && (
                    <>
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-green-400 animate-bounce animate-delay-100" />
                      <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-emerald-400 animate-bounce animate-delay-300" />
                      <Sparkles className="absolute top-1/2 -left-3 w-4 h-4 text-green-300 animate-bounce animate-delay-500" />
                    </>
                  )}
                </div>
              </div>
              
              {/* Title with Apple Typography */}
              <DialogTitle className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight pt-4">
                Tudo certo! ✨
              </DialogTitle>
              
              {/* Subtitle */}
              <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
                Seu cadastro foi concluído com sucesso
              </p>
            </DialogHeader>
            
            {/* Content Section */}
            <DialogDescription className="space-y-5 pt-2 pb-6">
              {/* WhatsApp Info Card - Apple Style */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-5 border border-green-100/50 dark:border-green-900/30 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-semibold text-gray-900 dark:text-white text-base leading-snug">
                        Em alguns minutos você será adicionado ao nosso grupo de avisos no WhatsApp
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Por lá você receberá todas as informações de acesso ao webinar, incluindo o link para participar e os materiais exclusivos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reminder Card */}
              <div className="bg-gray-50/80 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/30">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📱</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                      Fique de olho no seu WhatsApp!
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Verifique se você aceitou receber mensagens do nosso número. Se não receber em até 10 minutos, entre em contato conosco.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
            
            {/* Apple-style Button */}
            <div className="pt-6 pb-2">
              <Button
                onClick={() => onOpenChange(false)}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-0"
              >
                Entendi, obrigado!
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

