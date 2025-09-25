<template>
  <Button class="button--music button--music-sm button--image button--no-filter"
          v-for="item in streamings" :key="item.id"
          target="_blank"
          :href="item.link"
  >
    <img :src="iconUrl(item.id)"
         :alt="item.fullName || 'Иконка'"
         :title="item.fullName || ''"
         width="40" height="40" loading="lazy" decoding="async"
    >
    <span class="sr-only">Слушать на {{item.fullName}}</span>
  </Button>
</template>

<script setup>
    import Button from '@/components/common/Button.vue'
    import {withBase} from "ufo";

    const iconUrl = (key) => withBase(`/icons/music/${key}.svg`, baseURL)

    const { public: { baseURL, siteUrl } } = useRuntimeConfig();

    const props = defineProps({
        streamings:      { type: Object, default: null },
    })
</script>

<style scoped>

</style>