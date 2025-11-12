// Utilitário para gerenciar configurações administrativas
// As configurações são salvas no localStorage

export interface AdminConfig {
  // Configurações do Webinar
  webinar: {
    ano: number;
    mes: number;
    dia: number;
    hora: number;
    minuto: number;
  };
  
  // IDs de Tracking
  tracking: {
    metaAdsPixelId: string;
    googleAdsConversionId: string;
    googleAnalyticsId: string;
    googleTagManagerId: string;
  };
}

const ADMIN_CONFIG_KEY = "admin_webinar_config";
const ADMIN_PASSWORD_KEY = "admin_password_hash";

// Hash simples da senha (em produção, use algo mais seguro)
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

// Configuração padrão
const defaultConfig: AdminConfig = {
  webinar: {
    ano: 2025,
    mes: 11,
    dia: 26,
    hora: 19,
    minuto: 0,
  },
  tracking: {
    metaAdsPixelId: "",
    googleAdsConversionId: "",
    googleAnalyticsId: "",
    googleTagManagerId: "",
  },
};

// Carregar configurações salvas
export const loadAdminConfig = (): AdminConfig => {
  try {
    const saved = localStorage.getItem(ADMIN_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge com default para garantir que campos novos sejam incluídos
      return {
        webinar: { ...defaultConfig.webinar, ...parsed.webinar },
        tracking: { ...defaultConfig.tracking, ...parsed.tracking },
      };
    }
  } catch (error) {
    console.error("Erro ao carregar configurações:", error);
  }
  return defaultConfig;
};

// Salvar configurações
export const saveAdminConfig = (config: AdminConfig): void => {
  try {
    localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);
    throw new Error("Erro ao salvar configurações");
  }
};

// Verificar senha
export const verifyPassword = (password: string): boolean => {
  const savedHash = localStorage.getItem(ADMIN_PASSWORD_KEY);
  const inputHash = hashPassword(password);
  
  // Se não há senha salva, aceita qualquer senha na primeira vez e salva
  if (!savedHash) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, inputHash);
    return true;
  }
  
  return savedHash === inputHash;
};

// Alterar senha
export const changePassword = (oldPassword: string, newPassword: string): boolean => {
  if (!verifyPassword(oldPassword)) {
    return false;
  }
  
  const newHash = hashPassword(newPassword);
  localStorage.setItem(ADMIN_PASSWORD_KEY, newHash);
  return true;
};

