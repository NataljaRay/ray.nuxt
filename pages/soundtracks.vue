<template>
  <section class="section section--soundtracks" ref="containerRef"
            :class="isClient && isDesktop ? 'desktop' : 'mobile'">
    <div class="section__inner container">
        <p class="section__text">
          Некоторые главы книги <strong>«В свете софитов»</strong> сопровождаются композицями, подобранными специально под её атмосферу. Здесь вы можете прослушать саундтреки, перейти к любимым главам и погрузиться глубже в эмоции героев.
        </p>

      <div class="soundtrack" v-for="track in soundtracks" :key="track.anchor" :id="track.anchor">
        <p class="h4">{{track.chapter}} {{track.soundtrack}}</p>
        <p class="soundtrack__description" v-if="track.description">{{track.description}}</p>
<!--        <div class="player__note" v-if="isDesktop && track.soon">{{track.soon}}</div>-->


        <div class="soundtrack__media">
<!--          <ClientOnly>-->
          <div class="soundtrack__item" v-if="isClient && (isMobile || isTablet)">
<!--          <div class="soundtrack__item soundtrack__item&#45;&#45;mobile">-->
            <AlbumMin :album="track" :compressed="true"/>
          </div>

          <div class="soundtrack__widget" v-else>
<!--          <div class="soundtrack__widget soundtrack__widget&#45;&#45;desktop" v-if="isClient && isDesktop">-->
              <ClientOnly>
                <SmartPlayer
                        :mode="'mode-soundtracks'"
                        :player-id="`soundtrack-${track.anchor}`"
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
<!--          </ClientOnly>-->
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
    import SmartPlayer from '@/components/SmartPlayer.vue'
    import AlbumMin from '@/components/blocks/AlbumMin.vue'
    import { getSoundtracks } from '@/data/music'

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

    const soundtracks = getSoundtracks()

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
