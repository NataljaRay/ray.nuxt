// middleware/layout.global.js
import { setPageLayout } from '#app'

export default defineNuxtRouteMiddleware((to) => {
    const isHome = to.path === '/'
    setPageLayout(isHome ? 'home' : 'default')
})
