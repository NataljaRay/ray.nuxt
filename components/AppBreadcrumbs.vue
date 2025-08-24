<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__inner container">
      <h1 class="breadcrumbs__inner">{{ seo.description }}</h1>
      <NuxtLink to="/">< Главная</NuxtLink>
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
        seo: { type: Object, default: () => ({}) }
    })
</script>

<style scoped>

</style>