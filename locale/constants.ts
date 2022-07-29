// Idiomas que soportará la app
const EN_US = "en-US";
const ES_ES = "es-ES";
const PT_BR = "pt-BR";

// Idioma por defecto
export const defaultLocale = ES_ES;

// Guardamos los idiomas en un objeto
// para exportarlos todos juntos
export const locales = {
  EN_US,
  ES_ES,
  PT_BR,
};

// Guardamos los nombres de cada idioma
// para usar en la botonera
export const localeNames = {
  [EN_US]: "English",
  [ES_ES]: "Español",
  [PT_BR]: "Português",
};

// Guardamos los distintos textos que usamos
// a lo largo de la app
export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    // Menu de navegación
    HEADER: {
      HOME: "Home",
      FAQS: "FAQS",
    },
    MAIN: {
      // Para el meta tag de la Home
      DESCRIPTION:
        "A website where you can connect with other people quickly and easily",
      // Para la presentación de la página que va debajo del título
      SUBTITLE:
        "Here you can find the latest users who have joined our network",
    },
    FAQS: {
      // Título de la página de preguntas frecuentes
      TITLE: "Frequently Asked Questions",
      // Para el metatag de esta página
      DESCRIPTION: "Frequently asked questions about using the RandomIn app",
    },
  },
  [ES_ES]: {
    HEADER: {
      HOME: "Página principal",
      FAQS: "Preguntas frecuentes",
    },
    MAIN: {
      DESCRIPTION:
        "Una web en donde podrás conectar con otras personas de forma rápida y sencilla",
      SUBTITLE:
        "Aqui podrás encontrar los últimos usuarios que se han unido a la red",
    },
    FAQS: {
      TITLE: "Preguntas Frecuentes",
      DESCRIPTION: "Preguntas frecuentes del uso de la app RandomIn",
    },
  },
  [PT_BR]: {
    HEADER: {
      HOME: "Página principal",
      FAQS: "Perguntas Freqüentes",
    },
    MAIN: {
      DESCRIPTION:
        "Um site onde você pode se conectar com outras pessoas de forma rápida e fácil",
      SUBTITLE:
        "Aqui você pode encontrar os usuários mais recentes que ingressaram na rede",
    },
    FAQS: {
      TITLE: "Perguntas Freqüentes",
      DESCRIPTION: "Perguntas frequentes sobre o uso do web RandomIn",
    },
  },
};
