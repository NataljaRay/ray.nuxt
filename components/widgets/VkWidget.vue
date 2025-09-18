<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <div :id="elId" class="vk-playlist-widget" />
      <div v-if="!loaded" class="embed-loader">
        <span class="spinner" />
        <p v-if="timedOut" class="hint">VK долго грузится…</p>
      </div>
    </div>
    <p v-if="showFallback" class="vk-fallback">
      Не удалось загрузить виджет VK. Откройте плейлист:
      <a :href="fallbackHref" target="_blank" rel="noopener">{{ fallbackHref }}</a>
    </p>
  </ClientOnly>
</template>

<script setup>
    import { computed, onMounted, watch, ref, onBeforeUnmount } from 'vue'
    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        platformKey: { type: String, default: 'vk' },
        ownerId: { type: [Number, String], required: true },
        playlistId: { type: [Number, String], required: true },
        hash: { type: String, required: true },
        elementId: { type: String, default: '' },
        width:  { type: [Number, String], default: 614 },
        height: { type: [Number, String], default: 420 },
        vkOptions: { type: Object, default: () => ({}) }
    })

    const loaded = ref(false)
    const timedOut = ref(false)
    let to, mo
    const wrapStyle = computed(() => {
        const w = typeof props.width === 'number' ? `${props.width}px` : props.width
        const h = typeof props.height === 'number' ? `${props.height}px` : props.height
        return `position:relative;width:${w};height:${h};`
    })

    const showFallback = ref(false)
    const fallbackHref = computed(() => `https://m.vk.com/music/playlist/${props.ownerId}_${props.playlistId}`)
    const elId = computed(() => props.elementId || `vk_playlist_${props.ownerId}_${props.playlistId}`)

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
        const onOk = () => {
            loaded.value = true; clearTimeout(to); emit('widget-ok', { key: props.platformKey })
        }
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
</script>

<style scoped>
  .embed-wrap{position:relative;overflow:hidden}
  .embed-loader{
    position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;
    background:rgba(255,255,255,.9)
  }
  .spinner{width:28px;height:28px;border:3px solid #ccc;border-top-color:#111;border-radius:50%;animation:spin .8s linear infinite}
  .hint{margin-top:8px;font-size:.85rem;opacity:.75}
  .vk-fallback{margin-top:.5rem;font-size:.9rem;opacity:.85}
  @keyframes spin{to{transform:rotate(360deg)}}
</style>
