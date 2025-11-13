// Utilitários para processar e agregar dados de analytics

import { getAnalyticsData, type VisitData, type FormStartData, type FormCompletionData } from './analytics';
import { startOfDay, startOfWeek, startOfMonth, format, subDays, subWeeks, subMonths, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export type Period = 'day' | 'week' | 'month';

export interface CustomDateRange {
  startDate: Date;
  endDate: Date;
}

export interface DeviceDistribution {
  device: string;
  count: number;
  percentage: number;
}

export interface LocationDistribution {
  location: string;
  count: number;
  percentage: number;
}

export interface HourDistribution {
  hour: string;
  count: number;
}

export interface DayOfWeekDistribution {
  day: string;
  count: number;
}

export interface GenderDistribution {
  gender: string;
  count: number;
  percentage: number;
}

export interface AgeDistribution {
  ageRange: string;
  count: number;
  percentage: number;
}

export interface AggregatedMetrics {
  totalVisits: number;
  totalFormStarts: number;
  totalFormCompletions: number;
  abandonedForms: number;
  conversionRate: number;
  abandonmentRate: number;
  averageTimeOnPage: number;
  averageTimeToFormStart: number;
  averageTimeToComplete: number;
  deviceDistribution: DeviceDistribution[];
  locationDistribution: LocationDistribution[];
  hourDistribution: HourDistribution[];
  dayOfWeekDistribution: DayOfWeekDistribution[];
  genderDistribution: GenderDistribution[];
  ageDistribution: AgeDistribution[];
}

export interface TimeSeriesData {
  date: string;
  visits: number;
  formStarts: number;
  formCompletions: number;
  abandonedForms: number;
}

// Calcular métricas agregadas para um período
export const calculateMetrics = (period: Period): AggregatedMetrics => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  // Filtrar dados pelo período
  const visits = data.visits.filter(v => 
    isWithinInterval(v.timestamp, { start: startDate, end: endDate })
  );
  
  const formStarts = data.formStarts.filter(f => 
    isWithinInterval(f.timestamp, { start: startDate, end: endDate })
  );
  
  const formCompletions = data.formCompletions.filter(f => 
    isWithinInterval(f.timestamp, { start: startDate, end: endDate })
  );
  
  // Calcular métricas
  const totalVisits = visits.length;
  const totalFormStarts = formStarts.length;
  const totalFormCompletions = formCompletions.length;
  const abandonedForms = totalFormStarts - totalFormCompletions;
  
  const conversionRate = totalVisits > 0 
    ? (totalFormCompletions / totalVisits) * 100 
    : 0;
  
  const abandonmentRate = totalFormStarts > 0 
    ? (abandonedForms / totalFormStarts) * 100 
    : 0;
  
  // Tempo médio na página (em segundos)
  const averageTimeOnPage = visits.length > 0
    ? visits.reduce((sum, v) => sum + v.timeOnPage, 0) / visits.length
    : 0;
  
  // Tempo médio até iniciar formulário (em segundos)
  const visitsWithFormStart = visits.filter(v => v.formStarted && v.timeToFormStart);
  const averageTimeToFormStart = visitsWithFormStart.length > 0
    ? visitsWithFormStart.reduce((sum, v) => sum + (v.timeToFormStart || 0), 0) / visitsWithFormStart.length / 1000
    : 0;
  
  // Tempo médio até completar formulário (em segundos)
  const averageTimeToComplete = formCompletions.length > 0
    ? formCompletions.reduce((sum, f) => sum + f.timeToComplete, 0) / formCompletions.length / 1000
    : 0;
  
  return {
    totalVisits,
    totalFormStarts,
    totalFormCompletions,
    abandonedForms,
    conversionRate,
    abandonmentRate,
    averageTimeOnPage,
    averageTimeToFormStart,
    averageTimeToComplete,
    deviceDistribution: calculateDeviceDistribution(period),
    locationDistribution: calculateLocationDistribution(period, 10),
    hourDistribution: calculateHourDistribution(period),
    dayOfWeekDistribution: calculateDayOfWeekDistribution(period),
    genderDistribution: calculateGenderDistribution(period),
    ageDistribution: calculateAgeDistribution(period),
  };
};

