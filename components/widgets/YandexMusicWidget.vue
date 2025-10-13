<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <iframe
              :title="title || 'Плеер Яндекс Музыки'"
              :src="src"
              width="100%"
              height="100%"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media"
              style="border:none"
              referrerpolicy="strict-origin-when-cross-origin"
              loading="lazy"
              @load="onLoad"
      />
      <EmbedLoader :show="!loaded" :hint="timedOut ? 'Долго грузится… проверьте VPN/CSP' : ''" />
    </div>
  </ClientOnly>
</template>

<script setup>
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
    import EmbedLoader from '@/components/common/EmbedLoader.vue'

    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        title: { type: String, default: '' },
        platformKey: { type: String, default: 'ym' },
        albumId: { type: String, default: '' },
        trackId:  { type: String, default: '' },
        width:    { type: [String, Number], default: '100%' },
        height:   { type: [String, Number], default: 244 },
    })
    const toCssSize = (v) => typeof v === 'number' ? `${v}px` : v

    const src = computed(() => {
        const { albumId, trackId } = props
        if (albumId && trackId) return `https://music.yandex.ru/iframe/album/${albumId}/track/${trackId}`
        if (!albumId && trackId) return `https://music.yandex.ru/iframe/track/${trackId}`
        if (albumId && !trackId) return `https://music.yandex.ru/iframe/album/${albumId}`
        return ''
    })
    const wrapStyle = computed(() => ({
        position: 'relative',
        width:  toCssSize(props.width),
        height: toCssSize(props.height),
        overflow: 'hidden'
    }))
    const loaded = ref(false)
    const timedOut = ref(false)
    let t
    function onLoad() {
        loaded.value = true
        clearTimeout(t)
        emit('widget-ok', { key: props.platformKey })
    }
    onMounted(() => {
        loaded.value = false
        timedOut.value = false
        t = setTimeout(() => {
            if (!loaded.value) {
                timedOut.value = true
                emit('widget-error', { key: props.platformKey, code: 'timeout' })
            }
        }, 12000)
    })
    onBeforeUnmount(() => clearTimeout(t))
</script>
