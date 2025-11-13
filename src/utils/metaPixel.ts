// Utilitário para rastrear eventos do Meta Pixel

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
  }
}

/**
 * Rastreia o evento personalizado "Lead Confirmado – LP Webinário Cognita"
 * Dispara apenas uma vez por sessão para evitar duplicação
 */
export const trackLeadConfirmado = (): void => {
  // Verificar se já foi disparado nesta sessão
  const alreadyDispatched = sessionStorage.getItem('meta_pixel_lead_confirmado_dispatched');
  if (alreadyDispatched === 'true') {
    return;
  }

  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('trackCustom', 'Lead Confirmado – LP Webinário Cognita');
      sessionStorage.setItem('meta_pixel_lead_confirmado_dispatched', 'true');
      console.log('Evento Meta Pixel "Lead Confirmado" disparado com sucesso');
    } catch (error) {
      console.error('Erro ao rastrear evento do Meta Pixel:', error);
    }
  } else {
    // Se fbq não estiver disponível ainda, tentar novamente após um delay
    setTimeout(() => {
      if (window.fbq && !sessionStorage.getItem('meta_pixel_lead_confirmado_dispatched')) {
        try {
          window.fbq('trackCustom', 'Lead Confirmado – LP Webinário Cognita');
          sessionStorage.setItem('meta_pixel_lead_confirmado_dispatched', 'true');
          console.log('Evento Meta Pixel "Lead Confirmado" disparado com sucesso (retry)');
        } catch (error) {
          console.error('Erro ao rastrear evento do Meta Pixel (retry):', error);
        }
      }
    }, 1000);
  }
};

/**
 * Rastreia eventos personalizados do Meta Pixel
 * @param eventName Nome do evento personalizado
 * @param eventData Dados adicionais do evento (opcional)
 */
export const trackMetaPixelCustomEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      if (eventData) {
        window.fbq('trackCustom', eventName, eventData);
      } else {
        window.fbq('trackCustom', eventName);
      }
    } catch (error) {
      console.error('Erro ao rastrear evento personalizado do Meta Pixel:', error);
    }
  }
};

/**
 * Rastreia eventos padrão do Meta Pixel (Lead, CompleteRegistration, etc)
 * @param eventName Nome do evento padrão
 * @param eventData Dados adicionais do evento (opcional)
 */
export const trackMetaPixelStandardEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      if (eventData) {
        window.fbq('track', eventName, eventData);
      } else {
        window.fbq('track', eventName);
      }
    } catch (error) {
      console.error('Erro ao rastrear evento padrão do Meta Pixel:', error);
    }
  }
};

