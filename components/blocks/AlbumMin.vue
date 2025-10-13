<template>
<!--  album-min.vue-->
        <div class="album">
          <div class="album__image-wrapper" v-if="album.cover">
            <img :src="imgUrl(album.cover)"
                 :alt="album.title"
                 :title="album.title || ''"
                 width="342" height="342" decoding="async"
                 fetchpriority="high"
            >
          </div>

          <div class="album__info-wrapper">
            <div class="h4 album__title" v-if="album.altTitle">{{album.altTitle}}</div>

            <ul class="album__info" v-if="album.info">
              <li class="album__info-item" v-if="album.info.releaseDate">
                Дата релиза: <span>{{album.info.releaseDate}}</span>
              </li>
              <li class="album__info-item" v-if="album.info.label">
                Лейбл: <span>{{album.info.label}}</span>
              </li>
              <li class="album__info-item" v-if="album.info.type">
                Формат: <span>{{album.info.type}}</span>
              </li>
            </ul>
<!--            <Button class="button&#45;&#45;link"-->
<!--                    target="_blank"-->
<!--                    :href="album.info.releasePage"-->
<!--                    label="Перейти на страницу релиза"-->
<!--            />-->

            <div class="player__note" v-if="album.streamings">Слушать на музыкальных площадках: </div>
            <div class="album__streamings" v-if="album.streamings">
              <Streamings :streamings="album.streamings" />
            </div>
          </div>
        </div>

</template>

<script setup>
    import Streamings from '@/components/blocks/Streamings.vue'
    import Button from '@/components/common/Button.vue'

    import { withBase } from 'ufo'

    const imgUrl = (key) => withBase(`/images/albums/${key}`, baseURL)

    const { public: { baseURL, siteUrl } } = useRuntimeConfig();

    const props = defineProps({
        album:      { type: Object, default: null },
    })

</script>

<style scoped>

</style>