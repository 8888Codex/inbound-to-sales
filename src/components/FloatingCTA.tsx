import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar o CTA após rolar 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleClick = () => {
    // No mobile, dispara evento para abrir o dialog
    if (window.innerWidth < 1024) {
      window.dispatchEvent(new CustomEvent('openWebinarFormDialog'));
    } else {
      // No desktop, faz scroll para o formulário
      const formElement = document.getElementById("webinar-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile - Bottom */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-fade-in-up">
        <div className="bg-gradient-to-r from-accent to-accent-hover text-accent-foreground rounded-xl shadow-2xl p-4 relative">
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 bg-card border-2 border-accent rounded-full p-1 hover:bg-accent hover:text-accent-foreground transition-all"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">🎯 Garanta sua vaga!</p>
              <p className="text-xs opacity-90">Poucas vagas restantes</p>
            </div>
            <button
              onClick={handleClick}
              className="bg-white text-accent font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:scale-105 transition-transform"
            >
              Inscrever-se
            </button>
          </div>
        </div>
      </div>

      {/* Desktop - Bottom Right */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50 animate-scale-in">
        <div className="bg-gradient-to-r from-accent to-accent-hover text-accent-foreground rounded-2xl shadow-2xl p-6 relative max-w-sm">
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 bg-card border-2 border-accent rounded-full p-1.5 hover:bg-accent hover:text-accent-foreground transition-all"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mb-4">
            <p className="font-bold text-lg mb-2">🎯 Últimas vagas disponíveis!</p>
            <p className="text-sm opacity-90">Não perca a chance de transformar seus resultados</p>
          </div>
          
          <button
            onClick={handleClick}
            className="w-full bg-white text-accent font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg"
          >
            Garantir Minha Vaga Agora
          </button>
          
          <p className="text-xs text-center mt-2 opacity-75">
            ✅ 100% gratuito • Sem compromisso
          </p>
        </div>
      </div>
    </>
  );
};

