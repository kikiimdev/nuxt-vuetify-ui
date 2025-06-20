import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md2 } from "vuetify/blueprints";
import * as labs from "vuetify/labs/components";

const eumkmLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F9FAFE",
    // surface: '#FFFFFF',
    primary: "#F5B502",
    // primary: "#36A3F7",
    // primary: '#6200EE',
    // secondary: '#03DAC6',
    // error: '#B00020',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FB8C00',
  },
};

const disporaLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F9FAFE",
    drawer: "#2F4256",
    // surface: '#FFFFFF',
    primary: "#36A3F7",
    // secondary: '#03DAC6',
    // error: '#B00020',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FB8C00',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md2,
    components: {
      ...labs,
      ...components,
    },
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        eumkmLight,
        disporaLight,
      },
    },
    defaults: {
      VDataTable: {
        fixedHeader: true,
        noDataText: "Results not found",
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});

// F9FAFE
