import { loadAdminConfig } from "@/utils/adminConfig";

// Configuração padrão do webinar (fallback)
const DEFAULT_CONFIG = {
  ano: 2025,
  mes: 11,
  dia: 26,
  hora: 19,
  minuto: 0,
};

// Carregar configuração do admin ou usar padrão
const getWebinarConfig = () => {
  try {
    const adminConfig = loadAdminConfig();
    return adminConfig.webinar;
  } catch (error) {
    console.error("Erro ao carregar configuração do admin:", error);
    return DEFAULT_CONFIG;
  }
};

// Configuração do webinar
// Carrega da área administrativa ou usa valores padrão
export const WEBINAR_CONFIG = {
  // Data e horário do próximo webinar
  // Funções que retornam os valores atualizados
  get ano() {
    return getWebinarConfig().ano;
  },
  get mes() {
    return getWebinarConfig().mes;
  },
  get dia() {
    return getWebinarConfig().dia;
  },
  get hora() {
    return getWebinarConfig().hora;
  },
  get minuto() {
    return getWebinarConfig().minuto;
  },
  
  // Título do webinar
  titulo: "Do Inbound Tumultuado ao Comercial Qualificado",
  
  // Duração em minutos
  duracao: 45,
  
  // Total de vagas disponíveis
  totalVagas: 33,
  
  // Vagas já preenchidas (inicial)
  vagasPreenchidas: 25,
};

// Função para calcular o tempo restante até o webinar
export const calcularTempoRestante = () => {
  const now = new Date();
  
  // Cria a data do webinar com a data configurada
  const webinarDate = new Date(
    WEBINAR_CONFIG.ano,
    WEBINAR_CONFIG.mes - 1, // JavaScript usa mês 0-11
    WEBINAR_CONFIG.dia,
    WEBINAR_CONFIG.hora,
    WEBINAR_CONFIG.minuto,
    0,
    0
  );
  
  const difference = webinarDate.getTime() - now.getTime();
  
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    return { days, hours, minutes, seconds, difference };
  }
  
  return { days: 0, hours: 0, minutes: 0, seconds: 0, difference: 0 };
};

// Função para formatar a data do webinar
export const formatarDataWebinar = () => {
  const now = new Date();
  
  // Cria a data do webinar com a data configurada
  const webinarDate = new Date(
    WEBINAR_CONFIG.ano,
    WEBINAR_CONFIG.mes - 1,
    WEBINAR_CONFIG.dia,
    WEBINAR_CONFIG.hora,
    WEBINAR_CONFIG.minuto,
    0,
    0
  );
  
  const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  
  const diaSemana = diasSemana[webinarDate.getDay()];
  const dia = webinarDate.getDate();
  const mes = meses[webinarDate.getMonth()];
  const horaFormatada = `${WEBINAR_CONFIG.hora.toString().padStart(2, '0')}:${WEBINAR_CONFIG.minuto.toString().padStart(2, '0')}`;
  
  // Verifica se é hoje ou amanhã
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);
  
  const webinarDia = new Date(webinarDate);
  webinarDia.setHours(0, 0, 0, 0);
  
  if (webinarDia.getTime() === hoje.getTime()) {
    return `Hoje às ${horaFormatada}`;
  } else if (webinarDia.getTime() === amanha.getTime()) {
    return `Amanhã às ${horaFormatada}`;
  }
  
  return `${diaSemana}, ${dia} de ${mes} às ${horaFormatada}`;
};

