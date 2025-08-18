// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: '/ray.nuxt/' },
  css: ['~/assets/scss/main.scss'], // глобальные стили для всех страниц
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // переменные/миксины во всех <style lang="scss">
          additionalData: '@use "@/assets/scss/variables.scss" as *;\n' +
              '@use "@/assets/scss/helpers/index.scss" as *;'
        }
      }
    }
  }
})
