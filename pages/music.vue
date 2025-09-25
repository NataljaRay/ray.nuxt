<template>
<!--  music.vue-->
  <div>
    <section class="section section--music-page">
      <div class="section__inner container">
        <p class="section__text">
          Моя музыка рождается из состояний, ощущений и сцен. Здесь вы найдёте как саундтреки к книгам, так и независимые композиции — истории, которые звучат изнутри.
        </p>
      </div>
    </section>

    <Album v-for="album in albums" :key="album.title" :album="album"/>

<!--    или-->
<!--    <section class="section section&#45;&#45;album section&#45;&#45;album-min">-->
<!--      <div class="section__inner grid-2 grid-2&#45;&#45;mirrow grid-2&#45;&#45;to-1 container">-->
<!--        <div class="section__col"-->
<!--             v-for="album in albums" :key="album.title">-->
<!--          <AlbumMin :album="album"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

  </div>
</template>

<script setup>
    definePageMeta({
        seo: {
            title: 'Natalja Ray | Музыка',
            description: 'Музыка',
            image: '/og-about.jpg' // из public/
            // noindex: true
        }
    });

    import Album from '@/components/sections/Album.vue'
    import AlbumMin from '@/components/blocks/AlbumMin.vue'

    const albums = [
        {
            cover: 'Natalja_Ray-Neurotic_Love.jpg',
            title: 'Natalja Ray - Neurotic Love',
            altTitle: 'Альбом «Neurotic Love»',
            info: {
                releaseDate: '28.08.2025',
                label: 'VAUVISION',
                type: 'Digital',
                releasePage: 'https://band.link/neurotic_love'
            },

                ym: {albumId: '37825294', bgColor: 'rgb(103, 39, 35)'},
                spotify: {albumId: '7bWAtcnG1MHLUcmmpfe3EW'},
                yt:  { videoId: 'zi8n1VX57kg' },
                vk:  { ownerId: -186374269, playlistId: 25, hash: 'b862a0f446f0be0a57' },

            streamings: {
                ym: {
                    id: 'ym',
                    fullName: 'Yandex Music',
                    link: 'https://music.yandex.ru/album/37825294',
                    player: true,
                    albumId: '37825294',
                    bgColor: 'rgb(103, 39, 35)'
                },
                spotify: {
                    id: 'spotify',
                    fullName: 'Spotify',
                    link: 'https://open.spotify.com/album/7bWAtcnG1MHLUcmmpfe3EW',
                    player: true,
                    albumId: '7bWAtcnG1MHLUcmmpfe3EW'
                },
                apple: {
                    id: 'apple-music',
                    fullName: 'Apple Music / Itunes',
                    link: 'https://music.apple.com/ru/album/neurotic-love-ep/1833250573'
                },
                ytMusic: {
                    id: 'youtube-music',
                    fullName: 'Youtube Music',
                    link: 'https://music.youtube.com/playlist?list=OLAK5uy_lDpa0udhT-y2oK-rCr5C3HeqjepkyaPGE'
                },
                zvuk: {
                    id: 'zvuk',
                    fullName: 'Zvuk',
                    link: 'https://zvuk.com/release/40554105'
                },
                vkMusic: {
                    id: 'vk-music',
                    fullName: 'Vk Music',
                    link: 'https://boom.ru/redirect/album/30898060'
                },
            }
        },
        {
            cover: 'Natalja_Ray-You\'re_Nice_But_I_Hate_You.jpg',
            title: 'Natalja Ray - You\'re Nice but I Hate You',
            altTitle: 'Альбом «You\'re Nice but I Hate You»',
            info: {
                releaseDate: '25.06.2025',
                label: 'VAUVISION',
                type: 'Digital',
                releasePage: 'https://band.link/nataljaray_nice_hate'
            },
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
            }
        },
    ]
</script>

<style scoped>

</style>