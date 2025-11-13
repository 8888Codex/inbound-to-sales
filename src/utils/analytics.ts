// Sistema de tracking de analytics usando LocalStorage

export interface LocationData {
  city: string;
  region: string;
  country: string;
}

export interface DeviceData {
  type: 'mobile' | 'desktop' | 'tablet';
  info: string;
  browser: string;
}

export interface VisitData {
  id: string;
  timestamp: number;
  sessionId: string;
  pageLoadTime: number;
  timeOnPage: number;
  formStarted: boolean;
  formCompleted: boolean;
  timeToFormStart?: number;
  timeToFormComplete?: number;
  device?: DeviceData;
  location?: LocationData;
  accessHour?: string;
}

export interface FormStartData {
  id: string;
  timestamp: number;
  sessionId: string;
  completed: boolean;
}

export interface FormCompletionData {
  id: string;
  timestamp: number;
  sessionId: string;
  timeToComplete: number;
  location?: LocationData;
  device?: DeviceData;
  accessHour?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-say';
  age?: number;
}

export interface AnalyticsData {
  visits: VisitData[];
  formStarts: FormStartData[];
  formCompletions: FormCompletionData[];
}

const STORAGE_KEY = 'webinar_analytics';
const SESSION_KEY = 'webinar_session_id';
const SESSION_START_KEY = 'webinar_session_start';
const MAX_HISTORY_DAYS = 90;

// Gerar ID único
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Obter ou criar session ID
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
    sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
  }
  return sessionId;
};

// Obter tempo de início da sessão
export const getSessionStartTime = (): number => {
  const startTime = sessionStorage.getItem(SESSION_START_KEY);
  return startTime ? parseInt(startTime, 10) : Date.now();
};

// Obter dados do LocalStorage
export const getAnalyticsData = (): AnalyticsData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Limpar dados antigos (mais de 90 dias)
      const cutoffDate = Date.now() - (MAX_HISTORY_DAYS * 24 * 60 * 60 * 1000);
      return {
        visits: parsed.visits?.filter((v: VisitData) => v.timestamp > cutoffDate) || [],
        formStarts: parsed.formStarts?.filter((f: FormStartData) => f.timestamp > cutoffDate) || [],
        formCompletions: parsed.formCompletions?.filter((f: FormCompletionData) => f.timestamp > cutoffDate) || [],
      };
    }
  } catch (error) {
    console.error('Erro ao ler analytics do LocalStorage:', error);
  }
  return {
    visits: [],
    formStarts: [],
    formCompletions: [],
  };
};

// Salvar dados no LocalStorage
const saveAnalyticsData = (data: AnalyticsData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar analytics no LocalStorage:', error);
  }
};

// Registrar visita de página
export const trackPageVisit = async (deviceData?: DeviceData, locationData?: LocationData): Promise<string> => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const visitId = generateId();
  
  // Formatar horário de acesso
  const now = new Date();
  const accessHour = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const visit: VisitData = {
    id: visitId,
    timestamp: Date.now(),
    sessionId,
    pageLoadTime: Date.now(),
    timeOnPage: 0,
    formStarted: false,
    formCompleted: false,
    device: deviceData,
    location: locationData,
    accessHour,
  };
  
  data.visits.push(visit);
  saveAnalyticsData(data);
  
  return visitId;
};

// Atualizar tempo na página
export const updateTimeOnPage = (visitId: string, timeOnPage: number): void => {
  const data = getAnalyticsData();
  const visit = data.visits.find(v => v.id === visitId);
  
  if (visit) {
    visit.timeOnPage = timeOnPage;
    saveAnalyticsData(data);
  }
};

// Registrar início de formulário
export const trackFormStart = (visitId: string): void => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const sessionStartTime = getSessionStartTime();
  const timeToFormStart = Date.now() - sessionStartTime;
  
  // Atualizar visita
  const visit = data.visits.find(v => v.id === visitId);
  if (visit) {
    visit.formStarted = true;
    visit.timeToFormStart = timeToFormStart;
  }
  
  // Adicionar registro de início de formulário
  const formStart: FormStartData = {
    id: generateId(),
    timestamp: Date.now(),
    sessionId,
    completed: false,
  };
  
  data.formStarts.push(formStart);
  saveAnalyticsData(data);
};

// Registrar conclusão de formulário
export const trackFormCompletion = (
  visitId: string, 
  deviceData?: DeviceData, 
  locationData?: LocationData,
  gender?: 'male' | 'female' | 'other' | 'prefer-not-say',
  age?: number
): void => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const sessionStartTime = getSessionStartTime();
  const timeToComplete = Date.now() - sessionStartTime;
  
  // Formatar horário de conclusão
  const now = new Date();
  const accessHour = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  // Atualizar visita
  const visit = data.visits.find(v => v.id === visitId);
  if (visit) {
    visit.formCompleted = true;
    visit.timeToFormComplete = timeToComplete;
  }
  
  // Atualizar formStart correspondente
  const formStart = data.formStarts.find(f => f.sessionId === sessionId && !f.completed);
  if (formStart) {
    formStart.completed = true;
  }
  
  // Adicionar registro de conclusão
  const formCompletion: FormCompletionData = {
    id: generateId(),
    timestamp: Date.now(),
    sessionId,
    timeToComplete,
    device: deviceData,
    location: locationData,
    accessHour,
    gender,
    age,
  };
  
  data.formCompletions.push(formCompletion);
  saveAnalyticsData(data);
};

// Limpar todos os dados (útil para testes)
export const clearAnalyticsData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Exportar dados para backup/análise
export const exportAnalyticsData = (): string => {
  const data = getAnalyticsData();
  return JSON.stringify(data, null, 2);
};


