// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
    head: {
        title: 'test',
        meta: [
          // Other meta tags
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } // Adjust the href if your favicon has a different name or format
        ]
      },
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss", // Tailwind CSS module
    "@primevue/nuxt-module", // PrimeVue module
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura, // Set the PrimeVue theme
      },
      ripple: true, // Enable ripple effect
    },
    autoImport: true, // Automatically import PrimeVue components
  },

  compatibilityDate: "2025-02-14", // Set compatibility date
});