// Obter dados de série temporal para gráficos
export const getTimeSeriesData = (period: Period): TimeSeriesData[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  // Criar estrutura de dados agrupados por data
  const groupedData = new Map<string, TimeSeriesData>();
  
  // Inicializar todas as datas no período
  const dates = generateDateRange(period, startDate, endDate);
  dates.forEach(date => {
    groupedData.set(date, {
      date,
      visits: 0,
      formStarts: 0,
      formCompletions: 0,
      abandonedForms: 0,
    });
  });
  
  // Agrupar visitas
  data.visits
    .filter(v => isWithinInterval(v.timestamp, { start: startDate, end: endDate }))
    .forEach(visit => {
      const dateKey = formatDateKey(visit.timestamp, period);
      const entry = groupedData.get(dateKey);
      if (entry) {
        entry.visits++;
      }
    });
  
  // Agrupar form starts
  data.formStarts
    .filter(f => isWithinInterval(f.timestamp, { start: startDate, end: endDate }))
    .forEach(formStart => {
      const dateKey = formatDateKey(formStart.timestamp, period);
      const entry = groupedData.get(dateKey);
      if (entry) {
        entry.formStarts++;
        if (!formStart.completed) {
          entry.abandonedForms++;
        }
      }
    });
  
  // Agrupar form completions
  data.formCompletions
    .filter(f => isWithinInterval(f.timestamp, { start: startDate, end: endDate }))
    .forEach(formCompletion => {
      const dateKey = formatDateKey(formCompletion.timestamp, period);
      const entry = groupedData.get(dateKey);
      if (entry) {
        entry.formCompletions++;
      }
    });
  
  return Array.from(groupedData.values());
};

// Obter intervalo de datas para o período
const getPeriodRange = (period: Period): { startDate: Date; endDate: Date } => {
  const endDate = new Date();
  let startDate: Date;
  
  switch (period) {
    case 'day':
      // Dia atual (início do dia até agora)
      startDate = startOfDay(endDate);
      break;
    case 'week':
      // Últimos 7 dias
      startDate = startOfDay(subDays(endDate, 6));
      break;
    case 'month':
      // Últimos 30 dias
      startDate = startOfDay(subDays(endDate, 29));
      break;
  }
  
  return { startDate, endDate };
};

// Gerar array de datas para o período
const generateDateRange = (period: Period, startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    dates.push(formatDateKey(current.getTime(), period));
    
    switch (period) {
      case 'day':
        current.setDate(current.getDate() + 1);
        break;
      case 'week':
        current.setDate(current.getDate() + 7);
        break;
      case 'month':
        current.setMonth(current.getMonth() + 1);
        break;
    }
  }
  
  return dates;
};

// Formatar chave de data baseada no período
const formatDateKey = (timestamp: number, period: Period): string => {
  const date = new Date(timestamp);
  
  switch (period) {
    case 'day':
      return format(date, 'dd/MM', { locale: ptBR });
    case 'week':
      return format(startOfWeek(date, { locale: ptBR }), 'dd/MM', { locale: ptBR });
    case 'month':
      return format(date, 'MMM/yy', { locale: ptBR });
  }
};

// Formatar tempo em formato legível
export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

// Formatar porcentagem
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Calcular distribuição por dispositivo
export const calculateDeviceDistribution = (period: Period): DeviceDistribution[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  const visits = data.visits.filter(v => 
    isWithinInterval(v.timestamp, { start: startDate, end: endDate }) && v.device
  );
  
  const deviceCounts = new Map<string, number>();
  
  visits.forEach(visit => {
    if (visit.device) {
      const deviceType = visit.device.type;
      deviceCounts.set(deviceType, (deviceCounts.get(deviceType) || 0) + 1);
    }
  });
  
  const total = visits.length;
  const distribution: DeviceDistribution[] = [];
  
  deviceCounts.forEach((count, device) => {
    distribution.push({
      device: device.charAt(0).toUpperCase() + device.slice(1),
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    });
  });
  
  return distribution.sort((a, b) => b.count - a.count);
};

