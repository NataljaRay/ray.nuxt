<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
    import riverStyle from '~/assets/fonts/RiverstyleFont.woff2'
    import ManropeExtraBold from '~/assets/fonts/Manrope-ExtraBold.woff2'
    import UbuntuMediumItalic from '~/assets/fonts/Ubuntu-MediumItalic.woff2'
    import interRegular from '~/assets/fonts/Inter28pt-Regular.woff2'
    import interBold    from '~/assets/fonts/Inter28pt-Bold.woff2'
    import interSemiBold    from '~/assets/fonts/Inter28pt-SemiBold.woff2'
    import interMedium    from '~/assets/fonts/Inter28pt-Medium.woff2'

    useHead({
        link: [
            { rel: 'preload', as: 'font', href: riverStyle, type: 'font/woff2', crossorigin: 'anonymous' },
            { rel: 'preload', as: 'font', href: ManropeExtraBold, type: 'font/woff2', crossorigin: 'anonymous' },
            { rel: 'preload', as: 'font', href: UbuntuMediumItalic, type: 'font/woff2', crossorigin: 'anonymous' },
            { rel: 'preload', as: 'font', href: interRegular, type: 'font/woff2', crossorigin: 'anonymous' },
            { rel: 'preload', as: 'font', href: interBold,    type: 'font/woff2', crossorigin: 'anonymous' },
            { rel: 'preload', as: 'font', href: interSemiBold,    type: 'font/woff2', crossorigin: 'anonymous' },
            { rel: 'preload', as: 'font', href: interMedium,    type: 'font/woff2', crossorigin: 'anonymous' },
        ]
    })

    // Например, в app.vue или в layout
    onMounted(() => {
        const header = document.querySelector('header')
        const setVar = () => {
            const h = header ? header.offsetHeight : 40
            document.documentElement.style.setProperty('--header-h', `${h}px`)
        }
        setVar()

        // Обновляем при ресайзе/изменении шапки
        const ro = new ResizeObserver(setVar)
        if (header) ro.observe(header)
        window.addEventListener('resize', setVar)
        onBeforeUnmount(() => {
            window.removeEventListener('resize', setVar)
            ro.disconnect?.()
        })
    })
</script>
<!--<script>-->
<!--    export default {-->
<!--        name: "app.vue"-->
<!--    }-->
<!--</script>-->

<style scoped>

</style>