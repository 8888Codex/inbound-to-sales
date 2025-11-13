// Hook para rastrear automaticamente a página

import { useEffect, useRef } from 'react';
import { trackPageVisit, updateTimeOnPage, getSessionStartTime } from '@/utils/analytics';
import { fetchVisitorLocation } from '@/utils/geolocation';
import { getDeviceData } from '@/utils/deviceDetection';

export const usePageTracking = () => {
  const visitIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Registrar visita ao carregar com geolocalização e device detection
    const initTracking = async () => {
      const deviceData = getDeviceData();
      const locationData = await fetchVisitorLocation();
      
      const visitId = await trackPageVisit(
        deviceData,
        locationData ? {
          city: locationData.city,
          region: locationData.region,
          country: locationData.country,
        } : undefined
      );
      
      visitIdRef.current = visitId;
    };
    
    initTracking();
    startTimeRef.current = Date.now();

    // Atualizar tempo na página a cada 10 segundos
    updateIntervalRef.current = setInterval(() => {
      if (visitIdRef.current) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateTimeOnPage(visitIdRef.current, timeOnPage);
      }
    }, 10000); // 10 segundos

    // Atualizar tempo ao sair da página
    const handleBeforeUnload = () => {
      if (visitIdRef.current) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateTimeOnPage(visitIdRef.current, timeOnPage);
      }
    };

    // Atualizar tempo quando a página fica invisível
    const handleVisibilityChange = () => {
      if (document.hidden && visitIdRef.current) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateTimeOnPage(visitIdRef.current, timeOnPage);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // Limpar interval
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }

      // Atualizar tempo final
      if (visitIdRef.current) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateTimeOnPage(visitIdRef.current, timeOnPage);
      }

      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return visitIdRef.current;
};


