<template>
  <ClientOnly>
    <div class="embed-wrap" :style="wrapStyle">
      <div :id="elId"></div>
      <EmbedLoader :show="!settled" :hint="timedOut ? 'YouTube долго грузится…' : ''" />
    </div>
  </ClientOnly>
</template>

<script setup>
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
    import EmbedLoader from '@/components/common/EmbedLoader.vue'
    // import { usePlayerManager } from '~/composables/usePlayerManager'

    const emit = defineEmits(['widget-ok','widget-error'])
    const props = defineProps({
        platformKey: { type: String, default: 'youtube' },
        playerId: String,
        videoId: String,
        playlistId: String,
        useNoCookie: { type: Boolean, default: true },
        width:  { type: [String, Number], default: '100%' },
        height: { type: [String, Number], default: 346 }
    })
    const toCssSize = (v) => typeof v === 'number' ? `${v}px` : v

    const wrapStyle = computed(() => ({
        position: 'relative',
        width:  toCssSize(props.width),
        height: toCssSize(props.height),
        overflow: 'hidden'
    }))

    const elId = `yt_widget_${Math.random().toString(36).slice(2)}`
    let player = null
    let timeoutId

    const settled = ref(false)
    const timedOut = ref(false)

    function loadYTApi () {
        if (typeof window === 'undefined') return Promise.resolve(null)
        if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
        return new Promise((resolve) => {
            const prev = window.onYouTubeIframeAPIReady
            window.onYouTubeIframeAPIReady = () => { prev && prev(); resolve(window.YT) }
            const s = document.createElement('script')
            s.src = 'https://www.youtube.com/iframe_api'
            s.async = true
            s.referrerPolicy = 'strict-origin-when-cross-origin'
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
            width: '100%',
            height: '100%',
            host,
            playerVars: {
                rel: 0,
                modestbranding: 1,
                playsinline: 1,
                ...(props.playlistId ? { listType: 'playlist', list: props.playlistId } : {})
            },
            videoId: props.videoId || undefined,
            events: {
                onReady: () => {
                  try {
                      // const iframe = player?.getIframe?.()
                      // iframe?.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen')
                      // iframe?.setAttribute('allowfullscreen', '')

                          const iframe = player?.getIframe?.()
                          if (iframe) {
                              iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen')
                              // iframe.removeAttribute('allowfullscreen') // можно убрать, чтобы не было «will take precedence»
                          }
                          // if (iframe) {
                          //   iframe.setAttribute(
                          //         'allow',
                          //         'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
                          //       )
                          //   iframe.setAttribute('allowfullscreen', '') // boolean-атрибут
                          //   iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
                          // }
                      } catch {}
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


  /** stop/play **/
  // const manager = usePlayerManager()
  //   onMounted(() => manager.register(props.playerId, { play, stop }) )
  //   onBeforeUnmount(()=> manager.unregister(props.playerId) )
  //   function onPlayButton() {
  //       manager.requestPlay(props.playerId)
  //       // manager вызовет stop у предыдущего и затем запустит наш play()
  //   }
  // const manager = usePlayerManager()
  //   let playerStopPlay = null
  //
  //   function play() {
  //       // если используете YT.Player
  //       playerStopPlay?.playVideo?.()
  //       return Promise.resolve()
  //   }
  //   function stop() {
  //       playerStopPlay?.pauseVideo?.()
  //   }
  //
  //   onMounted(async () => {
  //       // создаём YT.Player и сохраняем в player
  //       // ...
  //       manager.register(props.playerId, { play, stop })
  //   })
  //
  //   onBeforeUnmount(() => {
  //       manager.unregister(props.playerId)
  //       try { playerStopPlay?.destroy?.() } catch {}
  //   })
  //
  //   // Когда пользователь нажал "play" в UI:
  //   function onUserPlayClick() {
  //       manager.requestPlay(props.playerId)
  //       // менеджер вызовет stop у предыдущего и затем вызовет play у текущего (наш play)
  //   }
</script>
