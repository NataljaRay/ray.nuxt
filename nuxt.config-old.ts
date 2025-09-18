// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config-old.ts

export default defineNuxtConfig({
  // app: { baseURL: '/ray.nuxt/' },
  // runtimeConfig: {
  //   public: {
  //     siteUrl: 'https://nataljaray.github.io' // твой корневой домен
  //     // siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  //   }
  // },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/ray.nuxt/', // на реальном домене поставишь '/'
    head: {
      meta: [
        // МЕТА-CSP (работает на GH Pages и не падает)
        {
          'http-equiv': 'Content-Security-Policy',
          content: [
            // Чуть шире дефолт для dev
            "default-src 'self' blob: data:",
            // Разрешаем Я.Музыку во фрейме
            "frame-src 'self' https://music.yandex.ru https://music.yandex.net",
            // Nuxt/Vite dev требуют inline + eval для HMR
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            // Стили обычно ладно оставить с inline
            "style-src 'self' 'unsafe-inline'",
            // Картинки/шрифты
            "img-src 'self' data: blob:",
            "font-src 'self' data:",
            // HMR по ws + ваши API
            "connect-src 'self' ws:",
            // В META эта директива всё равно игнорируется — можно удалить или оставить, без разницы
            // "frame-ancestors 'self'",
            // Можно не указывать — но если хотите, токен как есть
            "upgrade-insecure-requests",
          ].join('; ')
          // content: [
          //   "default-src 'self'",
          //   "frame-src 'self' https://music.yandex.ru https://music.yandex.net",
          //   "script-src 'self'",
          //   "style-src 'self' 'unsafe-inline'",
          //   "img-src 'self' data:",
          //   "font-src 'self' data:",
          //   "connect-src 'self'",
          //   "frame-ancestors 'self'",
          //   // можно убрать, если не нужно:
          //   "upgrade-insecure-requests",
          // ].join('; ')
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
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
          additionalData: '@use "@/assets/scss/helpers/index" as *;'
          // additionalData: '@use "@/assets/scss/variables-old.scss" as *;'
          // additionalData: '@use "@/assets/scss/variables" as *;\n' +
          //     '@use "@/assets/scss/helpers/index" as *;'
        }
      }
    }
  },

  modules: ['nuxt-security'],

  nitro: {
    compatibilityDate: '2025-09-18',
  },

  security: {
    headers: {
      // Полностью отключаем CSP-заголовок, чтобы не падал плагин
      contentSecurityPolicy: false,

      xFrameOptions: 'SAMEORIGIN',
    },
    // headers: {
    //   contentSecurityPolicy: {
    //     reportOnly: process.env.NODE_ENV !== 'production',
    //       value: {
    //           // ВЕЗДЕ СТРОКИ (нигде не массивы):
    //           'default-src': "'self'",
    //           'frame-src': "'self' https://music.yandex.ru https://music.yandex.net",
    //           'script-src': "'self'",
    //           'style-src': "'self' 'unsafe-inline'",
    //           'img-src': "'self' data:",
    //           'font-src': "'self' data:",
    //           'connect-src': "'self'",
    //
    //           // временно УБЕРЁМ эти директивы, чтобы исключить баг:
    //           // 'frame-ancestors': "'self'",
    //           // 'upgrade-insecure-requests': true,
    //       },
    //     // value: {
    //     //   // только эти типы валидны: string | string[] | boolean
    //     //   'default-src': ["'self'"],
    //     //   'frame-src': [
    //     //     "'self'",
    //     //     'https://music.yandex.ru',
    //     //     'https://music.yandex.net',
    //     //     'https://www.youtube.com',
    //     //     'https://open.spotify.com',
    //     //     'https://vk.com'
    //     //   ],
    //     //   'script-src': ["'self'"],
    //     //   'style-src': ["'self'", "'unsafe-inline'"],
    //     //   'img-src': ["'self'", 'data:'],
    //     //   'font-src': ["'self'", 'data:'],
    //     //   'connect-src': ["'self'"],
    //     //
    //     //   // если используете — только массив строк
    //     //   'frame-ancestors': ["'self'"],
    //     //
    //     //   // эта директива ДОЛЖНА быть boolean, а не [] и не {}
    //     //   'upgrade-insecure-requests': true,
    //     //   // НЕ добавляйте здесь report-uri/report-to, если не планируете — лучше убрать вовсе
    //     // },
    //   },
    //
    //   // валидные значения: 'DENY' | 'SAMEORIGIN' | false
    //   xFrameOptions: 'SAMEORIGIN',
    // },
  }
})