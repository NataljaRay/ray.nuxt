<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <!-- сюда API вставит iframe -->
      <div :id="elId"></div>

      <div v-if="!settled" class="embed-loader">
        <span class="spinner" />
        <p v-if="timedOut" class="hint">YouTube долго грузится…</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        platformKey: { type: String, default: 'youtube' },
        videoId: String,
        playlistId: String,
        useNoCookie: { type: Boolean, default: true },
        width:  { type: String, default: '614' },
        height: { type: Number, default: 346 }
    })

    const width  = computed(() => props.width)
    const height = computed(() => props.height)
    const wrapStyle = computed(() => `position:relative;width:${width.value}px;height:${height.value}px;`)

    const elId = `yt_widget_${Math.random().toString(36).slice(2)}`
    let player = null
    let timeoutId

    const settled = ref(false) // ok или err — что-то произошло
    const timedOut = ref(false)

    function loadYTApi() {
        if (typeof window === 'undefined') return Promise.resolve(null)
        if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
        return new Promise((resolve) => {
            const prev = window.onYouTubeIframeAPIReady
            window.onYouTubeIframeAPIReady = () => {
                prev && prev()
                resolve(window.YT)
            }
            const s = document.createElement('script')
            s.src = 'https://www.youtube.com/iframe_api'
            s.async = true
            document.head.appendChild(s)
        })
    }

    onMounted(async () => {
        settled.value = false
        timedOut.value = false
        timeoutId = setTimeout(() => {
            if (!settled.value) {
                timedOut.value = true
                emit('widget-error', { key: props.platformKey, code: 'timeout' })
            }
        }, 15000)

        const YT = await loadYTApi()
        if (!YT) return

        const host = props.useNoCookie ? 'https://www.youtube-nocookie.com' : undefined

        player = new YT.Player(elId, {
            width: String(width.value),
            height: String(height.value),
            host,
            playerVars: {
                rel: 0,
                modestbranding: 1,
                playsinline: 1,
                // playlist:
                ...(props.playlistId ? { listType: 'playlist', list: props.playlistId } : {})
            },
            videoId: props.videoId || undefined,
            events: {
                onReady: () => {
                    if (!settled.value) {
                        settled.value = true
                        clearTimeout(timeoutId)
                        emit('widget-ok', { key: props.platformKey })
                    }
                },
                onError: (e) => {
                    if (!settled.value) {
                        settled.value = true
                        clearTimeout(timeoutId)
                        // e.data: 2,5,100,101,150 — видео недоступно и т.д.
                    }
                    emit('widget-error', { key: props.platformKey, code: `yt:${e?.data ?? 'unknown'}` })
                }
            }
        })
    })

    onBeforeUnmount(() => {
        clearTimeout(timeoutId)
        try { player?.destroy?.() } catch {}
    })
</script>

<style scoped>
  .embed-wrap{position:relative;overflow:hidden}
  .embed-loader{
    position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;
    background:rgba(255,255,255,1)
  }
  .spinner{width:28px;height:28px;border:3px solid #ccc;border-top-color:#111;border-radius:50%;animation:spin .8s linear infinite}
  .hint{margin-top:8px;font-size:.85rem;opacity:.75}
  @keyframes spin{to{transform:rotate(360deg)}}
</style>
