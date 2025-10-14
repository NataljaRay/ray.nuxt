<template>
  <ClientOnly>
    <div class="vk-video-wrap" :style="wrapStyle">
      <iframe ref="ifr"
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
    import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
    import EmbedLoader from '@/components/common/EmbedLoader.vue'
    // import { usePlayerManager } from '~/composables/usePlayerManager'

    const props = defineProps({
        ownerId: { type: [String, Number], required: true },
        videoId: { type: [String, Number], required: true },
        hash: { type: String, default: '' },
        playerId: { type: String, required: true },
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

    /** stop/play iframe **/
    // const ifr = ref(null)
    // let originalSrc = embedUrl
    //
    // const manager = usePlayerManager()
    //
    // function play() {
    //     if (!ifr.value) return
    //     // restore src if blank
    //     if (!ifr.value.src || ifr.value.src === 'about:blank') {
    //         ifr.value.src = originalSrc
    //     }
    //     // возвращаем Promise на случай, если нужно ждать чего-то
    //     return Promise.resolve()
    // }
    //
    // function stop() {
    //     if (!ifr.value) return
    //     // сбрасываем src — это останавливает плеер
    //     try {
    //         ifr.value.src = 'about:blank'
    //     } catch(e) { console.warn(e) }
    //     return Promise.resolve()
    // }
    //
    //
    // onMounted(() => {
    //     // при монтировании регистрируем контролы
    //     manager.register(props.playerId, { play, stop })
    // })
    //
    // onBeforeUnmount(() => {
    //     manager.unregister(props.playerId)
    // })
    //
    // function stopPlay() {
    //     console.log('stopPlay', props.playerId)
    //     manager.requestPlay(props.playerId)
    // }
    // const iframeRef = ref(null)
    // const manager = usePlayerManager()
    // let originalSrc = props.src
    //
    // function play() {
    //     // restore src if was cleared
    //     if (iframeRef.value && (!iframeRef.value.src || iframeRef.value.src === 'about:blank')) {
    //         iframeRef.value.src = originalSrc
    //     }
    //     // ничего возвращать не обязательно
    //     return Promise.resolve()
    // }
    //
    // function stop() {
    //     // сбросим src — это остановит воспроизведение
    //     if (iframeRef.value) {
    //         iframeRef.value.src = 'about:blank'
    //         // можно через setTimeout восстановить атрибут data-src, если нужно
    //     }
    // }
    //
    // onMounted(() => {
    //     manager.register(props.playerId, { play, stop })
    // })
    //
    // onBeforeUnmount(() => {
    //     manager.unregister(props.playerId)
    // })
</script>

<style scoped>

</style>
