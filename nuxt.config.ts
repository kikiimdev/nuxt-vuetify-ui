// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
  ],
  build: {
    transpile: ["chart.js", "vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  experimental: {
    inlineSSRStyles: false,
  },
});
