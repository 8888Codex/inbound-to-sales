// Sistema de tracking de eventos de interação do usuário

export interface EventData {
  id: string;
  sessionId: string;
  timestamp: number;
  eventType: 'cta_click' | 'scroll_milestone' | 'form_field_focus' | 'button_click';
  eventName: string;
  eventDetails?: Record<string, any>;
}

const EVENTS_STORAGE_KEY = 'webinar_events';

// Obter eventos do localStorage
const getEvents = (): EventData[] => {
  try {
    const data = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erro ao ler eventos:', error);
  }
  return [];
};

// Salvar eventos
const saveEvents = (events: EventData[]): void => {
  try {
    // Manter apenas os últimos 1000 eventos
    const limitedEvents = events.slice(-1000);
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(limitedEvents));
  } catch (error) {
    console.error('Erro ao salvar eventos:', error);
  }
};

// Obter session ID atual
const getCurrentSessionId = (): string => {
  return sessionStorage.getItem('webinar_session_id') || 'unknown';
};

// Gerar ID único para evento
const generateEventId = (): string => {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Rastrear clique em CTA
export const trackCTAClick = (ctaName: string, ctaLocation: string): void => {
  const events = getEvents();
  
  const event: EventData = {
    id: generateEventId(),
    sessionId: getCurrentSessionId(),
    timestamp: Date.now(),
    eventType: 'cta_click',
    eventName: `CTA: ${ctaName}`,
    eventDetails: {
      location: ctaLocation,
      ctaName,
    },
  };
  
  events.push(event);
  saveEvents(events);
  
  console.log('🎯 CTA Click tracked:', ctaName, 'em', ctaLocation);
};

// Rastrear scroll milestone
export const trackScrollMilestone = (percentage: number): void => {
  const events = getEvents();
  const sessionId = getCurrentSessionId();
  
  // Verificar se já rastreou esse milestone nesta sessão
  const alreadyTracked = events.some(
    e => e.sessionId === sessionId && 
         e.eventType === 'scroll_milestone' && 
         e.eventDetails?.percentage === percentage
  );
  
  if (alreadyTracked) return;
  
  const event: EventData = {
    id: generateEventId(),
    sessionId,
    timestamp: Date.now(),
    eventType: 'scroll_milestone',
    eventName: `Scroll ${percentage}%`,
    eventDetails: {
      percentage,
    },
  };
  
  events.push(event);
  saveEvents(events);
  
  console.log(`📜 Scroll ${percentage}% tracked`);
};

// Rastrear foco em campo do formulário
export const trackFormFieldFocus = (fieldName: string): void => {
  const events = getEvents();
  
  const event: EventData = {
    id: generateEventId(),
    sessionId: getCurrentSessionId(),
    timestamp: Date.now(),
    eventType: 'form_field_focus',
    eventName: `Focus: ${fieldName}`,
    eventDetails: {
      fieldName,
    },
  };
  
  events.push(event);
  saveEvents(events);
};

// Rastrear clique em botão genérico
export const trackButtonClick = (buttonName: string, buttonLocation: string): void => {
  const events = getEvents();
  
  const event: EventData = {
    id: generateEventId(),
    sessionId: getCurrentSessionId(),
    timestamp: Date.now(),
    eventType: 'button_click',
    eventName: `Button: ${buttonName}`,
    eventDetails: {
      location: buttonLocation,
      buttonName,
    },
  };
  
  events.push(event);
  saveEvents(events);
};

// Obter todos os eventos
export const getAllEvents = (): EventData[] => {
  return getEvents();
};

// Obter eventos por tipo
export const getEventsByType = (eventType: EventData['eventType']): EventData[] => {
  const events = getEvents();
  return events.filter(e => e.eventType === eventType);
};

// Obter eventos por sessão
export const getEventsBySession = (sessionId: string): EventData[] => {
  const events = getEvents();
  return events.filter(e => e.sessionId === sessionId);
};

// Limpar eventos antigos (mais de 90 dias)
export const cleanOldEvents = (): void => {
  const events = getEvents();
  const cutoffDate = Date.now() - (90 * 24 * 60 * 60 * 1000);
  const filtered = events.filter(e => e.timestamp > cutoffDate);
  saveEvents(filtered);
};

// Hook de scroll tracking
export const initScrollTracking = (): (() => void) => {
  const milestones = [25, 50, 75, 100];
  let lastTracked = 0;
  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    // Rastrear milestones
    for (const milestone of milestones) {
      if (scrollPercent >= milestone && lastTracked < milestone) {
        trackScrollMilestone(milestone);
        lastTracked = milestone;
      }
    }
  };
  
  // Throttle para performance
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', throttledScroll);
  
  // Retornar função de cleanup
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
};

