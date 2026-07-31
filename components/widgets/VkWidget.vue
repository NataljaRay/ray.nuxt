<template>
  <ClientOnly>
    <div class="embed-wrap vk-widget" :style="wrapStyle">
      <div :id="elId" class="vk-playlist-widget" />
      <EmbedLoader :show="!loaded" :hint="timedOut ? 'VK долго грузится…' : ''" />
    </div>
    <p v-if="showFallback" class="vk-fallback">
      Не удалось загрузить виджет VK. Откройте плейлист:
      <a :href="playlistHref" target="_blank" rel="noopener">{{ playlistHref }}</a>
    </p>
  </ClientOnly>
</template>
<script setup>
    import { computed, onMounted, watch, ref, onBeforeUnmount } from 'vue'
    import EmbedLoader from '@/components/common/EmbedLoader.vue'
    // import { usePlayerManager } from '~/composables/usePlayerManager'

    const emit = defineEmits(['widget-ok','widget-error'])
    const width = 614
    const props = defineProps({
        platformKey: { type: String, default: 'vk' },
        playerId: String,
        ownerId: { type: [Number, String], required: true },
        playlistId: { type: [Number, String], required: true },
        hash: { type: String, required: true },
        elementId: { type: String, default: '' },
        // width:  { type: [Number, String], default: '100%' },  // ← вернули
        height: { type: [Number, String], default: 420 },
        vkOptions: { type: Object, default: () => ({}) }
    })
    const toCssSize = (v) => typeof v === 'number' ? `${v}px` : v

    const loaded = ref(false)
    const timedOut = ref(false)
    let to, mo

    const wrapStyle = computed(() => ({
        position: 'relative',
        width:  toCssSize(props.width),
        height: toCssSize(props.height),
        overflow: 'hidden'
    }))

    const showFallback = ref(false)
    // const fallbackHref = computed(() => `https://m.vk.com/music/playlist/${props.ownerId}_${props.playlistId}`)
    const elId = computed(() => props.elementId || `vk_playlist_${props.ownerId}_${props.playlistId}`)

    const playlistHref = computed(() =>
        `https://vk.com/music/playlist/${props.ownerId}_${props.playlistId}`
    )

    // const mobilePlaylistHref = computed(() =>
    //     `https://m.vk.com/music/playlist/${props.ownerId}_${props.playlistId}`
    // )

    let vkScriptPromise
    function loadVkOpenApi () {
        if (typeof window === 'undefined') return Promise.resolve(null)
        if (window.VK?.Widgets?.Playlist) return Promise.resolve(window.VK)
        if (!vkScriptPromise) {
            vkScriptPromise = new Promise((resolve, reject) => {
                const s = document.createElement('script')
                s.src = 'https://vk.com/js/api/openapi.js?173'
                s.async = true
                s.onload = () => window.VK ? resolve(window.VK) : reject(new Error('VK OpenAPI not available'))
                s.onerror = () => reject(new Error('Failed to load VK OpenAPI'))
                document.head.appendChild(s)
            })
        }
        return vkScriptPromise
    }

    function observeIframeAndLoadFlag() {
        const root = document.getElementById(elId.value)
        if (!root) return
        const existing = root.querySelector('iframe')
        const onOk = () => { loaded.value = true; clearTimeout(to); emit('widget-ok', { key: props.platformKey }) }
        if (existing) { existing.addEventListener('load', onOk, { once: true }); return }
        mo = new MutationObserver(() => {
            const ifr = root.querySelector('iframe')
            if (ifr) {
                ifr.addEventListener('load', onOk, { once: true })
                mo.disconnect()
            }
        })
        mo.observe(root, { childList: true, subtree: true })
    }

    async function renderPlaylist () {
        loaded.value = false
        timedOut.value = false
        showFallback.value = false
        clearTimeout(to)

        try {
            const VK = await loadVkOpenApi()
            const el = document.getElementById(elId.value)
            if (el) el.innerHTML = ''

            const options = { ...props.vkOptions }
            // ширину VK ждёт строкой без 'px'
            if (props.width) options.width = typeof props.width === 'number' ? `${props.width}` : String(props.width)

            to = setTimeout(() => {
                if (!loaded.value) {
                    timedOut.value = true
                    emit('widget-error', { key: props.platformKey, code: 'timeout' })
                }
            }, 15000)

            observeIframeAndLoadFlag()
            VK.Widgets.Playlist(elId.value, Number(props.ownerId), Number(props.playlistId), props.hash, options)
        } catch (e) {
            showFallback.value = true
            clearTimeout(to)
            emit('widget-error', { key: props.platformKey, code: 'init-failed' })
        }
    }

    onMounted(renderPlaylist)
    watch(() => [props.ownerId, props.playlistId, props.hash, props.width, props.height, props.vkOptions],
        () => renderPlaylist(), { deep: true })
    onBeforeUnmount(() => { clearTimeout(to); mo?.disconnect?.() })

    /** stop/play iframe **/
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


