<template>
<!--  album.vue-->
  <section class="section section--album">
    <div class="section__inner grid-2 grid-2--to-1 container">
      <div class="section__col">
<!--        album: {{album}}-->
        <div class="album">

          <div class="album__image-wrapper">
            <img :src="imgUrl(album.cover)"
                 :alt="album.title"
                 :title="album.title || ''"
                 width="342" height="342" loading="lazy" decoding="async"
            >
          </div>

          <div class="album__info-wrapper">
            <div class="h3 album__title">{{album.altTitle}}</div>

            <ul class="album__info">
              <li class="album__info-item">
                Дата релиза: <span>{{album.info.releaseDate}}</span>
              </li>
              <li class="album__info-item">
                Лейбл: <span>{{album.info.label}}</span>
              </li>
              <li class="album__info-item">
                Формат: <span>{{album.info.type}}</span>
              </li>
            </ul>
            <Button class="button--link"
                    target="_blank"
                    :href="album.info.releasePage"
                    label="Перейти на страницу релиза"
            />

            <div class="album__streamings">
              <Streamings :streamings="album.streamings" />
            </div>
          </div>
        </div>

      </div>
      <div class="section__col">
        <div class="album-widget">
<!--          <div class="album-player">-->
            <SmartPlayer
                    :mode="'mode-2'"
                    :ym="album.ym"
                    :spotify="album.spotify"
                    :ytm="album.ytm"
                    :yt="album.yt"
                    :vk="album.vk"
                    :title="album.title"
                    :width="'100%'"
                    :height="556"
                    :debug-country="true"
            />
<!--          </div>-->
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
    // import {ref, computed, reactive, onMounted, onBeforeUnmount} from 'vue'
    import {computed} from 'vue'
    import Streamings from '@/components/blocks/Streamings.vue'
    import Button from '@/components/common/Button.vue'
    import SmartPlayer from '@/components/SmartPlayer.vue'
    import YandexMusicWidget from '@/components/widgets/YandexMusicWidget.vue'

    import { withBase } from 'ufo'

    const imgUrl = (key) => withBase(`/images/albums/${key}`, baseURL)
    // const iconUrl = (key) => withBase(`/icons/music/${key}.svg`, baseURL)

    const { public: { baseURL, siteUrl } } = useRuntimeConfig();

    const props = defineProps({
        album:      { type: Object, default: null },
    })


</script>

<style scoped>

</style>