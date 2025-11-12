import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Ícone SVG customizado sofisticado
const HelpIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 18C24 16.3431 25.3431 15 27 15C28.6569 15 30 16.3431 30 18C30 19.6569 28.6569 21 27 21H24M24 27H24.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const faqs = [
  {
    question: "Quanto tempo demora o webinar?",
    answer: "45 minutos ao vivo + 10 min Q&A. Nada além disso.",
  },
  {
    question: "Eu não tenho experiência técnica, consigo acompanhar?",
    answer:
      "Sim, não tem jargão. Falamos em português claro. Tem muita demonstração prática.",
  },
  {
    question: "Vou receber uma venda disfarçada?",
    answer:
      "Não. É uma aula mesmo. Oferecemos algo no final, mas o foco é educar. Se não fizer sentido pro seu negócio, tudo bem.",
  },
  {
    question: "Posso assistir depois se não conseguir ao vivo?",
    answer:
      "Sim, enviamos replay. Mas a análise customizada (calculadora ao vivo) é só para quem participa ao vivo.",
  },
  {
    question: "Qual é o investimento depois?",
    answer:
      "Vai de R$2k a R$12k/mês conforme seu volume de leads. Você fica sabendo tudo no webinar.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-primary flex items-center justify-center">
            <HelpIcon />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Tire suas dúvidas sobre o webinar
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border-2 border-border rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 lg:px-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/50 group"
            >
              <AccordionTrigger className="text-left text-foreground font-bold text-base sm:text-lg md:text-xl hover:text-primary py-4 sm:py-5 md:py-6 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed pb-4 sm:pb-5 md:pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
