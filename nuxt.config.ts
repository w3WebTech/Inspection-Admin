import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  head: {
    title: 'test',
    meta: [
      // Other meta tags
    ],
    link: [] // Ensure there are no favicon links here
  },
  pwa: {
    meta: {
      favicon: false // Disable favicon in PWA settings
    },
    icon: {
      source: false // Disable PWA icons if necessary
    }
  },
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss", // Tailwind CSS module
    "@primevue/nuxt-module", // PrimeVue module
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura, 
        options:{
            darkModeSelector:'light'
        }// Set the PrimeVue theme
      },
      ripple: true, // Enable ripple effect
    },
    autoImport: true, // Automatically import PrimeVue components
  },

  compatibilityDate: "2025-02-14", // Set compatibility date
});