// plugins/device.server.js
export default defineNuxtPlugin((nuxtApp) => {
    const device = useDevice()

    const headers =
        nuxtApp.ssrContext?.event?.node?.req?.headers ||
        nuxtApp.ssrContext?.event?.node?.req?.headers ||
        {}
    const ua = headers['user-agent'] || headers['User-Agent'] || ''

    const isMobileRe = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i
    const isTabletRe = /iPad|Tablet|Nexus 7|Nexus 10|SM-T|Kindle|Silk/i

    const isMobile = isMobileRe.test(ua)
    const isTablet = isTabletRe.test(ua)
    const isDesktop = !(isMobile || isTablet)

    device.value = { ua, isMobile, isTablet, isDesktop }
})
