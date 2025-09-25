// // plugins/device.server.ts
// export default defineNuxtPlugin((nuxtApp) => {
//     const device = useDevice()
//
//     // UA из входящего запроса
//     const ua =
//         nuxtApp.ssrContext?.event?.node?.req?.headers['user-agent'] ||
//         nuxtApp.ssrContext?.event?.node?.req?.headers['User-Agent'] ||
//         ''
//
//     const isMobileRe = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i
//     const isTabletRe = /iPad|Tablet|Nexus 7|Nexus 10|SM-T|Kindle|Silk/i
//
//     const isMobile = isMobileRe.test(ua)
//     const isTablet = isTabletRe.test(ua)
//     const isDesktop = !(isMobile || isTablet)
//
//     device.value = { ua, isMobile, isTablet, isDesktop }
// })
