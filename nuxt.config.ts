// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path"

const aliases = {
  components: "src/components",
  plugins: "src/plugins",
}

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    resolve(__dirname, value),
  ])
)

export default defineNuxtConfig({
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    build: {
      rollupOptions: {
        external: ["vuetify"],
      },
    },
    resolve: {
      alias: {
        ...resolvedAliases,
      },
    },
  },
})
