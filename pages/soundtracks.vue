<template>
  <section class="section section--soundtracks" ref="containerRef">
    <div class="section__inner container">
        <p class="section__text">
          Некоторые главы книги <strong>«В свете софитов»</strong> сопровождаются композицями, подобранными специально под её атмосферу. Здесь вы можете прослушать саундтреки, перейти к любимым главам и погрузиться глубже в эмоции героев.
        </p>

      <div class="soundtrack" v-for="track in soundtracks" :key="track.anchor" :id="track.anchor">
        <p class="h4">{{track.chapter}} {{track.soundtrack}}</p>
        <p class="soundtrack__description" v-if="track.description">{{track.description}}</p>


        <div class="soundtrack__media">
          <div class="soundtrack__item" v-if="isClient && (isMobile || isTablet)">
            <AlbumMin :album="track"/>
          </div>

          <div class="soundtrack__widget" v-else>
              <ClientOnly>
                <SmartPlayer
                        :mode="'mode-soundtracks'"
                        :ym="track.ym"
                        :spotify="track.spotify"
                        :ytm="track.ytm"
                        :yt="track.yt"
                        :vk="track.vk"
                        :vkVideo="track.vkVideo"
                        :title="track.soundtrack"
                        :width="'100%'"
                        :height="244"
                        :debug-country="true"
                />
              </ClientOnly>
          </div>
        </div>
      </div>

      <div class="mobile-note" :class="{hidden: hideNoteWindow}" v-if="isMobile || isTablet">
        <span class="mobile-note__close" @click="hideNote">+</span>
        🎧 На мобильных устройствах для полного воспроизведения трека откройте ссылку в приложении Spotify / Яндекс Музыка / ВКонтакте и др.
      </div>

      <div style="margin-top: 60px; display: none">
        <p class="h4">Саундтреки по главам</p>
        <ol>
          <li v-for="t in soundtracks" :key="t.anchor" :id="t.anchor"> <!-- t.id без # -->
            <a :href="`#${t.anchor}`">{{ t.soundtrack }}</a>       <!-- в ссылке добавляем # -->
          </li>
        </ol>
<!--        <ol>-->
<!--          <li><a href="#what-is-your-plan">Глава 14. Natalja Ray — Каков твой план?</a></li>-->
<!--          <li><a href="#shame-on-me">Глава 14. Catch Your Breath — Shame On Me</a></li>-->
<!--          <li><a href="#the-pretender-radio-tapok">Глава 15. Radio Tapok — The Pretender</a></li>-->
<!--          <li><a href="#the-pretender-foo-fighters">Глава 15. Foo Fighters — The Pretender</a></li>-->
<!--          <li>Глава 23. Evanescence — Bring Me to Life</li>-->
<!--          <li>Глава 23. Evanescence — My Immortal (band version)</li>-->
<!--          <li>Глава 31. Avril Lavigne — Innocence</li>-->
<!--          <li>Глава 48. Natalja Ray — Break It All</li>-->
<!--          <li>Глава 50. Bullet For My Valentine — Radioactive</li>-->
<!--          <li>Глава 51. Godsmack — Under Your Scars</li>-->
<!--          <li>Глава 54. Natalja Ray — How Much</li>-->
<!--        </ol>-->
      </div>
    </div>
  </section>
</template>

