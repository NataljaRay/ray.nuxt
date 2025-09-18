<template>
  <div class="player">
    <!-- Кнопки плееров (YT и YT Music = одна кнопка) -->
    <div class="player__controls" v-if="currentComponent">

      <div v-for="key in ORDER"
           :key="key"
           :id="key"
           class="btn"
           :class="[
          { active: currentKey === key },
          available[key] ? 'ok' : 'off',
          errors[key] ? 'err' : ''
        ]"
           :disabled="!available[key]"
           :title="btnTitle(key)"
           @click="select(key)"
      >
        <Button class="button--music button--image">
          <img :src="`/icons/music/${key}.svg`"
               :alt="labels[key] || 'Иконка'"
               :title="labels[key] || ''">
        </Button>
      </div>
<!--      <button-->
<!--              v-for="key in ORDER"-->
<!--              :key="key"-->
<!--              class="btn"-->
<!--              :class="[-->
<!--          { active: currentKey === key },-->
<!--          available[key] ? 'ok' : 'off',-->
<!--          errors[key] ? 'err' : ''-->
<!--        ]"-->
<!--              :disabled="!available[key]"-->
<!--              :title="btnTitle(key)"-->
<!--              @click="select(key)"-->
<!--      >-->
<!--        {{ labels[key] }}-->
<!--      </button>-->
    </div>

    <!-- Текущий виджет -->
    <div class="player__widget" v-if="currentComponent">
      <component
            v-if="currentComponent"
            :is="currentComponent"
            v-bind="currentProps"
            :platform-key="currentKey"
            @widget-ok="onWidgetOk"
            @widget-error="onWidgetError"
    />

      <div v-if="!loaded" class="embed-loader first-loader" style="background-color: var(--color-rose)">
        <span class="loader" />
<!--        <p v-if="timedOut" class="hint">Долго грузится… проверьте VPN/CSP</p>-->
      </div>
    </div>

    <div v-else class="no-sources">Нет доступных источников для этого трека.</div>
  </div>
</template>

<script setup>
    import {ref, computed, reactive, onMounted, onBeforeUnmount} from 'vue'
    import YandexMusicWidget from '@/components/widgets/YandexMusicWidget.vue'
    import SpotifyWidget     from '@/components/widgets/SpotifyWidget.vue'
    import YouTubeWidget     from '@/components/widgets/YouTubeWidget.vue'
    import VkWidget          from '@/components/widgets/VkWidget.vue'
    import Button from '@/components/common/Button.vue'

    const props = defineProps({
        ym:      { type: Object, default: null }, // { albumId?, trackId? }
        spotify: { type: Object, default: null }, // { trackId?|albumId?|playlistId? }
        ytm:     { type: Object, default: null }, // { videoId?|playlistId? }
        yt:      { type: Object, default: null }, // { videoId?|playlistId? }
        vk:      { type: Object, default: null }, // { embedSrc? | href? | ownerId?&playlistId?&hash? }

        width:  { type: Number, default: 614 },
        height: { type: Number, default: 244 },
    })

    /** Порядок приоритета и подписи */
    const ORDER  = ['ym', 'vk', 'youtube', 'spotify']
    const labels = { ym: 'Яндекс Музыка', vk: 'Вконтакте', youtube: 'YouTube', spotify: 'Spotify' }

    /** Проверяем наличие данных */
    const hasDataForYM      = v => !!(v?.albumId || v?.trackId)
    const hasDataForSpotify = v => !!(v?.trackId || v?.playlistId || v?.albumId)
    const hasDataForYT      = v => !!(v?.videoId || v?.playlistId)
    const hasDataForVK      = v => !!(v?.embedSrc || v?.href ||
        (v && v.ownerId != null && v.playlistId != null && typeof v.hash === 'string' && v.hash.length > 0))

    // одна кнопка YouTube для yt/ytm
    const hasYouTube = computed(() => hasDataForYT(props.yt) || hasDataForYT(props.ytm))

    const available = computed(() => ({
        ym: hasDataForYM(props.ym),
        vk: hasDataForVK(props.vk),
        youtube: hasYouTube.value,
        spotify: hasDataForSpotify(props.spotify),
    }))

    /** Ошибки по платформам */
    const errors = reactive({ ym: false, vk: false, youtube: false, spotify: false })
    function onWidgetOk(payload) {
        const key = typeof payload === 'string' ? payload : payload?.key
        if (key && key in errors) errors[key] = false
    }
    function onWidgetError(payload) {
        const key = typeof payload === 'string' ? payload : payload?.key
        if (key && key in errors) errors[key] = true
    }

    /** По умолчанию: ЯМ → VK → YouTube → Spotify */
    const initialKey = (['ym','vk','youtube','spotify']).find(k => available.value[k]) || null
    const currentKey = ref(initialKey)

    function select(key) {
        if (!available.value[key]) return
        currentKey.value = key
    }

    function btnTitle(key) {
        if (!available.value[key]) return 'Нет ссылки для этого трека'
        if (errors[key]) return 'Виджет сообщил об ошибке (нажмите для повторной попытки)'
        return ''
    }

    /** Какой компонент и какие пропсы рисовать */
    const currentComponent = computed(() => {
        switch (currentKey.value) {
            case 'ym':      return YandexMusicWidget
            case 'vk':      return VkWidget
            case 'youtube': return YouTubeWidget
            case 'spotify': return SpotifyWidget
            default:        return null
        }
    })
    const currentProps = computed(() => {
        const base = { width: props.width, height: props.height }
        switch (currentKey.value) {
            case 'ym': return { ...base, ...props.ym }
            case 'vk': return { ...base, ...props.vk }
            case 'youtube': {
                const ytInput = hasDataForYT(props.yt) ? props.yt : (hasDataForYT(props.ytm) ? props.ytm : null)
                return { ...base, ...(ytInput || {}) }
            }
            case 'spotify': return { ...base, ...props.spotify }
            default: return base
        }
    })

  //loader

    const loaded = ref(false)
    // const timedOut = ref(false)
    let t
    function onLoad() {
        loaded.value = true
        clearTimeout(t)
        emit('widget-ok', { key: props.platformKey })
    }
    onMounted(() => {
        loaded.value = false
        // timedOut.value = false
        t = setTimeout(() => {
            // if (!loaded.value) {
                loaded.value = true
                // timedOut.value = true
                // emit('widget-error', { key: props.platformKey, code: 'timeout' })
            // }
        }, 7000)
    })
    onBeforeUnmount(() => clearTimeout(t))
</script>

<style scoped>
  /*.player-controls{margin-bottom:.6rem;display:flex;flex-wrap:wrap;gap:.5rem}*/
  /*.btn{padding:.35rem .6rem;border:1px solid #cfcfcf;border-radius:8px;background:#fff;cursor:pointer}*/
  /*.btn.ok:hover{border-color:#333}*/
  /*.btn.off{opacity:.5;cursor:not-allowed}*/
  /*.btn.active{border-color:#333}*/
  /*.btn.err{border-color:#d22; color:#d22}*/
  /*.no-sources{opacity:.7}*/
</style>
