import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
  company: z.string().min(2, "Nome da empresa é obrigatório").max(100),
  crm: z.enum(["hubspot", "pipedrive", "rdstation", "salesforce", "outro"], {
    required_error: "Selecione seu CRM",
  }),
  leadsPerMonth: z.enum(["0-50", "51-150", "151-300", "300+"], {
    required_error: "Selecione a quantidade de leads",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const WebinarForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    
    toast({
      title: "Inscrição confirmada! 🎉",
      description: "Você receberá um e-mail com os detalhes do webinar.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-card-foreground mb-2">
          Garantir meu lugar no webinar
        </h3>
        <p className="text-muted-foreground text-sm">
          Preencha os dados abaixo para se inscrever
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground font-medium">
            Nome completo
          </Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground font-medium">
            E-mail profissional
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <Label htmlFor="company" className="text-card-foreground font-medium">
            Empresa
          </Label>
          <Input
            id="company"
            placeholder="Nome da sua empresa"
            {...register("company")}
            className={errors.company ? "border-destructive" : ""}
          />
          {errors.company && (
            <p className="text-destructive text-sm">{errors.company.message}</p>
          )}
        </div>

        {/* CRM */}
        <div className="space-y-3">
          <Label className="text-card-foreground font-medium">Qual é seu CRM?</Label>
          <RadioGroup
            onValueChange={(value) => setValue("crm", value as any)}
            className="space-y-2"
          >
            {["HubSpot", "Pipedrive", "RD Station", "Salesforce", "Outro"].map((crm, idx) => (
              <div key={crm} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={["hubspot", "pipedrive", "rdstation", "salesforce", "outro"][idx]}
                  id={`crm-${idx}`}
                />
                <Label htmlFor={`crm-${idx}`} className="font-normal cursor-pointer">
                  {crm}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.crm && (
            <p className="text-destructive text-sm">{errors.crm.message}</p>
          )}
        </div>

        {/* Leads por mês */}
        <div className="space-y-3">
          <Label className="text-card-foreground font-medium">
            Quantos leads você gera/mês?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue("leadsPerMonth", value as any)}
            className="space-y-2"
          >
            {["0-50", "51-150", "151-300", "300+"].map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <RadioGroupItem value={range} id={`leads-${range}`} />
                <Label htmlFor={`leads-${range}`} className="font-normal cursor-pointer">
                  {range} leads
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.leadsPerMonth && (
            <p className="text-destructive text-sm">{errors.leadsPerMonth.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-hover text-accent-foreground font-bold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? "Processando..." : "RESERVAR VAGA"}
        </Button>

        {/* Info Footer */}
        <div className="text-center space-y-1 pt-2">
          <p className="text-sm font-medium text-card-foreground">
            📅 Próxima turma: Quarta 19h
          </p>
          <p className="text-sm text-muted-foreground">⏱️ Duração: 45 min</p>
          <p className="text-sm text-muted-foreground">✅ Sem compromisso</p>
        </div>
      </form>
    </div>
  );
};
