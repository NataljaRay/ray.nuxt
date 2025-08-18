// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: '/ray.nuxt/' },
  runtimeConfig: {
    public: {
      siteUrl: 'https://nataljaray.github.io' // твой корневой домен
      // siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  // для реального хостинга
  // app: { baseURL: '/' },
  // runtimeConfig: { public: { siteUrl: 'https://nataljaray.me' } }, // подставить реальный домен

  css: ['~/assets/scss/main.scss'], // глобальные стили для всех страниц
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // переменные/миксины во всех <style lang="scss">
          additionalData: '@use "@/assets/scss/variables.scss" as *;'
          // additionalData: '@use "@/assets/scss/variables.scss" as *;\n' +
          //     '@use "@/assets/scss/helpers/index.scss" as *;'
        }
      }
    }
  }
})
