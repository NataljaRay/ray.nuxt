<template>
  <section class="section section--soundtracks">
    <div class="section__inner container">
        <p class="section__text">
          Некоторые главы книги <strong>«В свете софитов»</strong> сопровождаются композицями, подобранными специально под её атмосферу. Здесь вы можете прослушать саундтреки, перейти к любимым главам и погрузиться глубже в эмоции героев.
        </p>

      <div class="soundtrack" v-for="track in soundtracks" :key="track.anchor" :id="track.anchor">
        <p class="h4">{{track.chapter}} {{track.soundtrack}}</p>
        <p class="soundtrack__description" v-if="track.description">{{track.description}}</p>
<!--        <ClientOnly>-->
<!--        <iframe style="border: 0; width: 100%; height: 120px;"-->
<!--                src="https://bandcamp.com/EmbeddedPlayer/track=731891676/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"-->
<!--                seamless>-->
<!--&lt;!&ndash;          <a href="https://invoguerecords.bandcamp.com/track/shame-on-me">Shame on Me by Catch Your&ndash;&gt;-->
<!--&lt;!&ndash;          Breath</a>&ndash;&gt;-->
<!--        </iframe>-->

<!--        <iframe style="border: 0; width: 400px; height: 472px;"-->
<!--                src="https://bandcamp.com/EmbeddedPlayer/album=739978498/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/"-->
<!--                seamless>-->
<!--&lt;!&ndash;          <a href="https://invoguerecords.bandcamp.com/album/shame-on-me">Shame On Me by Catch Your Breath</a>&ndash;&gt;-->
<!--        </iframe>-->
<!--          </ClientOnly>-->

        <!-- Трек (миниконтролы) -->
        <div style="width:100%;">
        <iframe
                style="border:0; width:100%; height:120px;"
                src="https://bandcamp.com/EmbeddedPlayer/track=731891676/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                loading="lazy"
                seamless
        ></iframe>
<!--        <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"-->
<!--                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A15273221&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>-->

          <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameborder="no"
                  src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F15273221&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
          </iframe>


          <!--        <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">-->
<!--          <a href="https://soundcloud.com/foofighters" title="Foo Fighters" target="_blank"-->
<!--             style="color: #cccccc; text-decoration: none;">Foo Fighters</a> · <a-->
<!--                href="https://soundcloud.com/foofighters/foo-fighters-the-pretender"-->
<!--                title="Foo Fighters - The Pretender" target="_blank" style="color: #cccccc; text-decoration: none;">Foo-->
<!--          Fighters - The Pretender</a></div>-->

        </div>

        <div class="soundtrack__media">
          <div class="soundtrack__widget">
              <SmartPlayer
                      :ym="track.ym"
                      :spotify="track.spotify"
                      :ytm="track.ytm"
                      :yt="track.yt"
                      :vk="track.vk"
                      :title="track.soundtrack"
                      :width="'100%'"
                      :height="244"
                      :debug-country="true"
              />
          </div>
        </div>
      </div>

      <div style="margin-top: 40px">
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
    import YandexMusicWidget from '../components/widgets/YandexMusicWidget.vue'
    import SmartPlayer from '@/components/SmartPlayer.vue'

    const route = useRoute()
    const router = useRouter()

    // Хэш из URL всегда приходит с решёткой — убираем её для внутреннего использования
    const activeId = computed(() => route.hash ? route.hash.replace(/^#/, '') : '')

    // Пример перехода к треку: добавляем # только в URL
    function goTo(id) {
        router.replace({ hash: id }) // Nuxt сам добавит #
    }

    const soundtracks = [
        // {
        //     anchor: 'what-is-your-plan',
        //     chapter: 'Глава 14.',
        //     soundtrack: 'Natalja Ray — Каков твой план?',
        //     description: 'Первый шаг на сцену. Волнение. Свет бьёт в глаза. Всё начинается.',
        // },
        {
            anchor: 'shame-on-me',
            chapter: 'Глава 14.',
            soundtrack: 'Catch Your Breath — Shame On Me',
            description: '',

            ym: { albumId: '19810900', trackId: '96626688', bgColor: 'rgb(136, 119, 97)' },
            spotify: { trackId: '0H3DL0piGt5bRRJUOhgCWR' }, // Shame on Me — Catch Your Breath
            ytm: { videoId: 'q_4UUm0TiGw' },           // офиц. клип BVTV
            yt:  { videoId: 'q_4UUm0TiGw' },           // тот же id

        },
        {
            anchor: 'the-pretender-radio-tapok',
            chapter: 'Глава 15.',
            soundtrack: 'Radio Tapok — The Pretender',
            description: '',
        // , bgColor: 'rgb(103, 39, 35)'
            ym: { albumId: '17950261', trackId: '90655720', bgColor: 'rgb(95, 71, 67)' },
            spotify: { trackId: '72iyzWAM2158Kn8KD1ZImq' }, // The Pretender — RADIO TAPOK
            ytm: { videoId: 'SBklWPmxb_k' },           // Ролик Radio Tapok на YouTube
            yt:  { videoId: 'SBklWPmxb_k' },
            vk:  { ownerId: -2000884330, playlistId: 12884330, hash: 'df969e4ab45df34deb' },

        },
        {
            anchor: 'the-pretender-foo-fighters',
            chapter: 'Глава 15.',
            soundtrack: 'Foo Fighters — The Pretender',
            description: '',

            spotify: { trackId: '7x8dCjCr0x6x2lXKujYD34' }, // The Pretender — Foo Fighters
            ytm: { videoId: 'SBjQ9tuuTJQ' },           // офиц. клип Foo Fighters
            yt:  { videoId: 'SBjQ9tuuTJQ' },

        },
        {
            anchor: 'how-much-natalja-ray',
            chapter: 'Глава _.',
            soundtrack: 'Natalja Ray - How Much?',
            description: '',

            ym: { albumId: '37825294', trackId: '141932162', bgColor: 'rgb(103, 39, 35)' },
            spotify: { trackId: '2G6kJ7jabSKft66Vj2mKjb' },
            yt:  { videoId: 'zi8n1VX57kg' },
            vk:  { ownerId: -186374269, playlistId: 25, hash: 'b862a0f446f0be0a57' },

        },
    ]
</script>
