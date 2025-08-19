// Google Analytics Configuration
// Reemplaza 'GA_MEASUREMENT_ID' con tu ID real de Google Analytics

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Configuración básica
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'Finance App',
  page_location: window.location.href,
  custom_map: {
    'custom_dimension1': 'user_type',
    'custom_dimension2': 'feature_used'
  }
});

// Eventos personalizados para tracking de funcionalidades
function trackFeatureUsage(featureName) {
  gtag('event', 'feature_usage', {
    'event_category': 'engagement',
    'event_label': featureName,
    'value': 1
  });
}

// Tracking de páginas
function trackPageView(pageName) {
  gtag('event', 'page_view', {
    'page_title': pageName,
    'page_location': window.location.href
  });
}

// Exportar funciones para uso en componentes React
window.trackFeatureUsage = trackFeatureUsage;
window.trackPageView = trackPageView;
