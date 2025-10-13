<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <iframe
              :src="src"
              title="Плеер Spotify"
              width="100%"
              height="100%"
              frameborder="0"
              allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              loading="lazy"
              @load="onLoad"
      />

      <EmbedLoader :show="!loaded" />
    </div>
  </ClientOnly>
</template>

<script setup>
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
    import EmbedLoader from '@/components/common/EmbedLoader.vue'

    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        platformKey: { type: String, default: 'spotify' },
        trackId: String, albumId: String, playlistId: String,
        width:  { type: [String, Number], default: '100%' },
        height: { type: [String, Number], default: 232 },
    })
    const toCssSize = (v) => typeof v === 'number' ? `${v}px` : v

    const src = computed(() => {
        if (props.trackId)    return `https://open.spotify.com/embed/track/${props.trackId}`
        if (props.albumId)    return `https://open.spotify.com/embed/album/${props.albumId}`
        if (props.playlistId) return `https://open.spotify.com/embed/playlist/${props.playlistId}`
        return ''
    })

    const wrapStyle = computed(() => ({
        position: 'relative',
        width:  toCssSize(props.width),
        height: toCssSize(props.height),
        overflow: 'hidden'
    }))

    const loaded = ref(false); let t
    function onLoad(){ loaded.value = true; clearTimeout(t); emit('widget-ok', { key: props.platformKey }) }
    onMounted(()=>{ t=setTimeout(()=>{ if(!loaded.value) emit('widget-error',{ key: props.platformKey, code:'timeout' }) }, 12000) })
    onBeforeUnmount(()=>clearTimeout(t))
</script>
