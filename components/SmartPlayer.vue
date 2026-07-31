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
        <a
          v-if="showVkPlaylistLink"
          :href="vkPlaylistHref"
          target="_blank"
          rel="noopener"
          class="player__vk-link"
        >
          Послушать полную версию во ВКонтакте >
        </a>
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
      <component
              :is="currentComponent"
              v-bind="currentProps"
              :player-id="playerId"
              :platform-key="currentKey"
              @widget-ok="onWidgetOk"
              @widget-error="onWidgetError"
      />

      <div v-if="!loaded" class="embed-loader first-loader" style="background-color: var(--color-rose)">
        <span class="loader" />
      </div>
    </div>

<!--    <div v-else class="no-sources">Нет доступных источников для этого трека.</div>-->
    <div v-else class="no-sources">
<!--      <div class="player__note" v-if="currentProps.title == 'Natalja Ray — Break It All' || currentProps.title == 'Natalja Ray — Для нас'">Трек отгружается на площадки и появится 14.11.2025</div>-->

      <div class="custom-track" v-if="currentProps.title == 'Natalja Ray — Каков твой план?'">
        <div class="player__note">Трек появится чуть позже</div>
        <div>
          <div class="custom-track__title">Демо:</div>
          <audio controls>
            <source src="/audio/Natalja_Ray_Kakov_tvoi_plan_demo.mp3" type="audio/mpeg">
            Ваш браузер не поддерживает элемент audio.
          </audio>
        </div>
      </div>

<!--      <div class="custom-track" v-else-if="currentProps.title == 'Natalja Ray — Break It All'">-->
<!--        <div class="player__note">Трек отгружается на площадки и появится 14.11.2025</div>-->
<!--        <div>-->
<!--          <div class="custom-track__title">Превью:</div>-->
<!--          <audio controls>-->
<!--            <source src="/audio/Natalja_Ray_Break_It_All_01_01.mp3" type="audio/mpeg">-->
<!--            Ваш браузер не поддерживает элемент audio.-->
<!--          </audio>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="custom-track" v-else-if="currentProps.title == 'Natalja Ray — Для нас'">-->
<!--        <div class="player__note">Трек отгружается на площадки и появится 14.11.2025</div>-->
<!--        <div>-->
<!--          <div class="custom-track__title">Превью:</div>-->
<!--          <audio controls>-->
<!--            <source src="/audio/Natalja_Ray_Dlya_nas_0_56.mp3" type="audio/mpeg">-->
<!--            Ваш браузер не поддерживает элемент audio.-->
<!--          </audio>-->
<!--        </div>-->
<!--      </div>-->

      <div class="player__note" v-else>Трек появится чуть позже</div>
    </div>
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
        playerId: { type: String, default: '' },
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

    const vkPlaylistHref = computed(() => {
        if (props.vk?.href) return props.vk.href
        if (props.vk?.ownerId == null || props.vk?.playlistId == null) return ''
        return `https://vk.com/music/playlist/${props.vk.ownerId}_${props.vk.playlistId}`
    })
    const showVkPlaylistLink = computed(() =>
        props.mode === 'mode-soundtracks' && currentKey.value === 'vk' && !!vkPlaylistHref.value
    )

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
