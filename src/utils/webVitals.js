// Configuración de Web Vitals para monitoreo de rendimiento

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Función para enviar métricas a Google Analytics
function sendToAnalytics(metric) {
  // Aquí puedes enviar las métricas a tu servicio de analytics
  console.log('Web Vital:', metric.name, metric.value);
  
  // Ejemplo para Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Función para enviar métricas a un endpoint personalizado
function sendToCustomEndpoint(metric) {
  const body = JSON.stringify(metric);
  const url = '/api/web-vitals'; // Tu endpoint personalizado
  
  // Usar navigator.sendBeacon si está disponible
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

// Configurar el monitoreo de Web Vitals
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

// Función para iniciar el monitoreo automático
export function initWebVitalsMonitoring() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

// Función para obtener métricas específicas
export function getSpecificMetric(metricName, callback) {
  switch (metricName) {
    case 'CLS':
      getCLS(callback);
      break;
    case 'FID':
      getFID(callback);
      break;
    case 'FCP':
      getFCP(callback);
      break;
    case 'LCP':
      getLCP(callback);
      break;
    case 'TTFB':
      getTTFB(callback);
      break;
    default:
      console.warn(`Métrica desconocida: ${metricName}`);
  }
}

// Función para evaluar el rendimiento
export function evaluatePerformance(metric) {
  const thresholds = {
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FID: { good: 100, needsImprovement: 300 },
    FCP: { good: 1800, needsImprovement: 3000 },
    LCP: { good: 2500, needsImprovement: 4000 },
    TTFB: { good: 800, needsImprovement: 1800 }
  };

  const threshold = thresholds[metric.name];
  if (!threshold) return 'unknown';

  if (metric.value <= threshold.good) return 'good';
  if (metric.value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}
