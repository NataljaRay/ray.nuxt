<template>
  <section class="section section--soundtracks">
    <div class="section__inner container">
        <p class="section__text">
          Некоторые главы книги <strong>«В свете софитов»</strong> сопровождаются композицями, подобранными специально под её атмосферу. Здесь вы можете прослушать саундтреки, перейти к любимым главам и погрузиться глубже в эмоции героев.
        </p>

      <div class="soundtrack" v-for="track in soundtracks" :key="track.anchor" :id="track.anchor">
        <p class="h4">{{track.chapter}} {{track.soundtrack}}</p>
        <p class="soundtrack__description" v-if="track.description">{{track.description}}</p>
        <div class="soundtrack__media">
          <div class="soundtrack__widget">
            <div class="widget" v-for="widget in track.player">
<!--              {{widget.iframe}}-->
<!--              <component :is="widget.iframe"></component>-->
              <div v-html="widget.iframe"></div>
            </div>
          </div>
          <div class="soundtrack__list">
            <div class="h5 soundtrack__list-item" v-for="item in track.player">
              {{item.key}}
            </div>
          </div>
        </div>
      </div>

      <div>
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
            description: 'Саундтреки',
            // description: 'Саундтреки к книге «В свете софитов»',
            image: '/og-about.jpg' // из public/
            // noindex: true
        }
    });

    import { computed } from 'vue'
    import { useRoute, useRouter } from '#imports'

    const route = useRoute()
    const router = useRouter()

    // Хэш из URL всегда приходит с решёткой — убираем её для внутреннего использования
    const activeId = computed(() => route.hash ? route.hash.replace(/^#/, '') : '')

    // Пример перехода к треку: добавляем # только в URL
    function goTo(id) {
        router.replace({ hash: id }) // Nuxt сам добавит #
    }

    const soundtracks = [
        {
            anchor: 'what-is-your-plan',
            chapter: 'Глава 14.',
            soundtrack: 'Natalja Ray — Каков твой план?',
            description: 'Первый шаг на сцену. Волнение. Свет бьёт в глаза. Всё начинается.',
            player: [
                {
                    key: 'vk',
                    iframe: ``,
                },
                {
                    key: 'ym',
                    iframe: ``,
                },
                {
                    key: 'sp',
                    iframe: ``,
                },
                {
                    key: 'yt',
                    iframe: ``,
                },
                {
                    key: 'ytm',
                    iframe: ``,
                },
            ],
        },
        {
            anchor: 'shame-on-me',
            chapter: 'Глава 14.',
            soundtrack: 'Catch Your Breath — Shame On Me',
            description: '',
            player: [
                {
                    key: 'vk',
                    iframe: ``,
                },
                {
                    key: 'ym',
                    iframe: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:614px;height:244px;" width="614" height="244" src="https://music.yandex.ru/iframe/album/19810900/track/96626688">Слушайте <a href="https://music.yandex.ru/track/96626688?utm_source=web&utm_medium=copy_link">Shame On Me</a> — <a href="https://music.yandex.ru/artist/12001265">Catch Your Breath</a> на Яндекс Музыке</iframe>`,
                },
                {
                    key: 'sp',
                    iframe: ``,
                },
                {
                    key: 'yt',
                    iframe: ``,
                },
                {
                    key: 'ytm',
                    iframe: ``,
                },
            ],
        },
        {
            anchor: 'the-pretender-radio-tapok',
            chapter: 'Глава 15.',
            soundtrack: 'Radio Tapok — The Pretender',
            description: '',
            player: [
                {
                    key: 'vk',
                    iframe: ``,
                },
                {
                    key: 'ym',
                    iframe: ``,
                },
                {
                    key: 'sp',
                    iframe: ``,
                },
                {
                    key: 'yt',
                    iframe: ``,
                },
                {
                    key: 'ytm',
                    iframe: ``,
                },
            ],
        },
        {
            anchor: 'the-pretender-foo-fighters',
            chapter: 'Глава 15.',
            soundtrack: 'Foo Fighters — The Pretender',
            description: '',
            player: [
                {
                    key: 'vk',
                    iframe: ``,
                },
                {
                    key: 'ym',
                    iframe: ``,
                },
                {
                    key: 'sp',
                    iframe: ``,
                },
                {
                    key: 'yt',
                    iframe: ``,
                },
                {
                    key: 'ytm',
                    iframe: ``,
                },
            ],
        },
    ]
</script>
