// // plugins/device.client.ts
// export default defineNuxtPlugin(() => {
//     const device = useDevice()
//     const ua = navigator.userAgent || ''
//
//     // базовые regexp как на сервере
//     const isMobileRe = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i
//     const isTabletRe = /iPad|Tablet|Nexus 7|Nexus 10|SM-T|Kindle|Silk/i
//
//     let isMobile = isMobileRe.test(ua)
//     let isTablet = isTabletRe.test(ua)
//
//     // iPadOS 13+: "Macintosh" + touch → считаем планшетом
//     const isIpadOS13Plus = /\bMacintosh\b/.test(ua) && 'ontouchend' in document
//     if (isIpadOS13Plus) {
//         isTablet = true
//         isMobile = false
//     }
//
//     const isDesktop = !(isMobile || isTablet)
//     device.value = { ua, isMobile, isTablet, isDesktop }
// })
