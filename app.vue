<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
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