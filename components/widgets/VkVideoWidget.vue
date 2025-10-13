<template>
  <ClientOnly>
    <div class="vk-video-wrap" :style="wrapStyle">
      <iframe
              :src="embedUrl"
              title="Плеер Вконтакте"
              width="100%"
              :height="height"
              frameborder="0"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
              allowfullscreen
              style="background-color:#000; border:0; display:block; width:100%;"
              @load="onLoad"
      ></iframe>

      <EmbedLoader :show="!loaded" :hint="timedOut ? 'VK долго грузится…' : ''" />
    </div>
  </ClientOnly>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import EmbedLoader from '@/components/common/EmbedLoader.vue'

    const props = defineProps({
        ownerId: { type: [String, Number], required: true },
        videoId: { type: [String, Number], required: true },
        hash: { type: String, default: '' },
        width: { type: [Number, String], default: '100%' },
        height: { type: [Number, String], default: 480 },
        hd: { type: [Number, String], default: 2 },
    })

    const loaded = ref(false)
    const timedOut = ref(false)

    const embedUrl = computed(() => {
        let base = `https://vk.com/video_ext.php?oid=${props.ownerId}&id=${props.videoId}`
        if (props.hash) base += `&hash=${props.hash}`
        if (props.hd) base += `&hd=${props.hd}`
        return base
    })

    const wrapStyle = computed(() => ({
        position: 'relative',
        width: typeof props.width === 'number' ? props.width + 'px' : props.width,
        height: typeof props.height === 'number' ? props.height + 'px' : props.height,
        overflow: 'hidden',
        background: '#000',
    }))

    function onLoad() {
        loaded.value = true
    }
</script>

<style scoped>

</style>
