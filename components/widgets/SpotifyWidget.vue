<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <iframe
              :src="src" :width="width" :height="height"
              frameborder="0" allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
              style="border:none" loading="lazy" @load="onLoad"
      />
      <div v-if="!loaded" class="embed-loader"><span class="spinner"/></div>
    </div>
  </ClientOnly>
</template>

<script setup>
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        platformKey: { type: String, default: 'spotify' },
        trackId: String, albumId: String, playlistId: String,
        width: { type: String, default: '614' },
        height:{ type: Number, default: 232 },
    })
    const src = computed(() => {
        if (props.trackId)    return `https://open.spotify.com/embed/track/${props.trackId}`
        if (props.albumId)    return `https://open.spotify.com/embed/album/${props.albumId}`
        if (props.playlistId) return `https://open.spotify.com/embed/playlist/${props.playlistId}`
        return ''
    })
    const width  = computed(() => props.width)
    const height = computed(() => props.height)
    const wrapStyle = computed(() => `position:relative;width:${width.value}px;height:${height.value}px;`)
    const loaded = ref(false); let t
    function onLoad(){ loaded.value = true; clearTimeout(t); emit('widget-ok', { key: props.platformKey }) }
    onMounted(()=>{ t=setTimeout(()=>{ if(!loaded.value) emit('widget-error',{ key: props.platformKey, code:'timeout' }) }, 12000) })
    onBeforeUnmount(()=>clearTimeout(t))
</script>

<style scoped>
  .embed-wrap{position:relative;overflow:hidden}
  .embed-loader{position:absolute;inset:0;display:flex;justify-content:center;align-items:center;background:rgba(255,255,255,1)}
  .spinner{width:28px;height:28px;border:3px solid #ccc;border-top-color:#111;border-radius:50%;animation:spin .8s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
</style>
