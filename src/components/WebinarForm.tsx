import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
  company: z.string().optional(),
  phone: z.string()
    .min(10, "WhatsApp deve ter pelo menos 10 dígitos")
    .max(15, "WhatsApp inválido")
    .regex(/^[\d\s()+-]+$/, "WhatsApp deve conter apenas números"),
  crm: z.enum(["hubspot", "pipedrive", "rdstation", "salesforce", "outro"], {
    required_error: "Selecione seu CRM",
  }),
  leadsPerMonth: z.enum(["0-50", "51-150", "151-300", "300+"], {
    required_error: "Selecione a quantidade de leads",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface WebinarFormProps {
  onSuccess?: () => void;
  hideHeader?: boolean;
}

export const WebinarForm = ({ onSuccess, hideHeader = false }: WebinarFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const watchedValues = watch();

  // Validação em tempo real
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && touchedFields.has(name)) {
        trigger(name as keyof FormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger, touchedFields]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Mapear os dados para o formato esperado pelo webhook
      const webhookData = {
        "Nome completo": data.name,
        "E-mail profissional": data.email,
        "Empresa": data.company || "Não informado",
        "WhatsApp": data.phone,
        "Qual o seu CRM": data.crm === "hubspot" ? "HubSpot" : 
                          data.crm === "pipedrive" ? "Pipedrive" :
                          data.crm === "rdstation" ? "RD Station" :
                          data.crm === "salesforce" ? "Salesforce" : "Outro",
        "Quantos Lead você gera/mês": data.leadsPerMonth,
      };

      // Enviar para o webhook
      const response = await fetch("https://nwhminds.cognitaai.com.br/webhook/webinar-criar-grupo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar dados: ${response.status}`);
      }

      // Sucesso
      toast({
        title: "Inscrição confirmada! 🎉",
        description: "Você receberá um e-mail com os detalhes do webinar.",
      });

      // Resetar formulário após sucesso
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.reset();
        setTouchedFields(new Set());
      }

      // Chamar callback de sucesso se fornecido
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500); // Aguardar um pouco para o usuário ver a mensagem de sucesso
      }

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao processar inscrição",
        description: "Por favor, tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${hideHeader ? '' : 'bg-card/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-white/20 hover:shadow-3xl transition-all duration-300'}`}>
      {/* Header with gradient accent - Oculto quando hideHeader é true */}
      {!hideHeader && (
        <div className="text-center mb-4 sm:mb-6 md:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-xl sm:rounded-2xl blur-xl -z-10"></div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-card-foreground mb-2 sm:mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Garantir meu lugar no webinar
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
            Preencha os dados abaixo para se inscrever
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground font-semibold text-sm">
            Nome completo
          </Label>
          <div className="relative">
            <Input
              id="name"
              placeholder="Seu nome completo"
              {...register("name", {
                onBlur: () => setTouchedFields(prev => new Set(prev).add("name")),
              })}
              className={`h-11 sm:h-12 text-base pr-10 transition-all ${
                errors.name 
                  ? "border-destructive focus-visible:ring-destructive" 
                  : watchedValues.name && watchedValues.name.length >= 3 && !errors.name
                  ? "border-accent focus-visible:ring-accent"
                  : "focus-visible:ring-primary"
              }`}
            />
            {watchedValues.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {errors.name ? (
                  <XCircle className="w-5 h-5 text-destructive animate-scale-in" />
                ) : watchedValues.name.length >= 3 ? (
                  <CheckCircle2 className="w-5 h-5 text-accent animate-scale-in" />
                ) : null}
              </div>
            )}
          </div>
          {errors.name && touchedFields.has("name") && (
            <p className="text-destructive text-sm flex items-center gap-1 animate-fade-in-up">
              <XCircle className="w-4 h-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground font-semibold text-sm">
            E-mail profissional
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email", {
                onBlur: () => setTouchedFields(prev => new Set(prev).add("email")),
              })}
              className={`h-11 sm:h-12 text-base pr-10 transition-all ${
                errors.email 
                  ? "border-destructive focus-visible:ring-destructive" 
                  : watchedValues.email && !errors.email && watchedValues.email.includes("@")
                  ? "border-accent focus-visible:ring-accent"
                  : "focus-visible:ring-primary"
              }`}
            />
            {watchedValues.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {errors.email ? (
                  <XCircle className="w-5 h-5 text-destructive animate-scale-in" />
                ) : watchedValues.email.includes("@") && watchedValues.email.includes(".") ? (
                  <CheckCircle2 className="w-5 h-5 text-accent animate-scale-in" />
                ) : null}
              </div>
            )}
          </div>
          {errors.email && touchedFields.has("email") && (
            <p className="text-destructive text-sm flex items-center gap-1 animate-fade-in-up">
              <XCircle className="w-4 h-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <Label htmlFor="company" className="text-card-foreground font-semibold text-sm">
            Empresa <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
          </Label>
          <div className="relative">
            <Input
              id="company"
              placeholder="Nome da sua empresa (ajuda a personalizar o conteúdo)"
              {...register("company")}
              className="h-12 text-base focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-card-foreground font-semibold text-sm">
            WhatsApp <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              {...register("phone", {
                onBlur: () => setTouchedFields(prev => new Set(prev).add("phone")),
              })}
              className={`h-11 sm:h-12 text-base pr-10 transition-all ${
                errors.phone 
                  ? "border-destructive focus-visible:ring-destructive" 
                  : watchedValues.phone && watchedValues.phone.length >= 10 && !errors.phone
                  ? "border-accent focus-visible:ring-accent"
                  : "focus-visible:ring-primary"
              }`}
            />
            {watchedValues.phone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {errors.phone ? (
                  <XCircle className="w-5 h-5 text-destructive animate-scale-in" />
                ) : watchedValues.phone.length >= 10 ? (
                  <CheckCircle2 className="w-5 h-5 text-accent animate-scale-in" />
                ) : null}
              </div>
            )}
          </div>
          {errors.phone && touchedFields.has("phone") && (
            <p className="text-destructive text-sm flex items-center gap-1 animate-fade-in-up">
              <XCircle className="w-4 h-4" />
              {errors.phone.message}
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            📱 Necessário para adicionar você ao grupo exclusivo do webinar
          </p>
        </div>

        {/* CRM */}
        <div className="space-y-3">
          <Label className="text-card-foreground font-semibold text-sm">Qual é seu CRM?</Label>
          <RadioGroup
            onValueChange={(value) => setValue("crm", value as "hubspot" | "pipedrive" | "rdstation" | "salesforce" | "outro")}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
          >
            {["HubSpot", "Pipedrive", "RD Station", "Salesforce", "Outro"].map((crm, idx) => {
              const crmValues: ("hubspot" | "pipedrive" | "rdstation" | "salesforce" | "outro")[] = ["hubspot", "pipedrive", "rdstation", "salesforce", "outro"];
              return (
              <div
                key={crm}
                className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all cursor-pointer hover:bg-primary/5 ${
                  watch("crm") === crmValues[idx]
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setValue("crm", crmValues[idx])}
              >
                <RadioGroupItem
                  value={crmValues[idx]}
                  id={`crm-${idx}`}
                  className="flex-shrink-0"
                />
                <Label htmlFor={`crm-${idx}`} className="font-medium cursor-pointer text-sm flex-1">
                  {crm}
                </Label>
              </div>
            );
            })}
          </RadioGroup>
          {errors.crm && (
            <p className="text-destructive text-sm flex items-center gap-1">
              <span>⚠️</span> {errors.crm.message}
            </p>
          )}
        </div>

        {/* Leads por mês */}
        <div className="space-y-3">
          <Label className="text-card-foreground font-semibold text-sm">
            Quantos leads você gera/mês?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue("leadsPerMonth", value as "0-50" | "51-150" | "151-300" | "300+")}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
          >
            {(["0-50", "51-150", "151-300", "300+"] as const).map((range) => (
              <div
                key={range}
                className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all cursor-pointer hover:bg-primary/5 ${
                  watch("leadsPerMonth") === range
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setValue("leadsPerMonth", range)}
              >
                <RadioGroupItem value={range} id={`leads-${range}`} className="flex-shrink-0" />
                <Label htmlFor={`leads-${range}`} className="font-medium cursor-pointer text-sm flex-1">
                  {range} leads
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.leadsPerMonth && (
            <p className="text-destructive text-sm flex items-center gap-1">
              <span>⚠️</span> {errors.leadsPerMonth.message}
            </p>
          )}
        </div>

        {/* Benefícios antes do botão */}
        <div className="bg-accent/5 border-2 border-accent/20 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          <p className="font-bold text-card-foreground text-xs sm:text-sm mb-1.5 sm:mb-2">✨ Ao se inscrever, você receberá:</p>
          <div className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-muted-foreground">
            <p className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Acesso ao webinar ao vivo + gravação</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Planilha de cálculo de ROI em qualificação de leads</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Framework exclusivo de implementação</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>1 vaga para consultoria gratuita (primeiros inscritos)</span>
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-accent-foreground font-bold py-5 sm:py-6 md:py-7 text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          {isSubmitting ? (
            <span className="flex items-center gap-2 relative z-10">
              <Loader2 className="h-5 w-5 animate-spin" />
              Processando...
            </span>
          ) : (
            <span className="relative z-10">🎯 GARANTIR MINHA VAGA GRATUITA</span>
          )}
        </Button>

        {/* Garantias */}
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            🔒 Seus dados estão seguros • ✅ 100% gratuito • ❌ Sem cartão de crédito
          </p>
        </div>

        {/* Info Footer */}
        <div className="text-center space-y-2 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-card-foreground">
            <span>📅</span>
            <span>Próxima turma: 26/11 às 19h</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>⏱️</span>
              <span>45 min</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>✅</span>
              <span>Sem compromisso</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
