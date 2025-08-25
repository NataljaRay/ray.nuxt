<template>
  <span v-html="icons[name]" class="icon"></span>
</template>


<script setup>
    import IconRecord from '@/assets/icons/record_2.svg?raw'
    import IconPiano from '@/assets/icons/piano.svg?raw'
    import IconDownload from '@/assets/icons/download.svg?raw'
    import IconLink from '@/assets/icons/socials/link.svg?raw'
    import IconTg from '@/assets/icons/socials/tg.svg?raw'
    import IconVk from '@/assets/icons/socials/vk.svg?raw'
    import {computed} from "vue";
    const props = defineProps({
        name: { type: String, required: true },
    })

    const icons = {
        'vk': IconVk,
        'tg': IconTg,
        'link': IconLink,
        'download': IconDownload,
        'record': IconRecord,
        'piano': IconPiano,
    }

    defineOptions({
        name: 'Icon'
    })
</script>
<style src="@/assets/scss/components/icon.scss" lang="scss"></style>