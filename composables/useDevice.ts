// // composables/useDevice.ts
// export type DeviceInfo = {
//     ua: string
//     isMobile: boolean
//     isTablet: boolean
//     isDesktop: boolean
// }
//
// export const useDevice = () => {
//     // useState сохраняет значение между SSR и клиентом
//     return useState<DeviceInfo>('device', () => ({
//         ua: '',
//         isMobile: false,
//         isTablet: false,
//         isDesktop: true,
//     }))
// }