<script setup>
    definePageMeta({
        seo: {
            title: 'Natalja Ray | Саундтреки',
            description: 'Саундтреки к книге "В свете софитов"',
            image: '/NataljaRay.jpg' // из public/
            // noindex: true
        }
    });

    import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
    import { useRoute, useRouter } from '#imports'
    import SmartPlayer from '@/components/SmartPlayer.vue'
    import Streamings from '@/components/blocks/Streamings.vue'
    import AlbumMin from '@/components/blocks/AlbumMin.vue'

    const isClient = ref(false)

    onMounted(() => {
        isClient.value = true
    })

    // mobile check
    const device = useDevice()

    const isMobile = computed(() => device.value.isMobile)
    const isTablet = computed(() => device.value.isTablet)
    const isDesktop = computed(() => device.value.isDesktop)

    const hideNoteWindow = ref(false)
    const hideNote = () => {hideNoteWindow.value = true}

    // const route = useRoute()
    // const router = useRouter()
    //
    // // Хэш из URL всегда приходит с решёткой — убираем её для внутреннего использования
    // const activeId = computed(() => route.hash ? route.hash.replace(/^#/, '') : '')
    //
    // // Пример перехода к треку: добавляем # только в URL
    // function goTo(id) {
    //     router.replace({ hash: id }) // Nuxt сам добавит #
    // }

    const soundtracks = [
        // {
        //     anchor: 'what-is-your-plan',
        //     chapter: 'Глава 14.',
        //     soundtrack: 'Natalja Ray — Каков твой план?',
        //     description: 'Первый шаг на сцену. Волнение. Свет бьёт в глаза. Всё начинается.',
        // },
        {
            cover: 'Catch_Your_Breath-Shame_On_Me.jpg',
            anchor: 'shame-on-me',
            chapter: 'Глава 14.',
            soundtrack: 'Catch Your Breath — Shame On Me',
            title: 'Catch Your Breath — Shame On Me',
            description: '',

            ym: { albumId: '19810900', trackId: '96626688', bgColor: 'rgb(136, 119, 97)' },
            spotify: { trackId: '0H3DL0piGt5bRRJUOhgCWR' }, // Shame on Me — Catch Your Breath
            ytm: { videoId: 'q_4UUm0TiGw' },           // офиц. клип BVTV
            yt:  { videoId: 'q_4UUm0TiGw' },           // тот же id

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/track/96626688',
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/track/6S2iHbyPSlhQgCyAVQ2SO6',
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/song/shame-on-me/1732047531'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=ihEQYiq89PU'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/159958770'
                },
                vkMusic: {
                    // id: 'vk-music',
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.com/audio-2001295867_143295867'
                },
            }
        },
        {
            cover: 'Radio_Tapok-The_Pretender.jpg',
            anchor: 'the-pretender-radio-tapok',
            chapter: 'Глава 15.',
            soundtrack: 'Radio Tapok — The Pretender',
            title: 'Radio Tapok — The Pretender',
            description: '',
            ym: { albumId: '17950261', trackId: '90655720', bgColor: 'rgb(95, 71, 67)' },
            spotify: { trackId: '72iyzWAM2158Kn8KD1ZImq' }, // The Pretender — RADIO TAPOK
            ytm: { videoId: 'SBklWPmxb_k' },           // Ролик Radio Tapok на YouTube
            yt:  { videoId: 'SBklWPmxb_k' },
            vk:  { ownerId: -2000884330, playlistId: 12884330, hash: 'df969e4ab45df34deb' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/track/90655720',
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/track/72iyzWAM2158Kn8KD1ZImq',
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/song/the-pretender/1584800066'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=N7QwN0EAWEg'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/108361695'
                },
                vkMusic: {
                    // id: 'vk-music',
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/audio-2001880993_95880993'
                },
            }
        },
        {
            cover: 'Foo_Fighters-The_Pretender.jpg',
            anchor: 'the-pretender-foo-fighters',
            chapter: 'Глава 15.',
            soundtrack: 'Foo Fighters — The Pretender',
            title: 'Foo Fighters — The Pretender',
            description: '',

            spotify: { trackId: '7x8dCjCr0x6x2lXKujYD34' }, // The Pretender — Foo Fighters
            ytm: { videoId: 'SBjQ9tuuTJQ' },           // офиц. клип Foo Fighters
            yt:  { videoId: 'SBjQ9tuuTJQ' },
            vkVideo:  { ownerId: -1680, videoId: 456239254 },

            streamings: {
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/track/7x8dCjCr0x6x2lXKujYD34',
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/song/the-pretender/262743414'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=BMMGwtklEeE'
                },
                vkVideo: {
                    id: 'vk-video',
                    fullName: 'Vk Video',
                    link: 'https://vk.com/video-1680_456239254'
                },

            }
        },
        {
            cover: 'Natalja_Ray-Neurotic_Love.jpg',
            anchor: 'how-much-natalja-ray',
            chapter: 'Глава 54.',
            soundtrack: 'Natalja Ray - How Much?',
            title: 'Natalja Ray - How Much?',
            description: '',

            ym: { albumId: '37825294', trackId: '141932162', bgColor: 'rgb(103, 39, 35)' },
            spotify: { trackId: '2G6kJ7jabSKft66Vj2mKjb' },
            yt:  { videoId: 'zi8n1VX57kg' },
            vk:  { ownerId: -186374269, playlistId: 25, hash: 'b862a0f446f0be0a57' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/track/141932162',
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/track/2G6kJ7jabSKft66Vj2mKjb',
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/song/how-much/1833250577'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=zi8n1VX57kg'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/150803315'
                },
                vkMusic: {
                    // id: 'vk-music',
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/audio-2001203207_142203207'
                },
            }

        },
    ]

    // refs
    const containerRef = ref(null)
    const currentAnchor = ref('')

    /** helper: header height */
    function getHeaderHeight() {
        const root = document.documentElement
        const v = getComputedStyle(root).getPropertyValue('--header-h')
        if (v) {
            const num = parseInt(v.trim().replace('px', ''), 10)
            if (!Number.isNaN(num)) return num
        }
        const header = document.querySelector('header')
        return header ? header.offsetHeight : 0
    }

    /** обновление hash без скролла (замена записи истории) 1 вариант */
    // function replaceHash(id) {
    //     if (!id) {
    //         history.replaceState(null, '', window.location.pathname + window.location.search)
    //     } else {
    //         const newUrl = window.location.pathname + window.location.search + `#${id}`
    //         if (window.location.hash !== `#${id}`) {
    //             history.replaceState(null, '', newUrl)
    //         }
    //     }
    // }

    /** обновление hash без скролла (замена записи истории)  2 вариант */
    // function replaceHash(id) {
    //     if (typeof window === 'undefined') return
    //
    //     // берём pathname и нормализуем: убираем trailing slash (кроме корня '/')
    //     const rawPath = window.location.pathname || ''
    //     const path = (rawPath !== '/' ? rawPath.replace(/\/$/, '') : rawPath)
    //     const search = window.location.search || ''
    //     const hash = id ? `#${id}` : ''
    //
    //     const newUrl = path + search + hash
    //
    //     // только если реально отличается — заменяем
    //     if (window.location.pathname + window.location.search + window.location.hash !== newUrl) {
    //         history.replaceState(null, '', newUrl)
    //     }
    // }

    /** обновление hash без скролла (замена записи истории) 3 вариант */
    function replaceHash(id) {
        if (typeof window === 'undefined') return

        // гарантируем, что pathname всегда заканчивается на '/'
        const rawPath = window.location.pathname || ''
        const path = rawPath.endsWith('/') ? rawPath : rawPath + '/'
        const search = window.location.search || ''
        const hash = id ? `#${id}` : ''

        const newUrl = path + search + hash

        if (window.location.pathname + window.location.search + window.location.hash !== newUrl) {
            history.replaceState(null, '', newUrl)
        }
    }

    /** Удалить is-current у всех и поставить на el */
    function setActiveElement(el) {
        if (!el) return
        document.querySelectorAll('.soundtrack.is-current').forEach(n => n.classList.remove('is-current'))
        el.classList.add('is-current')
    }

    /** Основная логика: выбираем элемент, чья верхняя граница (top) ближе всего к верхней границе окна с учётом хедера */
    function updateActiveByTop(nodes) {
        if (!nodes || !nodes.length) return
        const headerH = getHeaderHeight()
        let best = null
        let bestDist = Infinity

        for (const el of nodes) {
            const rect = el.getBoundingClientRect()
            // расстояние от верхней границы элемента до верхней видимой границы (с учётом header)
            const dist = Math.abs(rect.top - headerH)
            // можно игнорировать полностью невидимые элементы (опционально)
            // например: если rect.bottom < 0 || rect.top > window.innerHeight => пропустить
            // но мы выбираем ближайший по top, даже если он уже прошёл — обычно это ожидаемо
            if (dist < bestDist) {
                bestDist = dist
                best = el
            }
        }

        if (best) {
            const id = best.getAttribute('id') || best.dataset.anchor
            if (id && currentAnchor.value !== id) {
                currentAnchor.value = id
                setActiveElement(best)
                replaceHash(id)
            }
        }
    }

    /** Наблюдатель + scroll/resize оптимизация через rAF */
    let io = null
    let rafId = null
    let nodesList = []

    function onScrollOrResize() {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
            updateActiveByTop(nodesList)
        })
    }

    onMounted(async () => {
        await nextTick()

        const root = containerRef.value || document
        nodesList = Array.from(root.querySelectorAll('.soundtrack'))
        if (!nodesList.length) return

        // небольшой IntersectionObserver: пусть он просто триггерит пересчёт при входе/выходе
        io = new IntersectionObserver((entries) => {
            // на любую релевантную запись — пересчитываем лучшую секцию
            // (позволяет сокращать работы, но окончательный выбор делаем через updateActiveByTop)
            if (entries && entries.length) {
                updateActiveByTop(nodesList)
            }
        }, {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        })

        nodesList.forEach(n => io.observe(n))

        // initial calc
        updateActiveByTop(nodesList)

        // подписываемся на скролл/резайз для realtime
        window.addEventListener('scroll', onScrollOrResize, { passive: true })
        window.addEventListener('resize', onScrollOrResize, { passive: true })
    })

    onBeforeUnmount(() => {
        if (io) { io.disconnect(); io = null }
        if (rafId) cancelAnimationFrame(rafId)
        window.removeEventListener('scroll', onScrollOrResize)
        window.removeEventListener('resize', onScrollOrResize)
    })
</script>
