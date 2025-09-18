<template>
  <div>
    <component v-if="componentName" :is="componentName" v-bind="componentProps" />

    <div class="player-controls" v-if="availableButtons.length">
      <span class="hint" v-if="geoHint">
        {{ geoHint }}
      </span>
      <template v-for="btn in availableButtons" :key="btn.key">
        <button
                class="btn"
                :class="{ active: currentKey === btn.key }"
                @click="override(btn.key)"
        >
          {{ btn.label }}
        </button>
      </template>
      <button class="btn ghost" v-if="overridePlayer" @click="override(null)">Авто</button>
    </div>
  </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { detectCountry } from '@/composables/useCountry'
    import { regionalOrder, YM_COUNTRIES } from '@/utils/players'

    import YandexMusicWidget from '@/components/widgets/YandexMusicWidget.vue'
    import SpotifyWidget     from '@/components/widgets/SpotifyWidget.vue'
    import YouTubeWidget     from '@/components/widgets/YouTubeWidget.vue'
    import VkWidget          from '@/components/widgets/VkWidget.vue'

    const props = defineProps({
        // данные для каждого плеера передаём объектом (если недоступно — null/undefined)
        ym:      { type: Object, default: null }, // { albumId?, trackId? }
        spotify: { type: Object, default: null }, // { trackId?|albumId?|playlistId? }
        yt:      { type: Object, default: null }, // { videoId?|playlistId? }
        ytm:     { type: Object, default: null }, // { videoId?|playlistId? } — YouTube Music
        vk:      { type: Object, default: null }, // { embedSrc? | href? } видео или ссылка на VK Музыку

        width:  { type: Number, default: 614 },
        height: { type: Number, default: 244 },
    })

    const country = ref(null)
    const overridePlayer = ref(localStorage.getItem('player.override') || null)

    onMounted(async () => { country.value = await detectCountry() })

    function override(val) {
        overridePlayer.value = val
        if (val === null) localStorage.removeItem('player.override')
        else localStorage.setItem('player.override', val)
    }

    const available = computed(() => {
        const map = new Map()
        if (props.ym)      map.set('ym',      { key: 'ym',      label: 'Яндекс'  })
        if (props.spotify) map.set('spotify', { key: 'spotify', label: 'Spotify' })
        if (props.ytm)     map.set('ytm',     { key: 'ytm',     label: 'YT Music' })
        if (props.yt)      map.set('yt',      { key: 'yt',      label: 'YouTube' })
        if (props.vk)      map.set('vk',      { key: 'vk',      label: 'VK' })
        return map
    })

    const order = computed(() => regionalOrder(country.value?.code))
    const autoKey = computed(() => order.value.find(k => available.value.has(k)))
    const currentKey = computed(() => overridePlayer.value || autoKey.value || [...available.value.keys()][0] || null)

    const componentName = computed(() => {
        switch (currentKey.value) {
            case 'ym':      return YandexMusicWidget
            case 'spotify': return SpotifyWidget
            case 'ytm':     return YouTubeWidget
            case 'yt':      return YouTubeWidget
            case 'vk':      return VkWidget
            default:        return null
        }
    })

    const componentProps = computed(() => {
        const base = { width: props.width, height: props.height }
        switch (currentKey.value) {
            case 'ym':      return { ...base, albumId: props.ym?.albumId, trackId: props.ym?.trackId }
            case 'spotify': return { ...base, ...props.spotify }
            case 'ytm':     return { ...base, ...props.ytm }     // те же поля, что у YouTubeWidget
            case 'yt':      return { ...base, ...props.yt }
            case 'vk':      return { ...base, ...props.vk }
            default:        return {}
        }
    })

    const availableButtons = computed(() => [...available.value.values()])

    const geoHint = computed(() => {
        if (!country.value) return ''
        if (!YM_COUNTRIES.has(country.value.code) && props.ym) {
            return `Яндекс Музыка может быть недоступна в вашем регионе${country.value.name ? ` (${country.value.name})` : ''}.`
        }
        return ''
    })
</script>

<style scoped>
  .player-controls{margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}
  .hint{font-size:.85rem;opacity:.7;margin-right:.25rem}
  .btn{padding:.35rem .6rem;border:1px solid #bbb;border-radius:8px;background:#fff;cursor:pointer}
  .btn.active{border-color:#333}
  .btn.ghost{opacity:.7}
</style>
