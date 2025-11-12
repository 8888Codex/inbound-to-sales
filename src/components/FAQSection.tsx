import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre o webinar
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-foreground font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
