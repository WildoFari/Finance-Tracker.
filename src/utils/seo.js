// Utilidades para SEO dinámico

export const updatePageTitle = (title) => {
  document.title = `${title} | Finance App - Wildodev`;
};

export const updateMetaDescription = (description) => {
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;
};

export const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

export const updateOpenGraph = (data) => {
  const { title, description, image, url } = data;
  
  // Actualizar og:title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = title;
  
  // Actualizar og:description
  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.content = description;
  
  // Actualizar og:image
  let ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && image) ogImage.content = image;
  
  // Actualizar og:url
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && url) ogUrl.content = url;
};

export const updateTwitterCard = (data) => {
  const { title, description, image } = data;
  
  // Actualizar twitter:title
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.content = title;
  
  // Actualizar twitter:description
  let twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.content = description;
  
  // Actualizar twitter:image
  let twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage && image) twitterImage.content = image;
};

// Configuraciones SEO por página
export const seoConfig = {
  home: {
    title: 'Finance App - Gestor de Finanzas Personales',
    description: 'Toma el control de tus finanzas personales con Finance App. Gestiona gastos, ingresos, inversiones y crea presupuestos de forma inteligente.',
    keywords: 'finanzas personales, presupuesto, control de gastos, gestión financiera'
  },
  ingresos: {
    title: 'Gestión de Ingresos',
    description: 'Registra y organiza todos tus ingresos de forma eficiente. Mantén un control detallado de tus fuentes de dinero.',
    keywords: 'ingresos, dinero, salario, ganancias, finanzas personales'
  },
  egresos: {
    title: 'Control de Egresos',
    description: 'Controla tus gastos y egresos con precisión. Identifica patrones de gasto y optimiza tu presupuesto.',
    keywords: 'egresos, gastos, control financiero, presupuesto, ahorro'
  },
  inversiones: {
    title: 'Seguimiento de Inversiones',
    description: 'Monitorea el rendimiento de tus inversiones. Analiza el crecimiento de tu portafolio financiero.',
    keywords: 'inversiones, portafolio, rendimiento, finanzas, crecimiento'
  },
  graficos: {
    title: 'Gráficos y Reportes',
    description: 'Visualiza tus datos financieros con gráficos interactivos. Obtén insights valiosos sobre tu situación económica.',
    keywords: 'gráficos, reportes, análisis financiero, visualización de datos'
  }
};

// Hook personalizado para SEO
export const useSEO = (pageKey) => {
  const config = seoConfig[pageKey];
  
  if (config) {
    updatePageTitle(config.title);
    updateMetaDescription(config.description);
    updateOpenGraph({
      title: config.title,
      description: config.description,
      url: window.location.href
    });
    updateTwitterCard({
      title: config.title,
      description: config.description
    });
  }
};
