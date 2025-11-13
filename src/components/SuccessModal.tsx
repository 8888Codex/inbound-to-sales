import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ThankYouContent } from "@/components/ThankYouContent";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuccessModal = ({ open, onOpenChange }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-w-[95vw] p-0 gap-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[90vh] overflow-y-auto">
        {/* Glassmorphism Container - Estilo Apple */}
        <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/50 to-blue-50/50 dark:from-green-950/20 dark:via-gray-900/50 dark:to-blue-950/20 pointer-events-none"></div>
          
          {/* Animated Background Particles - Oculto no mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse animate-delay-400"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-5 sm:p-8 md:p-10">
            <ThankYouContent isModal={true} onClose={() => onOpenChange(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

