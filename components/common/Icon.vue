<template>
  <span v-html="icons[name]" class="icon"></span>
</template>


<script setup>
    import IconRecord from '@/assets/icons/record_2.svg?raw'
    import IconPiano from '@/assets/icons/piano.svg?raw'
    import IconDownload from '@/assets/icons/download.svg?raw'
    import IconLink from '@/assets/icons/socials/link.svg?raw'
    import IconTg from '@/assets/icons/socials/tg.svg?raw'
    import IconTgBig from '@/assets/icons/socials/tgBig.svg?raw'
    import IconVk from '@/assets/icons/socials/vk.svg?raw'
    import ExtLink from '@/assets/icons/ext-link.svg?raw'
    // import IconYm from '@/assets/icons/music/ym.svg?raw'
    // import IconSpotify from '@/assets/icons/music/spotify.svg?raw'
    // import IconVkMusic from '@/assets/icons/music/vk.svg?raw'
    import {computed} from "vue";
    const props = defineProps({
        name: { type: String, required: true },
    })

    const icons = {
        'vk': IconVk,
        'tg': IconTg,
        'tgBig': IconTgBig,
        'link': IconLink,
        'download': IconDownload,
        'record': IconRecord,
        'piano': IconPiano,
        'external-link': ExtLink,
        // 'ym': IconYm,
        // 'spotify': IconSpotify,
        // 'vkMusic': IconVkMusic
    }

    defineOptions({
        name: 'Icon'
    })
</script>
<style src="@/assets/scss/components/icon.scss" lang="scss"></style>