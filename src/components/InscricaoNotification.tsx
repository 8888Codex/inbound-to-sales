import { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { getVisitorPool, getCachedLocation, initializeGeolocation, addVisitorToPool } from "@/utils/geolocation";
import { listenToInscriptions } from "@/utils/inscriptionEvents";

const nomesFake = [
  "Carlos Silva",
  "Ana Paula Costa",
  "Roberto Mendes",
  "Juliana Santos",
  "Fernando Oliveira",
  "Mariana Ferreira",
  "Paulo Rodrigues",
  "Camila Almeida",
  "Ricardo Souza",
  "Beatriz Lima",
  "Leonardo Costa",
  "Patricia Martins",
  "Gustavo Pereira",
  "Fernanda Rocha",
  "Marcos Vieira",
  "Luciana Ribeiro",
  "André Barbosa",
  "Renata Carvalho",
  "Diego Fernandes",
  "Carolina Dias",
  "Rafael Santos",
  "Isabela Costa",
  "Thiago Almeida",
  "Amanda Ferreira",
  "Lucas Oliveira",
];

interface Notification {
  id: number;
  nome: string;
  cidade: string;
  tempo: string;
}

export const InscricaoNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(0);

  // Inicializa a geolocalização quando o componente monta
  useEffect(() => {
    initializeGeolocation();
  }, []);

  // Escuta eventos de inscrição real do usuário
  useEffect(() => {
    const unsubscribe = listenToInscriptions((data) => {
      // Adiciona o visitante ao pool
      addVisitorToPool(data.nome);

      // Cria notificação imediata com os dados reais
      setNextId((prevId) => {
        const newId = prevId;
        const newNotification: Notification = {
          id: newId,
          nome: data.nome,
          cidade: data.cidade,
          tempo: "agora mesmo",
        };

        // Limpa notificações anteriores e mostra a nova
        setNotifications([newNotification]);

        // Remove automaticamente após 8 segundos
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
        }, 8000);

        return newId + 1;
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Primeira notificação aparece após 8-12 segundos
    const initialDelay = Math.random() * 4000 + 8000;

    const showRandomNotification = () => {
      // Não mostra se já tem uma notificação visível
      if (notifications.length > 0) {
        return;
      }

      // Tenta pegar visitantes reais primeiro
      const visitorPool = getVisitorPool();
      const location = getCachedLocation();
      
      let nome: string;
      let cidade: string;
      
      // 70% das vezes usa visitantes reais (se houver), 30% usa nomes fake
      if (visitorPool.length > 0 && Math.random() > 0.3) {
        // Usa um visitante real aleatório
        const randomVisitor = visitorPool[Math.floor(Math.random() * visitorPool.length)];
        nome = randomVisitor.name === 'Visitante' ? nomesFake[Math.floor(Math.random() * nomesFake.length)] : randomVisitor.name;
        cidade = randomVisitor.location;
      } else {
        // Usa nome fake com localização real do usuário atual ou padrão
        nome = nomesFake[Math.floor(Math.random() * nomesFake.length)];
        cidade = location ? `${location.city}, ${location.region}` : "São Paulo, SP";
      }

      const temposAleatorios = [
        "há alguns segundos",
        "há 1 minuto",
        "há 2 minutos",
        "há 3 minutos",
        "agora mesmo",
      ];
      const tempo = temposAleatorios[Math.floor(Math.random() * temposAleatorios.length)];

      const newNotification: Notification = {
        id: nextId,
        nome: nome,
        cidade: cidade,
        tempo: tempo,
      };

      setNotifications([newNotification]); // Substitui ao invés de adicionar
      setNextId((prev) => prev + 1);

      // Remove automaticamente após 8 segundos
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
      }, 8000);
    };

    const initialTimer = setTimeout(() => {
      showRandomNotification();

      // Depois mostra novas notificações a cada 45-75 segundos
      const interval = setInterval(() => {
        showRandomNotification();
      }, Math.random() * 30000 + 45000); // Entre 45 e 75 segundos

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, [nextId, notifications.length]);

  const handleDismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-card border-2 border-accent/50 rounded-xl shadow-2xl p-4 animate-fade-in-up relative"
          style={{
            animation: "slideInLeft 0.5s ease-out",
          }}
        >
          <button
            onClick={() => handleDismiss(notification.id)}
            className="absolute -top-2 -right-2 bg-card border-2 border-accent rounded-full p-1 hover:bg-accent hover:text-accent-foreground transition-all"
            aria-label="Fechar"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-accent/20 rounded-full p-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-card-foreground text-sm">
                {notification.nome}
              </p>
              <p className="text-muted-foreground text-xs">
                de {notification.cidade}
              </p>
              <p className="text-accent text-xs font-semibold mt-1">
                ✓ Acabou de se inscrever
              </p>
              <p className="text-muted-foreground text-[10px] mt-0.5">
                {notification.tempo}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

