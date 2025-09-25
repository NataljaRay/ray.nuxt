// composables/useDevice.js
export const useDevice = () => {
    return useState('device', () => ({
        ua: '',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    }))
}
