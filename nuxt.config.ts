// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

const isProd = process.env.NODE_ENV === 'production'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
    app: {
        // на реальном домене можно будет поставить '/'
        baseURL,
        head: {
            htmlAttrs: { lang: 'ru' },
            meta: [
                {
                    'http-equiv': 'Content-Security-Policy',
                    content: [
                        "default-src 'self' blob: data:",
                        "frame-src 'self' https://music.yandex.ru https://music.yandex.net https://open.spotify.com https://www.youtube.com https://www.youtube-nocookie.com https://vk.com https://*.vk.com https://bandcamp.com https://*.bandcamp.com https://w.soundcloud.com https://soundcloud.com https://*.soundcloud.com",
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vk.com https://static.vk.com https://www.youtube.com",
                        "style-src 'self' 'unsafe-inline'",
                        "img-src 'self' data: blob: https://vk.com https://*.vk.com https://avatars.yandex.net https://i.ytimg.com https://i.scdn.co https://i1.sndcdn.com https://i.sndcdn.com https://a-v2.sndcdn.com",
                        "font-src 'self' data:",
                        "connect-src 'self' ws: https://vk.com https://api.vk.com https://bandcamp.com https://*.bandcamp.com https://w.soundcloud.com https://soundcloud.com https://*.soundcloud.com",
                        isProd ? "upgrade-insecure-requests" : null,        // ← только в проде
                    ].filter(Boolean).join('; ')
                }
            ],
            // Фавиконки/иконки: пути учитывают baseURL
            link: [
                { rel: 'icon', type: 'image/x-icon',      href: `${baseURL}favicon.ico` },
                // { rel: 'icon', type: 'image/svg+xml',     href: `${baseURL}icon.svg` },              // опционально
                { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseURL}apple-touch-icon.png` }, // опционально
                { rel: 'manifest',                        href: `${baseURL}site.webmanifest` },      // опционально
            ],
        }
    },

    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            baseURL,
        }
    },

    css: ['~/assets/scss/main.scss'],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/helpers/index" as *;'
                }
            }
        }
    },

    modules: ['nuxt-security'],

    nitro: {
        compatibilityDate: '2025-10-13',
        prerender: {
            failOnError: false,
            ignore: ['**/_nuxt/**'],
        },
    },

    routeRules: {
        '/**': { prerender: true }
    },

    // Серверный CSP от nuxt-security временно выключен (чтобы не ловить sources.filter)
    security: {
        headers: {
            contentSecurityPolicy: false,
            xFrameOptions: 'SAMEORIGIN',
            permissionsPolicy: {
                // ✅ варианты:
                // 1) разрешить всем: fullscreen: ['*']
                // 2) разрешить себе и YouTube:
                fullscreen: ['self', '"https://www.youtube-nocookie.com"', '"https://www.youtube.com"'],
            },
        },
    }
})
