<template>
  <div>
    <section class="section section--music-page section--universal"
             :class="isClient && isDesktop ? 'desktop' : 'mobile'">
      <div class="section__inner container">
        <p class="section__text">
          Моя музыка рождается из состояний, ощущений и сцен. Здесь вы найдёте как саундтреки к книгам, так и независимые композиции — истории, которые звучат изнутри.
        </p>
      </div>
    </section>

    <template v-if="isMobile || isTablet">
        <section class="section section--album section--album-min">
          <div class="section__inner grid-2 grid-2--mirrow grid-2--to-1 container">
            <div class="section__col"
                 v-for="album in albums" :key="album.title">
              <AlbumMin :album="album" :compressed="false"/>
            </div>
          </div>
        </section>
    </template>
    <template v-else>
      <Album v-for="album in albums" :key="album.title" :album="album"/>
    </template>

    <section class="section section--socials section--universal section--rose">
      <div class="section__inner section__inner--center container">
        <p class="header__logo logo" aria-label="Home">Natalja Ray</p>
        <p class="section__text">
          в соцсетях
        </p>
        <div class="section__actions">
          <Button class="section__button button--social"
                  href="https://vk.com/nataljaray"
                  target="_blank"
                  isLabelHidden
                  label="Паблик вконтакте"
                  icon-name="vk"
                  mode="transparent"
          />
          <Button class="section__button button--social"
                  href="https://t.me/nataljaray_music"
                  target="_blank"
                  isLabelHidden
                  label="Телеграм канал"
                  icon-name="tg"
                  mode="transparent"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
    import {computed, onMounted, ref} from "vue";

    definePageMeta({
        seo: {
            title: 'Natalja Ray | Музыка',
            description: 'Музыка Natalja Ray',
            image: '/NataljaRay.jpg' // из public/
            // noindex: true
        }
    });

    import Button from '@/components/common/Button.vue'
    import Album from '@/components/sections/Album.vue'
    import AlbumMin from '@/components/blocks/AlbumMin.vue'

    const isClient = ref(false)

    onMounted(() => {
        isClient.value = true
    })

    // mpbile check
    const device = useDevice()

    const isMobile = computed(() => device.value.isMobile)
    const isTablet = computed(() => device.value.isTablet)
    const isDesktop = computed(() => device.value.isDesktop)

    const albums = [
        {
            cover: 'Natalja_Ray_PROSTOЯ-How_much.jpg',
            title: 'Natalja Ray, PROSTOЯ - Как важно?',
            altTitle: 'Сингл «Как важно?»',
            info: {
                releaseDate: '24.10.2025',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/kak_vazhno'
            },

            ym: {albumId: '38605906', bgColor: 'rgb(104, 54, 48);'},
            spotify: {albumId: '6vICH0FEQukyuQQTYqXDuk'},
            yt:  { videoId: 'zL715kaASqI' },
            vk:  { ownerId: -2000508322, playlistId: 25508322, hash: '08c7fd8a861772eae5' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/38605906'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/6vICH0FEQukyuQQTYqXDuk'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/%D0%BA%D0%B0%D0%BA-%D0%B2%D0%B0%D0%B6%D0%BD%D0%BE-single/1845390641'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=zL715kaASqI'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=zL715kaASqI'
                },
                vkMusic: {
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/audio-2001665580_143665580_7519932b98dbea0a0b'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/160586273'
                },

            }
        },
        {
            cover: 'Natalja_Ray-Neurotic_Love.jpg',
            title: 'Natalja Ray - Neurotic Love',
            altTitle: 'Альбом «Neurotic Love»',
            info: {
                releaseDate: '28.08.2025',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/neurotic_love'
            },

            ym: {albumId: '37825294', bgColor: 'rgb(103, 39, 35)'},
            spotify: {albumId: '7bWAtcnG1MHLUcmmpfe3EW'},
            yt:  { videoId: 'WZjcFOkPq30' },
            vk:  { ownerId: -2000976444, playlistId: 24976444, hash: '4b5f04eece1a9571a8' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/37825294',
                    albumId: '37825294',
                    bgColor: 'rgb(103, 39, 35)'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/7bWAtcnG1MHLUcmmpfe3EW',
                    albumId: '7bWAtcnG1MHLUcmmpfe3EW'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/neurotic-love-ep/1833250573'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/playlist?list=OLAK5uy_lDpa0udhT-y2oK-rCr5C3HeqjepkyaPGE'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=WZjcFOkPq30&list=OLAK5uy_kOlIQkROThB-nrX6FvSSBpcMwat3Bi578'
                },
                vkMusic: {
                    // id: 'vk-music',
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://boom.ru/redirect/album/30898060'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/release/40554105'
                },
            }
        },
        {
            cover: 'Natalja_Ray-You\'re_Nice_But_I_Hate_You.jpg',
            title: 'Natalja Ray - You\'re Nice but I Hate You',
            altTitle: 'Сингл «You\'re Nice but I Hate You»',
            info: {
                releaseDate: '25.06.2025',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/nataljaray_nice_hate'
            },

            ym: {albumId: '37116769', bgColor: 'rgb(104, 54, 48);'},
            spotify: {albumId: '4lFaiX7IaKNX7d8k9Bousa'},
            yt:  { videoId: 'mbNmDwKsRkc' },
            vk:  { ownerId: -2000479683, playlistId: 24479683, hash: '8fee26e13da9e6686f' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/37116769'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/4lFaiX7IaKNX7d8k9Bousa'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/youre-nice-but-i-hate-you-single/1821690077'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=mbNmDwKsRkc'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=mbNmDwKsRkc'
                },
                vkMusic: {
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.com/audio-2001919974_140919974_e03bd780c8a6377466'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/144650617'
                },

            }
        },
        {
            cover: 'Natalja_Ray-Im_Tired.jpg',
            title: 'I\'m Tired',
            altTitle: 'Сингл «I\'m Tired»',
            info: {
                releaseDate: '25.04.2025',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/nataljaray_im_tired'
            },

            ym: {albumId: '36370498', bgColor: 'rgb(104, 54, 48);'},
            spotify: {albumId: '07q4eCl6s2mS9OpHhVqdct'},
            yt:  { videoId: 'hLgsKZgRj0k' },
            vk:  { ownerId: -2000936324, playlistId: 23936324, hash: 'e4055a46cbebbfe397' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/36370498'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/07q4eCl6s2mS9OpHhVqdct'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/im-tired-single/1809738927'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=hLgsKZgRj0k'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=hLgsKZgRj0k'
                },
                vkMusic: {
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/audio-2001203540_136203540'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/143790838'
                },

            }
        },
        {
            cover: 'Natalja_Ray-Nevrotichka.jpg',
            title: 'Невротичка',
            altTitle: 'Сингл «Невротичка»',
            info: {
                releaseDate: '07.08.2024',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/nevrotichka'
            },

            ym: {albumId: '32684897', bgColor: 'rgb(104, 54, 48);'},
            spotify: {albumId: '2VWGOv5u1hNKMkypV0HKzJ'},
            // yt:  { videoId: '8ghcbWTorgo' },
            vk:  { ownerId: -2000579823, playlistId: 21579823, hash: '1ee250561c12876493' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/32684897'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/2VWGOv5u1hNKMkypV0HKzJ'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/%D0%BD%D0%B5%D0%B2%D1%80%D0%BE%D1%82%D0%B8%D1%87%D0%BA%D0%B0-single/1761236249'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=8ghcbWTorgo'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=8ghcbWTorgo'
                },
                vkMusic: {
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/audio-2001773262_129773262_787e61d16b9cedc266'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/139062118'
                },

            }
        },
        {
            cover: 'Natalja_Ray-Dont_Try.jpg',
            title: 'Don\'t Try',
            altTitle: 'Сингл «Don\'t Try»',
            info: {
                releaseDate: '23.04.2024',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/nataljaraydonttry'
            },

            ym: {albumId: '30612486', bgColor: 'rgb(104, 54, 48);'},
            spotify: {albumId: '398lvO2MCyXsvPf7N7TKi1'},
            yt:  { videoId: 'E2_LEoNcDNI' },
            vk:  { ownerId: -2000518011, playlistId: 20518011, hash: 'e4939f602d0de68942' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/30612486'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/398lvO2MCyXsvPf7N7TKi1'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/dont-try-single/1740158170'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/playlist?list=OLAK5uy_nIidpMqyXzHqfuNalnZnsYBMtxGW0fscw'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=E2_LEoNcDNI&list=OLAK5uy_k8hAx40P20qD-fYQzAnT8a-SjoBXkRtAw'
                },
                vkMusic: {
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/music/album/-2000518011_20518011_f2654320c9034436db'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/release/33529817'
                },
            }
        },
        {
            cover: 'Natalja_Ray-March.jpg',
            title: 'March',
            altTitle: 'Сингл «March» (Instrumental)',
            info: {
                releaseDate: '12.03.2024',
                // label: 'VAUVISION',
                // type: 'Digital',
                releasePage: 'https://band.link/nataljaraymarch'
            },

            ym: {albumId: '30583190', bgColor: 'rgb(104, 54, 48);'},
            spotify: {albumId: '2WZOOZdUERGn9Z09OkVn2Y'},
            yt:  { videoId: 'V1AmhOZRnHs' },
            vk:  { ownerId: -2000505548, playlistId: 20505548, hash: '7e5abe6b4d0cde9dd9' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/30583190'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/2WZOOZdUERGn9Z09OkVn2Y'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/album/march-instrumental-single/1740155102'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/watch?v=V1AmhOZRnHs'
                },
                yt: {
                    id: 'youtube',
                    fullName: 'Youtube',
                    link: 'https://www.youtube.com/watch?v=V1AmhOZRnHs'
                },
                vkMusic: {
                    id: 'vk',
                    fullName: 'Vk Music',
                    link: 'https://vk.ru/audio-2001910844_126910844_922bea7c5c69a31968'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/track/137422136'
                },

            }
        },
    ]
</script>

<style scoped>

</style>