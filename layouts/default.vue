<template>
  <div class="app-wrapper">
    <AppHeader/>
    <AppBreadcrumbs :seo="route.meta?.seo"/>
    <main id="main" class="content"><slot /></main>
    <AppFooter/>
  </div>
</template>

<script setup>
    import { computed } from 'vue'
    import AppHeader from '~/components/AppHeader.vue'
    import AppFooter from '~/components/AppFooter.vue'
    import AppBreadcrumbs from "../components/AppBreadcrumbs.vue";

    const route = useRoute()
    const { public: { siteUrl } } = useRuntimeConfig()
    const base = import.meta.env.BASE_URL || '/'

    const seo = computed(() => {
        const m = (route.meta && route.meta.seo) || {}
        const title = m.title || 'Natalja Ray'
        const description = m.description || 'Natalja Ray. Слово. Музыка. Свет. Тень. Наталья Рэй'
        const img = m.image || '/NataljaRay.jpg'
        const absImg = img.startsWith('http')
            ? img
            : new URL(base + img.replace(/^\//, ''), siteUrl || 'http://localhost').toString()
        return { title, description, image: absImg, noindex: !!m.noindex }
    })

    useSeoMeta({
        title: () => seo.value.title,
        description: () => seo.value.description,
        ogTitle: () => seo.value.title,
        ogDescription: () => seo.value.description,
        ogType: 'website',
        ogImage: () => seo.value.image,
        twitterCard: 'summary_large_image',
        twitterImage: () => seo.value.image,
        robots: () => (seo.value.noindex ? 'noindex, nofollow' : 'index, follow')
    })

    // canonical через функцию (это важно для реактивности)
    useHead(() => ({
        link: [{
            rel: 'canonical',
            href: new URL(base.replace(/\/$/, '') + route.path, siteUrl || 'http://localhost').toString()
        }]
    }))

</script>
<style scoped>

</style>
