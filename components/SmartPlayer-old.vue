<template>
  <div>
    <component
            :is="componentName"
            v-bind="componentProps"
            v-if="componentName"
    />

    <p v-if="showGeoHint" class="player-hint">
      Похоже, Яндекс Музыка недоступна в вашем регионе
      <span v-if="country?.name">({{ country.name }})</span>.
      Выберите другой плеер:
      <button @click="override('ym')">Яндекс</button>
      <button @click="override('spotify')">Spotify</button>
      <button @click="override(null)">Авто</button>
    </p>
  </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { detectCountry } from '@/composables/useCountry'
    import { pickPreferredPlayer, YM_COUNTRIES } from '@/utils/players'
    import YandexMusicWidget from '@/components/widgets/YandexMusicWidget.vue'
    import SpotifyWidget from '@/components/widgets/SpotifyWidget.vue'

    const props = defineProps({
        ym: { type: Object, default: null },       // { albumId, trackId, width?, height? }
        spotify: { type: Object, default: null },  // { trackId|albumId|playlistId, width?, height? }
        width: { type: Number, default: 614 },
        height: { type: Number, default: 244 },
    })

    const country = ref(null)
    const overridePlayer = ref(localStorage.getItem('player.override') || null)

    onMounted(async () => {
        country.value = await detectCountry()
    })

    function override(val) {
        overridePlayer.value = val
        if (val === null) localStorage.removeItem('player.override')
        else localStorage.setItem('player.override', val)
    }

    const autoPlayer = computed(() => pickPreferredPlayer(country.value?.code))
    const effectivePlayer = computed(() => overridePlayer.value || autoPlayer.value)

    const componentName = computed(() => {
        if (effectivePlayer.value === 'ym' && props.ym) return YandexMusicWidget
        if (effectivePlayer.value === 'spotify' && props.spotify) return SpotifyWidget
        // если для выбранного нет данных — берём альтернативу
        if (props.ym) return YandexMusicWidget
        if (props.spotify) return SpotifyWidget
        return null
    })

    const componentProps = computed(() => {
        const base = { width: props.width, height: props.height }
        if (componentName.value === YandexMusicWidget) return { ...base, albumId: props.ym?.albumId, trackId: props.ym?.trackId }
        if (componentName.value === SpotifyWidget)     return { ...base, ...props.spotify }
        return {}
    })

    const showGeoHint = computed(() => country.value && !YM_COUNTRIES.has(country.value.code) && !!props.ym)
</script>

<style scoped>
  .player-hint{font-size:.9rem;opacity:.8;margin-top:.5rem}
  .player-hint button{margin-left:.5rem}
</style>