// Calcular distribuição por localização
export const calculateLocationDistribution = (period: Period, limit: number = 10): LocationDistribution[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  const visits = data.visits.filter(v => 
    isWithinInterval(v.timestamp, { start: startDate, end: endDate }) && v.location
  );
  
  const locationCounts = new Map<string, number>();
  
  visits.forEach(visit => {
    if (visit.location) {
      const location = `${visit.location.city}, ${visit.location.region}`;
      locationCounts.set(location, (locationCounts.get(location) || 0) + 1);
    }
  });
  
  const total = visits.length;
  const distribution: LocationDistribution[] = [];
  
  locationCounts.forEach((count, location) => {
    distribution.push({
      location,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    });
  });
  
  return distribution.sort((a, b) => b.count - a.count).slice(0, limit);
};

// Calcular distribuição por horário (hora do dia)
export const calculateHourDistribution = (period: Period): HourDistribution[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  const visits = data.visits.filter(v => 
    isWithinInterval(v.timestamp, { start: startDate, end: endDate })
  );
  
  const hourCounts = new Map<number, number>();
  
  // Inicializar todas as horas
  for (let i = 0; i < 24; i++) {
    hourCounts.set(i, 0);
  }
  
  visits.forEach(visit => {
    const hour = new Date(visit.timestamp).getHours();
    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
  });
  
  const distribution: HourDistribution[] = [];
  
  hourCounts.forEach((count, hour) => {
    distribution.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      count,
    });
  });
  
  return distribution.sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
};

// Calcular distribuição por dia da semana
export const calculateDayOfWeekDistribution = (period: Period): DayOfWeekDistribution[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  const visits = data.visits.filter(v => 
    isWithinInterval(v.timestamp, { start: startDate, end: endDate })
  );
  
  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const dayCounts = new Map<number, number>();
  
  // Inicializar todos os dias
  for (let i = 0; i < 7; i++) {
    dayCounts.set(i, 0);
  }
  
  visits.forEach(visit => {
    const day = new Date(visit.timestamp).getDay();
    dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
  });
  
  const distribution: DayOfWeekDistribution[] = [];
  
  dayCounts.forEach((count, day) => {
    distribution.push({
      day: dayNames[day],
      count,
    });
  });
  
  return distribution;
};

// Calcular distribuição por gênero
export const calculateGenderDistribution = (period: Period): GenderDistribution[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  const completions = data.formCompletions.filter(f => 
    isWithinInterval(f.timestamp, { start: startDate, end: endDate }) && f.gender
  );
  
  const genderCounts = new Map<string, number>();
  const genderLabels: Record<string, string> = {
    'male': 'Masculino',
    'female': 'Feminino',
    'other': 'Outro',
    'prefer-not-say': 'Não informado'
  };
  
  completions.forEach(completion => {
    if (completion.gender) {
      const label = genderLabels[completion.gender] || completion.gender;
      genderCounts.set(label, (genderCounts.get(label) || 0) + 1);
    }
  });
  
  const total = completions.length;
  const distribution: GenderDistribution[] = [];
  
  genderCounts.forEach((count, gender) => {
    distribution.push({
      gender,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    });
  });
  
  return distribution.sort((a, b) => b.count - a.count);
};

// Calcular distribuição por idade
export const calculateAgeDistribution = (period: Period): AgeDistribution[] => {
  const data = getAnalyticsData();
  const { startDate, endDate } = getPeriodRange(period);
  
  const completions = data.formCompletions.filter(f => 
    isWithinInterval(f.timestamp, { start: startDate, end: endDate }) && f.age
  );
  
  const ageRanges = [
    { range: '18-24', min: 18, max: 24 },
    { range: '25-34', min: 25, max: 34 },
    { range: '35-44', min: 35, max: 44 },
    { range: '45-54', min: 45, max: 54 },
    { range: '55-64', min: 55, max: 64 },
    { range: '65+', min: 65, max: 150 },
  ];
  
  const ageCounts = new Map<string, number>();
  
  // Inicializar todas as faixas
  ageRanges.forEach(range => {
    ageCounts.set(range.range, 0);
  });
  
  completions.forEach(completion => {
    if (completion.age) {
      const ageRange = ageRanges.find(r => completion.age! >= r.min && completion.age! <= r.max);
      if (ageRange) {
        ageCounts.set(ageRange.range, (ageCounts.get(ageRange.range) || 0) + 1);
      }
    }
  });
  
  const total = completions.length;
  const distribution: AgeDistribution[] = [];
  
  ageCounts.forEach((count, ageRange) => {
    distribution.push({
      ageRange,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    });
  });
  
  return distribution;
};

