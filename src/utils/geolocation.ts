// Utilitário para gerenciar geolocalização dos visitantes

export interface VisitorLocation {
  city: string;
  region: string;
  country: string;
  timestamp: number;
}

const LOCATION_STORAGE_KEY = 'visitor_location';
const LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

// Pega a localização do localStorage se estiver em cache
export const getCachedLocation = (): VisitorLocation | null => {
  try {
    const cached = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!cached) return null;
    
    const location: VisitorLocation = JSON.parse(cached);
    
    // Verifica se o cache ainda é válido
    if (Date.now() - location.timestamp < LOCATION_CACHE_DURATION) {
      return location;
    }
    
    // Cache expirado, remove
    localStorage.removeItem(LOCATION_STORAGE_KEY);
    return null;
  } catch (error) {
    console.error('Erro ao ler localização do cache:', error);
    return null;
  }
};

// Salva a localização no localStorage
const saveLocation = (location: VisitorLocation) => {
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch (error) {
    console.error('Erro ao salvar localização:', error);
  }
};

// Busca a localização via IP usando API gratuita
export const fetchVisitorLocation = async (): Promise<VisitorLocation | null> => {
  // Primeiro verifica se tem no cache
  const cached = getCachedLocation();
  if (cached) {
    return cached;
  }

  try {
    // Usa a API do ipapi.co (gratuita, sem necessidade de key)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar localização');
    }

    const data = await response.json();
    
    const location: VisitorLocation = {
      city: data.city || 'São Paulo',
      region: data.region_code || 'SP',
      country: data.country_name || 'Brasil',
      timestamp: Date.now(),
    };

    saveLocation(location);
    return location;
  } catch (error) {
    console.error('Erro ao buscar localização:', error);
    
    // Fallback para São Paulo
    const fallbackLocation: VisitorLocation = {
      city: 'São Paulo',
      region: 'SP',
      country: 'Brasil',
      timestamp: Date.now(),
    };
    
    return fallbackLocation;
  }
};

// Formata a localização para exibição
export const formatLocation = (location: VisitorLocation): string => {
  return `${location.city}, ${location.region}`;
};

// Adiciona visitante ao pool de notificações
export const addVisitorToPool = (name?: string): void => {
  try {
    const location = getCachedLocation();
    if (!location) return;

    const pool = getVisitorPool();
    const visitor = {
      name: name || 'Visitante',
      location: formatLocation(location),
      timestamp: Date.now(),
    };

    pool.push(visitor);
    
    // Mantém apenas os últimos 50 visitantes
    if (pool.length > 50) {
      pool.shift();
    }

    localStorage.setItem('visitor_pool', JSON.stringify(pool));
  } catch (error) {
    console.error('Erro ao adicionar visitante ao pool:', error);
  }
};

// Pega o pool de visitantes
export const getVisitorPool = (): Array<{ name: string; location: string; timestamp: number }> => {
  try {
    const pool = localStorage.getItem('visitor_pool');
    return pool ? JSON.parse(pool) : [];
  } catch (error) {
    console.error('Erro ao ler pool de visitantes:', error);
    return [];
  }
};

// Inicializa a geolocalização quando o usuário acessa o site
export const initializeGeolocation = async (): Promise<void> => {
  await fetchVisitorLocation();
  addVisitorToPool();
};

