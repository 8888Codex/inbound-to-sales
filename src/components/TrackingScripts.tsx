import { useEffect, useRef } from "react";
import { loadAdminConfig } from "@/utils/adminConfig";

// Declarações de tipo para scripts de tracking
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const TrackingScripts = () => {
  const scriptsLoaded = useRef(false);

  useEffect(() => {
    // Evitar carregar scripts múltiplas vezes
    if (scriptsLoaded.current) return;
    
    const config = loadAdminConfig();
    const { tracking } = config;
    
    scriptsLoaded.current = true;

    // Meta Pixel (Facebook Ads)
    if (tracking.metaAdsPixelId && !window.fbq) {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${tracking.metaAdsPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Noscript fallback
      if (!document.querySelector('noscript img[src*="facebook.com/tr"]')) {
        const noscript = document.createElement("noscript");
        noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${tracking.metaAdsPixelId}&ev=PageView&noscript=1"/>`;
        document.body.appendChild(noscript);
      }
    }

    // Google Tag Manager
    if (tracking.googleTagManagerId && !window.dataLayer?.some((item: any) => item['gtm.start'])) {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${tracking.googleTagManagerId}');
      `;
      document.head.appendChild(gtmScript);

      // Noscript fallback
      if (!document.querySelector('noscript iframe[src*="googletagmanager.com/ns.html"]')) {
        const gtmNoscript = document.createElement("noscript");
        gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${tracking.googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(gtmNoscript, document.body.firstChild);
      }
    }

    // Google Analytics (se não estiver usando GTM)
    if (tracking.googleAnalyticsId && !tracking.googleTagManagerId) {
      const gaScript1 = document.createElement("script");
      gaScript1.async = true;
      gaScript1.src = `https://www.googletagmanager.com/gtag/js?id=${tracking.googleAnalyticsId}`;
      document.head.appendChild(gaScript1);

      const gaScript2 = document.createElement("script");
      gaScript2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${tracking.googleAnalyticsId}');
      `;
      document.head.appendChild(gaScript2);
    }

    // Google Ads Conversion Tracking
    if (tracking.googleAdsConversionId) {
      const gadsScript = document.createElement("script");
      gadsScript.src = `https://www.googletagmanager.com/gtag/js?id=${tracking.googleAdsConversionId}`;
      gadsScript.async = true;
      document.head.appendChild(gadsScript);

      const gadsConfig = document.createElement("script");
      gadsConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${tracking.googleAdsConversionId}');
      `;
      document.head.appendChild(gadsConfig);
    }
  }, []);

  return null;
};

