<template>
  <div class="player" :class="mode ? 'player--' + mode : ''">

    <template v-if="mode != 'mode-music'">
      <div class="player__controls" v-if="currentComponent">
        <div class="player__note">Активный плеер: </div>
        <div class="player__nav">
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
            <img :src="iconUrl(key)"
                 :alt="labels[key] || 'Иконка'"
                 :title="labels[key] || ''"
                 width="48" height="48" loading="lazy" decoding="async"
            >
          </Button>
        </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="player__controls" v-if="currentComponent">
      <div v-if="mode === 'mode-music'" class="player__note">Активный плеер: </div>

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
          <img :src="iconUrl(key)"
               :alt="labels[key] || 'Иконка'"
               :title="labels[key] || ''"
               width="48" height="48" loading="lazy" decoding="async"
          >
        </Button>
      </div>
    </div>
    </template>

    <!-- Текущий виджет -->
    <div class="player__widget" v-if="currentComponent">
      <!-- Яндекс Музыка: фасад до клика -->
<!--      <div-->
<!--              v-if="currentKey === 'ym' && !ymActivated"-->
<!--              class="player-facade"-->
<!--              @click="activateYM"-->
<!--              :style="currentProps.bgColor ? `background-color: ${currentProps.bgColor}` : ''"-->
<!--      >-->
<!--        <div class="facade-overlay">-->
<!--&lt;!&ndash;          <span class="facade-text facade-text&#45;&#45;small" aria-hidden="true">&ndash;&gt;-->
<!--&lt;!&ndash;            Для максимально корректной загрузки виджета мы были вынуждены поставить эту заглушку...&ndash;&gt;-->
<!--&lt;!&ndash;            <br/>&ndash;&gt;-->
<!--&lt;!&ndash;            Благодарим за терпение <3&ndash;&gt;-->
<!--&lt;!&ndash;          </span>&ndash;&gt;-->
<!--          <span class="play-icon" aria-hidden="true">▶</span>-->
<!--          <span class="facade-text">Открыть плеер</span>-->
<!--        </div>-->
<!--      </div>-->

      <!-- Остальные платформы или ЯМ после клика -->
<!--      <component-->
<!--              v-else-->
<!--              :is="currentComponent"-->
<!--              v-bind="currentProps"-->
<!--              :platform-key="currentKey"-->
<!--              @widget-ok="onWidgetOk"-->
<!--              @widget-error="onWidgetError"-->
<!--      />-->

      <component
              :is="currentComponent"
              v-bind="currentProps"
              :platform-key="currentKey"
              @widget-ok="onWidgetOk"
              @widget-error="onWidgetError"
      />

      <div v-if="!loaded" class="embed-loader first-loader" style="background-color: var(--color-rose)">
        <span class="loader" />
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
    import VkVideoWidget     from '@/components/widgets/VkVideoWidget.vue'
    import Button from '@/components/common/Button.vue'
    import { withBase } from 'ufo'

    const iconUrl = (key) => withBase(`/icons/music/${key}.svg`, baseURL)

    const { public: { baseURL, siteUrl } } = useRuntimeConfig();

    const props = defineProps({
        ym:      { type: Object, default: null }, // { albumId?, trackId? }
        spotify: { type: Object, default: null }, // { trackId?|albumId?|playlistId? }
        ytm:     { type: Object, default: null }, // { videoId?|playlistId? }
        yt:      { type: Object, default: null }, // { videoId?|playlistId? }
        vk:      { type: Object, default: null }, // { embedSrc? | href? | ownerId?&playlistId?&hash? }
        vkVideo: { type: Object, default: null }, //
        title:   { type: String, default: '' },
        width:  { type: String, default: '100%' },
        height: { type: Number, default: 244 },
        mode: { type: String, default: '' },
    })

    /** Порядок приоритета и подписи */
    const ORDER  = ['ym', 'vk', 'vkVideo', 'youtube', 'spotify']
    // const ORDER  = ['spotify', 'youtube', 'ym', 'vk']
    const labels = { ym: 'Яндекс Музыка', vk: 'Вконтакте', vkVideo: 'Vk Video', youtube: 'YouTube', spotify: 'Spotify' }

    /** Проверяем наличие данных */
    const hasDataForYM      = v => !!(v?.albumId || v?.trackId)
    const hasDataForSpotify = v => !!(v?.trackId || v?.playlistId || v?.albumId)
    const hasDataForYT      = v => !!(v?.videoId || v?.playlistId)
    const hasDataForVK      = v => !!(v?.embedSrc || v?.href ||
        (v && v.ownerId != null && v.playlistId != null && typeof v.hash === 'string' && v.hash.length > 0))
    const hasDataForVkVideo = v => !!(v?.ownerId || v?.videoId)

    // одна кнопка YouTube для yt/ytm
    const hasYouTube = computed(() => hasDataForYT(props.yt) || hasDataForYT(props.ytm))

    const available = computed(() => ({
        ym: hasDataForYM(props.ym),
        vk: hasDataForVK(props.vk),
        youtube: hasYouTube.value,
        spotify: hasDataForSpotify(props.spotify),
        vkVideo: hasDataForVkVideo(props.vkVideo),
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
    // const initialKey = (['ym','vk','youtube','spotify']).find(k => available.value[k]) || null
    // const currentKey = ref(initialKey)

    // 2) используем ORDER для initialKey (чтобы не расходилось)
    const initialKey = ORDER.find(k => available.value[k]) || null
    const currentKey = ref(initialKey)

    // 3) флаг "пользователь кликнул открыть ЯМ"
    const ymActivated = ref(false)
    // function activateYM() { ymActivated.value = true }

    function activateYM() {
        ymActivated.value = true
        // чуть ускорим соединение
        useHead({
            link: [
                { rel: 'preconnect', href: 'https://music.yandex.ru', crossorigin: '' },
                { rel: 'preconnect', href: 'https://avatars.yandex.net', crossorigin: '' }
            ]
        })
    }

    function select(key) {
        if (!available.value[key]) return
        currentKey.value = key
        console.clear();
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
            case 'vkVideo': return VkVideoWidget
            default:        return null
        }
    })
    const currentProps = computed(() => {
        const base = { width: props.width, height: props.height, title: props.title, bgColor: props.bgColor }
        switch (currentKey.value) {
            case 'ym': return { ...base, ...props.ym }
            case 'vk': return { ...base, ...props.vk }
            case 'vkVideo': return { ...base, ...props.vkVideo }
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
    let t
    function onLoad() {
        loaded.value = true
        clearTimeout(t)
    }
    onMounted(() => {
        loaded.value = false
        t = setTimeout(() => {
                loaded.value = true
                // для автозагрузки ЯМ !!!!
                activateYM
        }, 7000)
    })
    onBeforeUnmount(() => clearTimeout(t))

    // mpbile check
    const device = useDevice()

    const isMobile = computed(() => device.value.isMobile)
    const isTablet = computed(() => device.value.isTablet)
    const isDesktop = computed(() => device.value.isDesktop)
</script>

<style scoped>


</style>
