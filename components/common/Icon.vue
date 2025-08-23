<template>
  <span v-html="icons[name]" class="icon"></span>
</template>


<script setup>
    import IconLink from '@/assets/icons/link.svg?raw'
    import IconTg from '@/assets/icons/tg.svg?raw'
    import IconVk from '@/assets/icons/vk.svg?raw'
    import {computed} from "vue";
    const props = defineProps({
        name: { type: String, required: true },
    })

    const icons = {
        'vk': IconVk,
        'tg': IconTg,
        'link': IconLink,
    }

    defineOptions({
        name: 'Icon'
    })
</script>
<style src="@/assets/scss/components/icon.scss" lang="scss"></style>