<template>
  <div>
    <a class="skip-link" href="#main">Пропустить к содержимому/ ЯКОРЬ?</a>
    <AppHeader/>
    <main id="main"><slot /></main>
    <footer class="site-footer">© {{ year }}</footer>
  </div>
</template>

<!--<script>-->
<!--    import AppHeader from '@/components/AppHeader.vue'-->
<!--    export default { components: { AppHeader } }-->
<!--</script>-->
<script setup>
    import { computed } from 'vue'
    import AppHeader from '~/components/AppHeader.vue'

    const year = useState('year', () => new Date().getFullYear());

    const route = useRoute()
    const { public: { siteUrl } } = useRuntimeConfig()
    const base = import.meta.env.BASE_URL || '/'

    const seo = computed(() => {
        const m = (route.meta && route.meta.seo) || {}
        const title = m.title || 'Natalja Ray'
        const description = m.description || 'Личный сайт Natalja Ray'
        const img = m.image || '/og.jpg'
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
  .skip-link{position:absolute;left:-9999px;top:-9999px}
  .skip-link:focus{left:16px;top:16px;background:#fff;padding:6px 10px;border:1px solid #000}
</style>
