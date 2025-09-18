<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <iframe
              :src="src"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media"
              :width="width"
              :height="height"
              style="border:none"
              loading="lazy"
              @load="onLoad"
      />
      <div v-if="!loaded" class="embed-loader">
        <span class="spinner" />
<!--        <span class="loader" />-->
        <p v-if="timedOut" class="hint">Долго грузится… проверьте VPN/CSP</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        platformKey: { type: String, default: 'ym' },
        albumId: { type: String, default: '' },
        trackId:  { type: String, default: '' },
        width:    { type: Number, default: 614 },
        height:   { type: Number, default: 244 },
    })
    const src = computed(() => {
        const { albumId, trackId } = props
        if (albumId && trackId) return `https://music.yandex.ru/iframe/album/${albumId}/track/${trackId}`
        if (!albumId && trackId) return `https://music.yandex.ru/iframe/track/${trackId}`
        if (albumId && !trackId) return `https://music.yandex.ru/iframe/album/${albumId}`
        return ''
    })
    const width  = computed(() => props.width)
    const height = computed(() => props.height)
    const wrapStyle = computed(() => `position:relative;width:${width.value}px;height:${height.value}px;`)
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

<style scoped>
  .embed-wrap{position:relative;overflow:hidden}
  .embed-loader{position:absolute;inset:0;display:flex;justify-content:center;align-items:center;background:rgba(255,255,255,1)}
  .spinner{width:28px;height:28px;border:3px solid #ccc;border-top-color:#111;border-radius:50%;animation:spin .8s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
</style>
