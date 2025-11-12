// Sistema de eventos para notificações de inscrição

export interface InscriptionEventData {
  nome: string;
  cidade: string;
}

const INSCRIPTION_EVENT_NAME = 'user-inscription';

// Dispara evento quando usuário se inscreve
export const triggerInscriptionNotification = (nome: string, cidade: string): void => {
  const event = new CustomEvent<InscriptionEventData>(INSCRIPTION_EVENT_NAME, {
    detail: { nome, cidade },
    bubbles: true,
  });
  window.dispatchEvent(event);
};

// Função para escutar eventos de inscrição
export const listenToInscriptions = (
  callback: (data: InscriptionEventData) => void
): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<InscriptionEventData>;
    callback(customEvent.detail);
  };

  window.addEventListener(INSCRIPTION_EVENT_NAME, handler);

  // Retorna função para remover o listener
  return () => {
    window.removeEventListener(INSCRIPTION_EVENT_NAME, handler);
  };
};

