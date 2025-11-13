// Utilitário para detecção de dispositivo, navegador e informações do User-Agent

import { DeviceData } from './analytics';

// Detectar tipo de dispositivo
export const detectDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
  const ua = navigator.userAgent.toLowerCase();
  
  // Detectar tablet
  if (/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet';
  }
  
  // Detectar mobile
  if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone/i.test(ua)) {
    return 'mobile';
  }
  
  // Default: desktop
  return 'desktop';
};

// Detectar navegador
export const detectBrowser = (): string => {
  const ua = navigator.userAgent;
  
  // Ordem importa: navegadores baseados em Chromium devem vir antes do Chrome
  if (ua.includes('Edg/')) {
    return 'Edge';
  }
  if (ua.includes('OPR/') || ua.includes('Opera/')) {
    return 'Opera';
  }
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
    return 'Chrome';
  }
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
    return 'Safari';
  }
  if (ua.includes('Firefox/')) {
    return 'Firefox';
  }
  if (ua.includes('MSIE') || ua.includes('Trident/')) {
    return 'Internet Explorer';
  }
  
  return 'Outro';
};

// Obter informações detalhadas do dispositivo
export const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  
  // Detectar iOS
  if (/iPhone/.test(ua)) {
    return 'iPhone';
  }
  if (/iPad/.test(ua)) {
    return 'iPad';
  }
  
  // Detectar Android
  if (/Android/.test(ua)) {
    const match = ua.match(/Android\s([0-9.]*)/);
    return match ? `Android ${match[1]}` : 'Android';
  }
  
  // Detectar Windows
  if (/Windows/.test(ua)) {
    if (/Windows NT 10.0/.test(ua)) return 'Windows 10/11';
    if (/Windows NT 6.3/.test(ua)) return 'Windows 8.1';
    if (/Windows NT 6.2/.test(ua)) return 'Windows 8';
    if (/Windows NT 6.1/.test(ua)) return 'Windows 7';
    return 'Windows';
  }
  
  // Detectar macOS
  if (/Macintosh|Mac OS X/.test(ua)) {
    const match = ua.match(/Mac OS X ([0-9_]*)/);
    if (match) {
      const version = match[1].replace(/_/g, '.');
      return `macOS ${version}`;
    }
    return 'macOS';
  }
  
  // Detectar Linux
  if (/Linux/.test(ua)) {
    return 'Linux';
  }
  
  return 'Desconhecido';
};

// Obter informações completas do dispositivo
export const getDeviceData = (): DeviceData => {
  return {
    type: detectDeviceType(),
    info: getDeviceInfo(),
    browser: detectBrowser(),
  };
};

// Obter informações de tela
export const getScreenInfo = (): { width: number; height: number } => {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
};

// Verificar se é dispositivo touch
export const isTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - msMaxTouchPoints é legado mas ainda útil
    navigator.msMaxTouchPoints > 0
  );
};

